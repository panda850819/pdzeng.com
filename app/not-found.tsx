import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] w-full max-w-5xl flex-col items-start justify-center px-6">
      <p className="text-sm text-bamboo">404</p>
      <h1 className="display-tracking mt-3 font-display text-4xl font-semibold">
        This page moved or never existed
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The old blog lived at blog.pdzeng.com — some paths changed in the rebuild.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-full bg-bamboo px-5 py-2.5 text-sm font-medium text-canvas transition-transform duration-150 active:scale-95"
        >
          Back home
        </Link>
        <Link href="/writing/" className="glass rounded-full px-5 py-2.5 text-sm text-ink">
          Browse writing
        </Link>
      </div>
    </div>
  );
}
