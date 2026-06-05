import React from "react"
import { Heart, Instagram, Twitter, Facebook, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:py-16 relative">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <Heart className="h-6 w-6 text-rose-500 transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold">Tekana</span>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Connecting individuals through meaningful interactions, cultural chemistry, and authentic compatibility matching.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-all">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/80">About</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="/about/team" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="/about/careers" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/80">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="/dating-tips" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Dating Tips
                </a>
              </li>
              <li>
                <a href="/success-stories" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="/safety" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Safety Guide
                </a>
              </li>
              <li>
                <a href="/faq" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/80">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/terms" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/community-guidelines" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tekana. All rights reserved. Made with <Heart className="inline h-3 w-3 text-rose-500 fill-rose-500" /> in Kenya.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
