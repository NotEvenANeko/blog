"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps, useMemo } from "react";

const Link = ({
  active,
  ...props
}: ComponentProps<typeof NextLink> &
  Pick<ComponentProps<typeof NavigationMenuLink>, "active">) => (
  <NavigationMenuLink asChild active={active}>
    <NextLink {...props} />
  </NavigationMenuLink>
);

interface Route {
  path: string;
  label: string;
}

export const Menu = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () =>
      [
        {
          path: "/",
          label: "Blog",
        },
        {
          path: "/about",
          label: "About me (WIP)",
        },
        {
          path: "/friend",
          label: "Friend (WIP)",
        },
      ] satisfies Route[],
    []
  );

  return (
    <NavigationMenu className="py-2 px-10 w-full max-w-full sticky items-start top-0 flex-col bg-background">
      <NavigationMenuList className="ms-10 mb-2 space-x-2 ">
        {routes.map(({ path, label }) => (
          <NavigationMenuItem key={path}>
            <Link href={path} active={path === pathname}>
              {label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <Separator className="mx-[-4rem]" />
    </NavigationMenu>
  );
};
