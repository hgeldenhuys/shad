import { ServerNotification } from "~/modules/server-notifications/types";
import { useLoaderData } from "@remix-run/react";

export function useAppLoaderData<
  T,
  L extends { result: T; notifications?: ServerNotification[] } = {
    result: T;
    notifications?: ServerNotification[];
  },
>() {
  const data = useLoaderData() as L;
  const { notifications } = data;
  console.log({ notifications });
  return data?.result;
}
