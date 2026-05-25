import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-6 md:px-10 lg:px-12 max-w-8xl border-t border-border/40 bg-background">
      <div className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pb-45">
          <div className="space-y-4">
            <Link className="flex items-center gap-2 transition-opacity hover:opacity-80" href="/">
              <span className="text-lg font-medium">Anastasya</span>
            </Link>
            <p className="text-sm text-muted-foreground sm:max-w-md">
              Create memorable floral gifts with modern bouquets and curated arrangements.
            </p>
            <p className="text-sm text-muted-foreground sm:max-w-md">
              Have feedback? Feel free to send us a message.
            </p>
            <p className="text-sm text-muted-foreground">
              Crafted with love by <a className="text-primary underline" target="_blank" rel="noopener noreferrer" href="https://anastasya-store.com">Anastasya</a>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/browse">
                    Bouquets
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/blog">
                    Floral Tips
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/care">
                    Care Guide
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/help">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="/terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">© 2026 Anastasya. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">Made in Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;