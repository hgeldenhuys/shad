import {
  ActionFunctionArgs,
  defer,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { themeSessionResolver } from "~/sessions.server";
import {
  AppAction,
  AppActionResult,
  ApplicationAction,
  ApplicationActionError,
  ApplicationActionSuccess,
} from "~/loaders/types.server";
import { getNotificationSession } from "~/modules/server-notifications/server-notifications.server";

// Type guard to check if action is success
function isSuccess<T>(
  action: ApplicationAction<T>,
): action is ApplicationActionSuccess<T> {
  return action.status === "success";
}

// Type guard to check if action is error
function isError<T>(
  action: ApplicationAction<T>,
): action is ApplicationActionError {
  return action.status === "error";
}

export async function createAppAction<T>(
  action: AppAction<T>,
): Promise<AppActionResult<T>> {
  return async (args: ActionFunctionArgs) => {
    const result = await action(args);
    const notificationStorage = await getNotificationSession(args.request);
    const { notifications = [] } = result;
    if (notifications.length > 0) delete result.notifications;

    if (isError<T>(result)) {
      notifications.push({
        message: result.error?.message || "Unknown error",
        type: "error",
      });
    }
    return defer(result, {
      headers: {
        "set-cookie": await notificationStorage.push(notifications),
      },
    });
  };
}

export function createAppLoader<T>(loader: LoaderFunction) {
  return async (args: LoaderFunctionArgs) => {
    const result = (await loader(args)) as T;
    const notificationStorage = await getNotificationSession(args.request);
    const notifications = notificationStorage.getNotifications();
    return defer(
      { result, notifications },
      {
        headers: {
          "set-cookie": await notificationStorage.clear(),
        },
      },
    );
  };
}

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
