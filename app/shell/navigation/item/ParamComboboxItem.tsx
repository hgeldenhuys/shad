import * as React from "react";
import { ReactNode } from "react";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ContextItemProps } from "~/shell/navigation/item/types";
import { getPath } from "~/shell/navigation/item/helpers";
import { useNavigate, useParams } from "@remix-run/react";

export function ParamComboboxItem({
  breadcrumbLabel,
  paramLabel,
  items,
  param,
  emptyLabel = "Nothing found.",
}: {
  breadcrumbLabel: ReactNode;
  paramLabel: string;
  items: ContextItemProps[];
  param: string;
  emptyLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const params_ = useParams();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div style={{ width: "100%" }} className="text-center">
          {breadcrumbLabel}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandInput placeholder={paramLabel} className="h-9" />
          <CommandEmpty>{emptyLabel}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.link}
                  value={item.link}
                  onSelect={(currentValue) => {
                    navigate(
                      getPath(location.pathname, params_, param, item.link),
                    );
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      params_[param] === item.link
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
