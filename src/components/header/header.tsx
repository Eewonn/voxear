"use client"

import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuHeader() {
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-50 bg-white drop-shadow-sm/25">
      <div className="mx-auto flex max-w-6xl h-18 items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-15 w-15">
            <img src="/voxearlogo.svg" alt="Voxear Logo" className="h-full w-full" />
          </div>
          <div>
            <p className="text-md font-semibold tracking-wide">
              Voxear
            </p>
          </div>
        </div>

        <NavigationMenu className="ml-auto w-fit">
          <NavigationMenuList className="flex-wrap justify-end gap-6 text-sm font-semibold">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/how-it-works">How it works</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/api">API</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
