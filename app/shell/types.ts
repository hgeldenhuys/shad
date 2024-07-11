import { ReactNode } from "react";

export type AppSettings = {
  name: string;
  Logo: ({ className }: { className?: string }) => ReactNode;
  navigation: NavigationItem[];
};

export type NavigationItem = {
  id: string;
  label: string;
  Icon: ({ className }: { className?: string }) => ReactNode;
  link: string;
};
