"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileNav } from "@/components/layout/mobile-nav"

const sectionLinks = [
  { label: "Sleep", href: "/sleep" },
  { label: "Nutrition", href: "/nutrition" },
  { label: "Training", href: "/training" },
  { label: "Mental Wellness", href: "/mental-wellness" },
  { label: "Injury Prevention", href: "/injury-prevention" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()
  const { data: session } = useSession()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  async function handleSignOut() {
    await signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        {/* Brand */}
        <Link href="/" className="mr-6 text-lg font-bold text-primary">
          The Young Player&apos;s Guide
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {sectionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                pathname === link.href
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              pathname.startsWith("/dashboard")
                ? "font-medium text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Dashboard
          </Link>
        </nav>

        {/* Desktop right side */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Theme toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
              {mounted && resolvedTheme === "dark" ? (
                <Moon className="size-4" />
              ) : (
                <Sun className="size-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="size-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="size-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="size-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
                {session.user.name?.[0]?.toUpperCase() ?? "U"}
                <span className="ml-1 hidden lg:inline">
                  {session.user.name}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                Login
              </Link>
              <Link href="/signup" className={cn(buttonVariants({ size: "sm" }))}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile right side */}
        <div className="flex flex-1 items-center justify-end gap-2 md:hidden">
          {/* Theme toggle (mobile) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? (
              <Moon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <MobileNav sectionLinks={sectionLinks} session={session} onSignOut={handleSignOut} />
        </div>
      </div>
    </header>
  )
}
