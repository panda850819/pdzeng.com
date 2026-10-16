"use client";

// The stored choice lives in localStorage("theme"); with nothing stored the system preference wins.
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button type="button" onClick={toggle} aria-label="切換亮暗主題" className="theme-btn">
      亮暗
    </button>
  );
}
