import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/server-runtime";

import { ServerNotification } from "~/modules/server-notifications/types";
import { getNotificationSession } from "~/modules/server-notifications/server-notifications.server";

const successPayload = { success: true };

export async function action({ request }: ActionFunctionArgs) {
  const notificationStorage = await getNotificationSession(request);
  if (request.method.toUpperCase() === "DELETE") {
    console.log("DELETE");
    return json(successPayload, {
      headers: {
        "set-cookie": await notificationStorage.clear(),
      },
    });
  }
  if (request.method.toUpperCase() === "POST") {
    console.log("POST");
    const notifications = (await request.json()) as ServerNotification[];
    return json(successPayload, {
      headers: {
        "set-cookie": await notificationStorage.push(notifications),
      },
    });
  }
  throw new Response("Invalid method", { status: 400 });
}
