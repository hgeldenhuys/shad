import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useFormAction,
  useRouteLoaderData,
} from "@remix-run/react";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { themeSessionResolver } from "~/sessions.server";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { clsx } from "clsx";
import globalStyles from "./styles/global.css?url";
import { cssBundleHref } from "@remix-run/css-bundle";
import { TooltipProvider } from "~/components/ui/tooltip";
import { ReactNode } from "react";
import { GlobalErrorBoundary } from "~/pages/error-boundary";
import { Shell } from "~/shell/shell";
import { Toaster } from "~/components/ui/sonner";
import { getNotificationSession } from "~/modules/server-notifications/server-notifications.server";
import {
  ServerNotifications,
  ServerNotificationsProvider,
} from "~/modules/server-notifications/server-notifications-provider";
import { type ServerNotification } from "~/modules/server-notifications/types";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  const theme = getTheme();
  const notificationStorage = await getNotificationSession(request);
  const notifications = notificationStorage.getNotifications();
  return {
    theme,
    notifications,
  };
}

export function Layout({ children }: { children: ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root")!;
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <ServerNotificationsProvider
        value={{ get: data.notifications as ServerNotification[] }}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <ServerNotifications />
      </ServerNotificationsProvider>
    </ThemeProvider>
  );
}

export default function App({ children }: { children: ReactNode }) {
  const [theme] = useTheme();
  const data = useFormAction();
  console.log({ data }, 111);
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
        <Links />
      </head>
      <body>
        {theme === "light" ? (
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        ) : (
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        )}
        <Shell />
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary = GlobalErrorBoundary;
