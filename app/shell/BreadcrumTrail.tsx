import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
// import { DropdownMenuDemo } from "~/shell/navigation/DropdownMenu";
import { UIMatch, useMatches } from "@remix-run/react";
import * as React from "react";
import { Fragment } from "react";
import { SiteMenu } from "~/shell/navigation/NavigationMenu";

export function BreadcrumbTrail() {
  const matchesRaw: UIMatch<any, any>[] = useMatches();
  const matches = matchesRaw.filter(
    (match) => match.handle && match.handle.breadcrumb,
  );

  const breadcrumbs = matches.filter((match) => {
    return match.handle?.breadcrumb;
  });
  if (breadcrumbs.length === 0) return <SiteMenu />;
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {matches.map((match, index) =>
          index < matches.length - 1 ? (
            <Fragment key={index}>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  {match.handle.breadcrumb(match)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ) : (
            <Fragment key={index}>
              <BreadcrumbItem key={index}>
                {match.handle.breadcrumb(match, true)}
              </BreadcrumbItem>
            </Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
