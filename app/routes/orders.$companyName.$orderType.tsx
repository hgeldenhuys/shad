import { Outlet, useParams } from "@remix-run/react";

export type OrderType = "completed" | "pending" | "cancelled";

export default function Orders() {
  const orderType = useParams().orderType as OrderType;
  return (
    <>
      <Outlet />
    </>
  );
}
