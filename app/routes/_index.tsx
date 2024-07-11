import type { MetaFunction } from "@remix-run/node";
import { DashboardBlock } from "~/pages/dashboard.block";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader() {
  return new Response("Hello world2");
}

export default function Index() {
  const x = useFetcher({ key: "root/notifications" });
  console.log({ x }, x.data);
  useEffect(() => {
    x.load("/notifications");
  }, []);
  return <DashboardBlock />;
}
