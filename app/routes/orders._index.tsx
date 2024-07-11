import { Title } from "~/components/custom/Title/Title";
import { Stack } from "~/components/custom/Stack/Stack";
import { Link } from "@remix-run/react";

const companyNames = [
  "Acme",
  "Apple",
  "Amazon",
  "Microsoft",
  "Google",
  "Facebook",
  "Twitter",
  "Netflix",
  "Spotify",
  "Uber",
];

export default function Orders() {
  return (
    <Stack>
      <Title>Orders</Title>
      <Title order={2}>Companies</Title>
      {companyNames.map((orderType) => (
        <Link key={orderType} to={`/orders/${orderType}`}>
          {orderType}
        </Link>
      ))}
    </Stack>
  );
}
