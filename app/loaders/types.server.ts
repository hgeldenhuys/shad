// Define a type that enforces data to be undefined when status is error
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ServerNotification } from "~/modules/server-notifications/types";

export type ApplicationActionSuccess<T> = {
  status: "success";
  data: T;
  notifications?: ServerNotification[];
};
export type ApplicationActionError = {
  status: "error";
  data: undefined;
  errorType: "server" | "form";
  error?: { message: string };
  formErrors?: string[];
  fieldErrors?: Record<string, string[]>;
  notifications?: ServerNotification[];
};
export type ApplicationAction<T> =
  | ApplicationActionSuccess<T>
  | ApplicationActionError;
export type AppAction<T> = (
  args: ActionFunctionArgs,
) => Promise<ApplicationAction<T>>;
export type AppActionFunction<T> = (
  args: ActionFunctionArgs,
) => Promise<AppAction<T>>;
export type AppActionResult<T> = Omit<AppActionFunction<T>, "notifications">;
export type AppLoaderData<T> = T & {
  notifications?: ServerNotification[];
};
export type AppLoaderFunction<T> = (
  args: LoaderFunctionArgs,
) => Promise<AppLoaderData<T>>;
export type AppLoaderResult<T> = {
  result: Omit<AppLoaderFunction<T>, "notifications">;
};
