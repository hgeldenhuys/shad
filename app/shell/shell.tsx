import * as React from "react";
import { Moon, PanelLeft, Search, Settings, Sun } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { IconUser } from "~/components/icons/user";
import { Theme, useTheme } from "remix-themes";
import { appSettings } from "~/shell/constants";
import { NavigationItem } from "~/shell/types";
import { BreadcrumbTrail } from "~/shell/BreadcrumTrail";
import { SiteCommandDialog } from "~/shell/command";

export function NavigationLink({ item }: { item: NavigationItem }) {
  const location = useLocation();
  const navigationPath = location.pathname.split("/")[1];
  const linkPath = item.link.split("/")[1];
  const isActive = navigationPath === linkPath;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={item.link}
          className={
            isActive
              ? "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              : "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          }
        >
          <item.Icon className="h-5 w-5" />
          <span className="sr-only">{item.label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onClick={() => setOpen(true)}
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
      />
      <SiteCommandDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export function MobileNavigationLink({ item }: { item: NavigationItem }) {
  const location = useLocation();
  const navigationPath = location.pathname.split("/")[1];
  const linkPath = item.link.split("/")[1];
  const isActive = navigationPath === linkPath;

  return (
    <Link
      to={item.link}
      className={
        isActive
          ? "flex items-center gap-4 px-2.5 text-foreground"
          : "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      }
    >
      <item.Icon className="h-5 w-5" />
      {item.label}
    </Link>
  );
}

export function Shell() {
  const [theme, setTheme] = useTheme();
  console.log(123, { theme });
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <appSettings.Logo className="h-4 w-4 transition-all group-hover:scale-110" />

                <span className="sr-only">{appSettings.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">{appSettings.name}</TooltipContent>
          </Tooltip>
          {appSettings.navigation.map((item) => (
            <NavigationLink key={item.id} item={item} />
          ))}
        </nav>
        <nav
          onClick={() => setTheme(theme === "dark" ? Theme.LIGHT : Theme.DARK)}
          className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <div>
                  {theme === "light" ? (
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
                  ) : (
                    <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
                  )}
                </div>
                <span className="sr-only">Toggle theme</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              {theme === "dark" ? "Turn on the lights" : "Turn off the lights"}
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="flex flex-col h-full gap-6 text-lg font-medium">
                <Link
                  to="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <appSettings.Logo className="h-5 w-5 transition-all group-hover:scale-110 red" />
                  <span className="sr-only">{appSettings.name}</span>
                </Link>
                {appSettings.navigation.map((item) => (
                  <MobileNavigationLink key={item.id} item={item} />
                ))}
                <div
                  onClick={() =>
                    setTheme(theme === "dark" ? Theme.LIGHT : Theme.DARK)
                  }
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground mt-auto"
                >
                  {theme === "light" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                  Toggle theme
                </div>
                <Link
                  to="/settings"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <BreadcrumbTrail />
          <SearchCommand />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <IconUser size={20} className="overflow-hidden rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main
          style={{ maxHeight: "calc(100dvh - 64px)" }}
          className="overflow-y-auto p-4"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
