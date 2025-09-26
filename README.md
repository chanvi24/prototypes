# Prototype Development Hub

Build quick prototypes using AI-powered development with simple prompts.

## 🚀 Quick Start

Simply describe what you want to build in the Github Copilot Agent mode,
and the AI will create a fully functional prototype for you!

### Example Prompts:

```
Build a tic-tac-toe game with player vs computer, with the follwoing criteria: win sounds, and game history
1. User gets to choose whether they play as 0 or X
2. If user wins, please make a sound
3. Has a list of history of of the games on the left hand side and store it in cookies
4. User has an ability to delete each history or all of them
Ask me if u have any questions.
```

## 🛠️ Tech Stack

- **Nuxt 3**: Full-stack Vue framework
- **Nuxt UI**: Component library with beautiful, accessible components
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development

## 📁 Project Structure

```
app/
├── layouts/
│   └── default.vue      # Main layout with collapsible navigation
├── navigation/
│   └── routes.ts        # Navigation routes configuration
├── pages/
│   ├── index.vue        # Home page
│   ├── pomodoro/
│   │   └── index.vue    # Pomodoro timer prototype
│   └── tictactoe/
│       └── index.vue    # Tic-tac-toe game prototype
```

## 🛠️ Manual Prototype Development

If you want to manually add prototypes:

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

Happy prototyping! 🎨
