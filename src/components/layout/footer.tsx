import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const sectionLinks = [
  { label: "Sleep", href: "/sleep" },
  { label: "Nutrition", href: "/nutrition" },
  { label: "Training", href: "/training" },
  { label: "Mental Wellness", href: "/mental-wellness" },
  { label: "Injury Prevention", href: "/injury-prevention" },
]

const resourceLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Log Entry", href: "/dashboard/log" },
  { label: "My Plans", href: "/dashboard/plans" },
  { label: "Progress", href: "/dashboard/progress" },
  { label: "Citations", href: "/citations" },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="text-lg font-bold text-primary">
              The Young Player&apos;s Guide
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              A comprehensive youth soccer development resource.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Sections</h3>
            <ul className="space-y-2">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="rounded-lg border border-muted bg-muted/50 p-4 text-center text-xs text-muted-foreground">
          <p className="font-medium">Disclaimer</p>
          <p className="mt-1">
            The information provided on this site is for educational purposes
            only and is not intended as medical, nutritional, or professional
            training advice. Always consult a qualified healthcare provider,
            registered dietitian, or certified coach before making changes to a
            young player&apos;s routine. The authors and contributors are not
            liable for any injury or adverse outcome resulting from the use of
            this information.
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} The Young Player&apos;s Guide. All
          rights reserved.
        </p>
      </div>
    </footer>
  )
}
