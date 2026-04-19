import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { cx, layout, surfaces, typography } from "@/lib/design-system";

type InfoPageShellProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
};

export function InfoPageShell({
  eyebrow,
  title,
  lead,
  children,
}: InfoPageShellProps) {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-[100svh] bg-ink">
        <section className="border-b border-rule">
          <div className={cx(layout.page, "pb-18 pt-36 md:pb-24 md:pt-44")}>
            <div className="max-w-3xl">
              <p className={typography.eyebrow}>{eyebrow}</p>
              <h1 className={cx("mt-6", typography.displayTitle)}>{title}</h1>
              <p className={cx("mt-8 max-w-2xl", typography.bodyLarge)}>{lead}</p>
            </div>
          </div>
        </section>

        <section>
          <div className={cx(layout.page, layout.compactSectionSpace)}>
            <div className={cx(surfaces.quietPanel, "p-8 md:p-10")}>{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
