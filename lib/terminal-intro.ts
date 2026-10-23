// The homepage terminal intro plays once per browser session, and never for reduced motion.
export const INTRO_KEY = "pdzeng:terminal-intro";

export const shouldPlayIntro = ({ seen, reduced }: { seen: boolean; reduced: boolean }) => !seen && !reduced;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n: number) => String(n).padStart(2, "0");

// login(1) style, local time: "Last login: Fri Oct 23 09:05:07 on ttys001"
export function lastLoginLine(d: Date) {
  const day = String(d.getDate()).padStart(2, " ");
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  return `Last login: ${DAYS[d.getDay()]} ${MONTHS[d.getMonth()]} ${day} ${time} on ttys001`;
}
