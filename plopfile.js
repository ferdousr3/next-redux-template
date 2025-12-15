module.exports = (plop) => {
	plop.setGenerator("f", {
		description: "Generate a feature or page",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of the feature/page?",
			},
			{
				type: "checkbox",
				name: "options",
				message: "What would you like to generate?",
				choices: [
					{ name: "Page (src/app)", value: "page", checked: true },
					{ name: "Type (src/types)", value: "type" },
					{
						name: "Feature Slice & Model (src/lib/features)",
						value: "feature",
					},
				],
				// Loop through args to set defaults if flags are present
				default: (answers) => {
					const args = process.argv.slice(2);
					const defaults = [];
					if (args.includes("-t")) defaults.push("type");
					if (args.includes("-m") || args.includes("-store"))
						defaults.push("feature");
					// If no flags, default to just page? Or let user choose.
					// For now, let's rely on the user confirming the selection or passing flags.
					// Actually, prompts run if data isn't missing.
					return defaults.length > 0 ? defaults : ["page"];
				},
				when: (answers) => {
					// Check if flags are passed to skip prompt if fully specified?
					// Plop doesn't easily skip prompts based on CLI flags unless mapped to prompts.
					// We'll let the prompt show but pre-fill based on flags if possible, or
					// we can verify if the user accepts the default behavior.

					// Simple approach: Use CLI args to set a hidden variable or just let user check boxes.
					// The user specifically asked for "command ... -t".
					// To make it truly non-interactive for flags, we need to bypass prompt.
					const args = process.argv;
					const hasFlags =
						args.includes("-t") ||
						args.includes("-m") ||
						args.includes("-store");
					return !hasFlags;
				},
			},
		],
		actions: (data) => {
			const actions = [];

			// Flags hack check
			const args = process.argv;
			const useType = data.options?.includes("type") || args.includes("-t");
			const useFeature =
				data.options?.includes("feature") ||
				args.includes("-m") ||
				args.includes("-store");
			// Always generate page if not strictly feature-only requested?
			// The user said "npm g f <name> -t" -> "into app folder... create a type file"
			// "npm g f <name> -m -store" -> "create app folder... crate a store slice"
			// So ALWAYS create page.
			const usePage = true;

			if (usePage) {
				actions.push({
					type: "add",
					path: "src/app/{{camelCase name}}/page.tsx",
					templateFile: "plop-templates/page.tsx.hbs",
				});
			}

			if (useType) {
				actions.push({
					type: "add",
					path: "src/types/{{pascalCase name}}Type.ts",
					templateFile: "plop-templates/type.ts.hbs",
				});
			}

			if (useFeature) {
				actions.push({
					type: "add",
					path: "src/lib/features/{{camelCase name}}/slice.ts",
					templateFile: "plop-templates/slice.ts.hbs",
				});
				actions.push({
					type: "add",
					path: "src/lib/features/{{camelCase name}}/api.ts",
					templateFile: "plop-templates/api.ts.hbs",
				});
				actions.push({
					type: "add",
					path: "src/lib/features/{{camelCase name}}/model/{{camelCase name}}Model.ts",
					templateFile: "plop-templates/model.ts.hbs",
				});
			}

			return actions;
		},
	});
};
