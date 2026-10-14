import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { Route as ExploreRoute } from "@/routes/explore";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("keeps /explore a real page whose body is only the screen-reader heading", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/explore").at(-1)?.routeId).not.toBe(rootRouteId);

    // Drop class names so the check is about what renders, not how it looks.
    const body = renderToStaticMarkup(createElement(ExploreRoute.options.component as ComponentType)).replace(
      / class="[^"]*"/g,
      "",
    );

    expect(body).toBe("<main><h1>Explore</h1></main>");
  });

  it("still opens /explore?post=…, ?reel=… and ?from=… instead of rejecting them", () => {
    const validate = ExploreRoute.options.validateSearch as (
      search: Record<string, unknown>,
    ) => Record<string, unknown>;

    expect(validate({ post: "p1", reel: "r1", from: "you" })).toEqual({ post: "p1", reel: "r1", from: "you" });
    expect(validate({ post: "", reel: 3 })).toEqual({ post: undefined, reel: undefined, from: undefined });
  });
});
