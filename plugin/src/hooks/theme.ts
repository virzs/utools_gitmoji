const useTheme = () => {
  const d = window.matchMedia("(prefers-color-scheme: dark)");
  return d.matches;
};

export default useTheme;
