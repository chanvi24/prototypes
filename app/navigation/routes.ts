export interface NavRoute {
  path: string;
  label: string;
  icon: string;
}

export const navRoutes: NavRoute[] = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/button", label: "Button", icon: "🔘" },
  { path: "/helloworld", label: "Hello World", icon: "👋" },
  { path: '/pomodoro', label: 'Pomodoro', icon: '⏰' },
  { path: '/tictactoe', label: 'Tic Tac Toe', icon: '🎮' },
];
