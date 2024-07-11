import { Title } from "~/components/custom/Title/Title";
import { Stack } from "~/components/custom/Stack/Stack";
import { Outlet, UIMatch, useParams } from "@remix-run/react";
import { ParamDropdownItem } from "~/shell/navigation/item/ParamDropdownItem";
import { createAppLoader } from "~/loaders/app.data-loader.server";

import { getUIMatchData } from "~/loaders/functions";
import { GradientButton } from "~/components/custom/GradientButton/GradientButton";
import { PricingCardDemo } from "~/components/custom/PricingCard/PricingCard";
import { EnhancedButton } from "~/components/custom/EnhancedButton/EnhancedButton";
import TagInput from "~/components/custom/Tags";
import { SiteMenu } from "~/shell/navigation/NavigationMenu";

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
// export function loader() {
//   return { companyNames };
// }

export const loader = createAppLoader(async ({ params }) => {
  return { companyNames };
});

export const handle = {
  breadcrumb: (match: UIMatch<ReturnType<typeof loader>, any>) => {
    const x = getUIMatchData(match) as { companyNames: string[] };
    return (
      <ParamDropdownItem
        breadcrumbLabel={match.params.companyName as string}
        paramLabel="Company"
        param="companyName"
        items={x.companyNames.map((companyName) => ({
          label: companyName,
          link: companyName,
        }))}
      />
    );
  },
};

export default function Orders() {
  const companyName = useParams().companyName as string;
  return (
    <Stack>
      <Title>Orders for {companyName}</Title>
      <GradientButton />
      <PricingCardDemo />
      <EnhancedButton variant="gooeyLeft">Button</EnhancedButton>
      <TagInput />
      <SiteMenu />
      <Outlet />
    </Stack>
  );
}
