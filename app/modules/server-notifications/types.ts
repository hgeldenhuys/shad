import type { ExternalToast } from "sonner";

export type ServerNotification = {
  message: string;
  type: "success" | "error" | "info" | "warning" | "loading" | "message";
  data?: ExternalToast;
};
