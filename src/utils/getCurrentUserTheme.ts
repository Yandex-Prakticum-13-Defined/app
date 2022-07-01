export function getCurrentUserTheme(themeObj: Record<string, string>, userId: string): string {
  const currentUser = Object.keys(themeObj).find((item) => item === userId);

  return currentUser ? themeObj[currentUser] : 'light';
}
