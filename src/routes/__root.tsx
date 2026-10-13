import { DirectionProvider } from "@base-ui/react/direction-provider";
import { createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "مدخل مبسّط إلى العلاج النفسي والعلاج المعرفي السلوكي",
      },
      {
        name: "description",
        content:
          "دليل تعليمي عربي إلى العلاج النفسي والعلاج المعرفي السلوكي، مع أمثلة ورسوم توضيحية وتمارين اختيارية.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const turkish = useRouterState({ select: (state) => /^\/tr\/?$/.test(state.location.pathname) });
  const direction = turkish ? "ltr" : "rtl";
  return (
    <html lang={turkish ? "tr" : "ar"} dir={direction}>
      <head>
        <HeadContent />
      </head>
      <body>
        <DirectionProvider direction={direction}>{children}</DirectionProvider>
        <Scripts />
      </body>
    </html>
  );
}
