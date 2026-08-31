export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-semibold tracking-widest text-brand uppercase">
          Legal
        </p>
        <h1 className="font-heading mt-4 text-3xl font-extrabold text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {updated}
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_h2]:first:mt-0 [&_ul]:text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
