// shadcn
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

// assets
import { SearchIcon } from "lucide-react";

//  ------------------------------ | KBD - INPUT GROUP | ------------------------------  //

export interface KbdInputGroupProps extends React.ComponentProps<"div"> {
  onSearchClick?: () => void;
}

export default function KbdInputGroup({ onSearchClick, className, onClick, ...props }: KbdInputGroupProps = {}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(e);
    if (onSearchClick) onSearchClick();
  };

  return (
    <div className={`flex w-full max-w-xs flex-col ${className ?? ""}`} onClick={handleClick} {...props}>
      <InputGroup className={onSearchClick || onClick ? "cursor-pointer" : ""}>
        <InputGroupInput
          placeholder="Search..."
          readOnly={Boolean(onSearchClick || onClick)}
          className={onSearchClick || onClick ? "cursor-pointer" : ""}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
  <InputGroupAddon align="inline-end">
  <Kbd className="!rounded-full px-1.5 bg-neutral-200/70 dark:bg-neutral-800">⌘</Kbd>
  <Kbd className="!rounded-full px-1.5 bg-neutral-200/70 dark:bg-neutral-800">K</Kbd>
</InputGroupAddon>
      </InputGroup>
    </div>
  );
}

