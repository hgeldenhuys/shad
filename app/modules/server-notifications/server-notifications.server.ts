import { createCookieSessionStorage } from "@remix-run/node";
import { ServerNotification } from "~/modules/server-notifications/types";

const isProduction = process.env.NODE_ENV === "production";

const notificationSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "notifications",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "your-production-domain.com", secure: true }
      : {}),
  },
});

export async function getNotificationSessionStorage(request: Request) {
  return notificationSessionStorage.getSession(request.headers.get("cookie"));
}

export async function getNotificationSession(request: Request) {
  const session = await getNotificationSessionStorage(request);

  return {
    getNotifications: () => {
      if (session.has("notifications")) {
        return session.get("notifications") as ServerNotification[];
      }
      return [];
    },
    push: (notifications: ServerNotification | ServerNotification[]) => {
      const oldNotifications = session.get("notifications");
      console.log({ oldNotifications });
      const messages =
        session.has("notifications") &&
        Array.isArray(session.get("notifications")) &&
        session
          .get("notifications")
          .every((message: never) => "message" in message)
          ? session.get("notifications")
          : [];
      if (Array.isArray(notifications)) {
        session.set("notifications", [...messages, ...notifications]);
      } else {
        session.set("notifications", [...messages, notifications]);
      }
      const newNotifications = session.get("notifications");
      console.log({ newNotifications });
      return notificationSessionStorage.commitSession(session);
      // return session.get("notifications");
    },
    clear: () => {
      session.unset("notifications");
      return notificationSessionStorage.commitSession(session);
    },
  };
}
