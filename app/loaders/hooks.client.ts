import { useLoaderData } from "@remix-run/react";
import { ServerNotification } from "~/modules/server-notifications/types";

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
