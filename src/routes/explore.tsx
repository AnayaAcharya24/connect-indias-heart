import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — SAC Community" },
      { name: "description", content: "Discover reels, posts and event moments from across the SAC Community — sports, arts, gaming, festivals and more." },
      { property: "og:title", content: "Explore — SAC Community" },
      { property: "og:description", content: "Reels, posts and event culture from across India's SAC Community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { reel?: string | undefined; post?: string | undefined; from?: string | undefined } => ({
    from: typeof search["from"] === "string" && search["from"] ? search["from"] : undefined,
    reel: typeof search["reel"] === "string" && search["reel"] ? search["reel"] : undefined,
    post: typeof search["post"] === "string" && search["post"] ? search["post"] : undefined,
  }),
  component: ExplorePage,
});

/* ------------------------------------------------------------------------ page ---- */

// Intentionally blank: the header and the route (with its ?post / ?reel params) stay, nothing else renders.
function ExplorePage() {
  return (
    <main className="min-h-[100svh] bg-background">
      <h1 className="sr-only">Explore</h1>
    </main>
  );
}
