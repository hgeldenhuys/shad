import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { DashboardBlock } from "~/pages/dashboard.block";
import { Link } from "@remix-run/react";
import { type ServerNotification } from "~/modules/server-notifications/types";
import { getNotificationSession } from "~/modules/server-notifications/server-notifications.server";
import { useServerNotifications } from "~/modules/server-notifications/server-notifications-provider";
import { toast } from "sonner";

export const handle = {
  breadcrumb: () => <Link to="/parent/child">Child Route</Link>,
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// export const loader = createAppLoader(async (args) => {
//   return { hello: "world" };
// });

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.clone().formData();
  const notifications = JSON.parse(
    formData.get("data") as string,
  ) as ServerNotification[];

  const notificationStorage = await getNotificationSession(request);

  return json(
    {
      success: true,
    },
    {
      headers: {
        "set-cookie": await notificationStorage.push(notifications),
      },
    },
  );
}

export default function Index() {
  // const data = useAppLoaderData<typeof loader>();
  // console.log("data", data);
  // const data = useAppLoaderData();
  const { get } = useServerNotifications();
  const handleClearNotifications = async () => {
    await fetch("/action/notifications", {
      method: "DELETE",
    });
  };

  const handleNotify = async () => {
    toast.success("Test notification", {
      action: {
        label: "Dismiss",
        onClick: () => {
          console.log("Dismissed");
        },
      },
    });
  };
  return <DashboardBlock />;
  // <Stack>
  //   <Form method="post">
  //     <input
  //       type="hidden"
  //       name="data"
  //       value={JSON.stringify({
  //         message: "Test notification 2",
  //         type: "error",
  //       } satisfies ServerNotification)}
  //     />
  //     <Button type="submit" variant="outline">
  //       Push Notification
  //     </Button>
  //   </Form>
  //   <Button onClick={handleNotify}>Notify</Button>
  //   <Link to="/test/test-error-boundary">Test Error Boundary</Link>
  //   <Button onClick={handleClearNotifications}>Clear Notifications</Button>
  //   <div style={{ marginLeft: 100 }}>
  //     Matches
  //     <header>
  //       <ol>
  //         {matches
  //           .filter(
  //             (match: UIMatch<any, any>) =>
  //               match.handle && match.handle.breadcrumb,
  //           )
  //           .map((match: UIMatch<any, any>, index) => (
  //             <li key={index}>{match.handle.breadcrumb(match)}</li>
  //           ))}
  //       </ol>
  //     </header>
  //   </div>

  // </Stack>
}
