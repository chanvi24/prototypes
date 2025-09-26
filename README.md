# Template Bank - Prototype Development Hub

A Nuxt.js-based template bank designed for rapid prototype development and experimentation. This project provides a clean foundation with a collapsible navigation system to help you organize and showcase multiple prototypes in one place.

Good for prototyping your idea with Copilot Agent

## 🛠️ Tech Stack

- **Nuxt 3**: Full-stack Vue framework
- **Nuxt UI**: Component library with beautiful, accessible components
- **Tailwind CSS**: Utility-first CSS framework (included with Nuxt UI)

## 📁 Project Structure

```
app/
├── layouts/
│   └── default.vue      # Main layout with collapsible navigation
├── navigation/
│   └── routes.ts        # Navigation routes configuration
├── pages/
│   ├── index.vue        # Home page
│   ├── button/
│   │   └── index.vue    # Button prototype example
│   └── helloworld/
│       └── index.vue    # Hello World prototype example
```

## 🛠️ Adding New Prototypes

To add a new prototype to your template bank:

1. **Create a new folder** in the `app/pages/` directory with your prototype name:

   ```
   app/pages/your-prototype-name/
   ```

2. **Add an index.vue file** inside your new folder:

   ```vue
   <template>
     <div>
       <h1>Your Prototype Title</h1>
       <!-- Your prototype content here -->
     </div>
   </template>
   ```

3. **Update the navigation**: To add your new page to the sidebar navigation, edit `app/navigation/routes.ts` and add a new entry to the exported array:
   ```ts
   // app/navigation/routes.ts
   export default [
     // ...existing routes
     {
       path: "/your-prototype-name",
       name: "Your Prototype",
       icon: "🔧", // or any emoji/icon
     },
   ];
   ```
   The navigation bar will automatically update to include your new prototype.

## 🏃‍♂️ Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## 📖 Usage Tips

- Use the hamburger menu (☰) in the top-left to toggle the navigation sidebar
- To add a new page to the navigation, simply update `app/navigation/routes.ts`—no need to manually edit the layout
- Each prototype should be self-contained within its own page folder
- Leverage Nuxt's auto-import features for components and composables
- Use the existing examples (`button` and `helloworld`) as templates for new prototypes

Happy prototyping! 🎨
