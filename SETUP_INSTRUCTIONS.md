# React + Tailwind + shadcn/ui Setup Instructions

It appears your current `p:\portfolio` directory is a vanilla HTML/CSS/JS project. To properly utilize the React components (like the `theme-tabs` component just added), you will need to migrate your project to a modern React framework. We recommend using **Vite** or **Next.js**. 

Here are the step-by-step instructions to initialize a React environment, install Tailwind CSS, TypeScript, and the shadcn CLI in your existing project folder (or in a new subfolder).

## 1. Initialize a React Framework (Next.js Recommended)

Next.js provides a robust starting point that integrates seamlessly with shadcn/ui. 

Run the following command to create a new Next.js app in the current directory (note: this may conflict with your existing `index.html` and other files, so you might want to create it in a subfolder or back up your files first):

```bash
npx create-next-app@latest .
```

Choose the following options when prompted:
- TypeScript: **Yes**
- Tailwind CSS: **Yes**
- ESLint: **Yes**
- App Router: **Yes**
- `src/` directory: **No** (or Yes, if you prefer, but the components just generated are at the root `components/` folder)

## 2. Initialize shadcn/ui CLI

Once the React framework is set up, initialize `shadcn/ui` to configure your component structure and Tailwind properly.

```bash
npx shadcn@latest init
```

Choose the following options during initialization:
- Which style would you like to use? **Default** or **New York**
- Which color would you like to use as base color? (e.g., **Slate**)
- Do you want to use CSS variables for colors? **Yes**

## 3. Why `components/ui`?

You might wonder why we placed the generated components inside the `components/ui` folder. 
The `components/ui` directory is the default location configured by the shadcn CLI for generic, reusable UI building blocks (buttons, inputs, tabs, etc.). 
- It helps separate **primitive UI components** from your **application-specific components** (which can just go in `components/`).
- The shadcn CLI automatically drops new components you install (e.g., `npx shadcn-ui@latest add button`) into this folder.

## 4. Aliases

Make sure your `tsconfig.json` has path aliases set up correctly (this is usually handled automatically by Next.js and shadcn). It should look like this:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

This is important because all the components imported in the files (like `import { cn } from "@/lib/utils"`) rely on the `@/` alias to resolve from the root of your project.

## 5. Next Steps

- Move your existing `index.html` content into the React component structure (e.g., Next.js `app/page.tsx`).
- Run your development server with `npm run dev`.
- You can now use the `<DemoOne />` or `<Component />` from `components/ui/demo.tsx` in your app!
