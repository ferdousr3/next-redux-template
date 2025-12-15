# Next.js Redux Template

A modern, feature-rich starter template for building scalable web applications with Next.js, Redux Toolkit, and comprehensive tooling.

## 🚀 Technology Stack

We specifically chose these technologies to balance performance, developer experience, and scalability:

- **[Next.js 15](https://nextjs.org/)**: The React framework for the web. Used for its powerful App Router, server-side rendering, and simplified routing.
- **[React 19](https://react.dev/)**: The latest version of React, leveraging Server Components and new core features.
- **[Redux Toolkit (RTK)](https://redux-toolkit.js.org/)**: The official, opinionated, batteries-included toolset for efficient Redux development. We use it for global state management.
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)**: Included with RTK. Used for efficient data fetching, caching, and state synchronization with the server.
- **[NextAuth.js v4](https://next-auth.js.org/)**: A complete open-source authentication solution for Next.js applications. Handles OAuth and credentials authentication securely.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Shadcn UI](https://ui.shadcn.com/)**: Beautifully designed, accessible components built with Radix UI and Tailwind CSS.
- **[Biome](https://biomejs.dev/)**: A fast formatter and linter. We use Biome because it's significantly faster than Prettier/ESLint for large projects and offers zero-config defaults.
- **[Lefthook](https://github.com/evilmartians/lefthook)**: A fast and powerful Git hooks manager. It ensures code quality by running checks (like linting and type checking) before you commit code.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library, used for API and form validation.
- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible, and extensible forms with easy-to-use validation.

## 📂 Project Structure

This project follows a modular, feature-based architecture. A typical feature directory (e.g., `src/lib/features/posts`) contains:

```text
src/
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI primitives (Button, Card, etc.)
│   ├── shared/           # Shared components used across features
│   └── dashboard/        # Dashboard-specific components
├── lib/
│   └── features/         # Feature-based logic
│       ├── auth/         # Authentication (models, API, slice)
│       ├── posts/        # Posts feature
│       │   ├── api.ts          # RTK Query/Axios API definitions
│       │   ├── slice.ts        # Redux slice (state, reducers, actions)
│       │   ├── model/          # TypeScript interfaces/types
│       │   └── components/     # Feature-specific components (e.g., PostForm)
│       └── notes/        # Notes feature
├── store/                # Global Redux store configuration
├── types/                # Global type definitions (*Type.ts)
├── schemas/              # Zod validation schemas
└── utils/                # Helper functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd next-redux-template
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your secrets (e.g., `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, API URLs).

### Running the Project

**Development Server:**
Start the application in development mode with hot-reloading:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Production Build:**
Build the application for production:
```bash
npm run build
```
Start the production server:
```bash
npm start
```

**Linting:**
Run the configured linter to check for code quality issues:
```bash
npm run lint
```
