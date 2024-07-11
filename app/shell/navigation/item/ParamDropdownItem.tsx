import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ReactNode, useState } from "react";
import { useLocation, useNavigate, useParams } from "@remix-run/react";
import { ContextItemProps } from "~/shell/navigation/item/types";
import { getPath } from "~/shell/navigation/item/helpers";

export function ParamDropdownItem({
  breadcrumbLabel,
  paramLabel,
  items,
  param,
}: {
  breadcrumbLabel: ReactNode;
  paramLabel: string;
  items: ContextItemProps[];
  param: string;
}) {
  const [open, setOpen] = useState(false);
  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };
  const params_ = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <div onMouseEnter={handleMouseEnter}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild className="justify-center">
          <div style={{ width: "100%" }} className="text-center">
            {breadcrumbLabel}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="debug-content items-center"
          onMouseLeave={handleMouseLeave}
        >
          <DropdownMenuLabel className="debug-label text-center">
            {paramLabel}
          </DropdownMenuLabel>
          {items.map((item) => (
            <DropdownMenuItem
              className="debug-item justify-center"
              onClick={() => {
                setOpen(false);
                // alert(getPath(item.link));
                navigate(getPath(location.pathname, params_, param, item.link));
              }}
              key={item.link}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
