'use client';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function AdminLayout({
  children,
  title,
  description,
}: AdminLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      {(title || description) && (
        <div className="space-y-1">
          {title && <h1 className="text-2xl font-semibold text-foreground">{title}</h1>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {/* Page Content */}
      <div className="grid gap-6 auto-rows-max">
        {children}
      </div>
    </div>
  );
}
