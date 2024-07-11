import type { ServerNotification } from "~/modules/server-notifications/types";
import { createContext, useContext, useEffect } from "react";
import { toast } from "sonner";

export type ServerNotificationType = {
  get: ServerNotification[];
};
export const ServerNotificationsContext = createContext<ServerNotificationType>(
  {
    get: [],
  },
);
export const ServerNotificationsProvider = ServerNotificationsContext.Provider;
export const useServerNotifications = () =>
  useContext(ServerNotificationsContext);
let toasted = false;

export function ServerNotifications() {
  const { get } = useServerNotifications();
  useEffect(() => {
    if (toasted) return;
    toasted = true;
    get.forEach((notification) => {
      toast[notification.type || "message"](
        notification.message,
        notification.data,
      );
    });
    fetch("/action/notifications", {
      method: "DELETE",
    }).catch((e) => console.error(e));
  }, []);
  return null;
}
