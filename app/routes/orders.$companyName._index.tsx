import { Stack } from "~/components/custom/Stack/Stack";
import { Link, useParams } from "@remix-run/react";

export default function Orders() {
  const companyName = useParams().companyName as string;
  return (
    <Stack>
      {["completed", "pending", "cancelled"].map((orderType) => (
        <Link key={orderType} to={`/orders/${companyName}/${orderType}`}>
          {orderType}
        </Link>
      ))}
    </Stack>
  );
}
