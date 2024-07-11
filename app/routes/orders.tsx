import { Outlet } from "@remix-run/react";
import { Stack } from "~/components/custom/Stack/Stack";
import { ParamComboboxItem } from "~/shell/navigation/item/ParamComboboxItem";

export const handle = {
  breadcrumb: () => {
    return (
      <ParamComboboxItem
        param="order"
        paramLabel="Order"
        items={[]}
        breadcrumbLabel={"Orders"}
      />
    );
  },
};

export default function Orders() {
  return (
    <Stack padding={"4"}>
      <Outlet />
    </Stack>
  );
}
