export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="aurora-blob absolute -top-40 left-[8%] h-[34rem] w-[34rem] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle at center, oklch(66% 0.1 165), transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="aurora-blob absolute top-[45%] right-[-6%] h-[28rem] w-[28rem] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle at center, oklch(75% 0.09 80), transparent 65%)",
          filter: "blur(90px)",
          animationDelay: "-13s",
        }}
      />
    </div>
  );
}
