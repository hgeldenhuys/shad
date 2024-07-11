import { Params } from "@remix-run/react";

export const getPath = (
  pathname: string,
  params: Record<string, string> | Readonly<Params<string>>,
  param: string,
  newParam: string,
) => {
  console.log("params_[param]", params[param]);
  const path = pathname.replace(`/${params[param]}`, `/${newParam}`);
  console.log({ path });

  return path;
};
