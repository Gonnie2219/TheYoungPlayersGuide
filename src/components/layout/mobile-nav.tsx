"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Menu } from "lucide-react"

type NavLink = {
  label: string
  href: string
}

type SessionData = {
  user: {
    name: string
    email: string
    [key: string]: unknown
  }
  [key: string]: unknown
} | null

export function MobileNav({
  sectionLinks,
  session,
  onSignOut,
}: {
  sectionLinks: NavLink[]
  session?: SessionData
  onSignOut?: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" />}>
        <Menu className="size-5" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {sectionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Separator className="my-2" />
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            Dashboard
          </Link>
          <Separator className="my-2" />
          {session ? (
            <>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setOpen(false)
                  onSignOut?.()
                }}
                className="rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground hover:text-foreground"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
