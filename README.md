<p align="center">
  <img src="public/assets/logoanastasya.png" alt="Anastasya Logo" width="100" />
</p>

<h1 align="center">Anastasya Bouquets</h1>

<p align="center">
  <strong>A high-end e-commerce atelier & terminal-inspired backoffice management platform for bespoke floral arrangements.</strong>
</p>

<p align="center">
  <img src="/public/assets/anastasya.png" alt="Project Image" width="100%">
</p>
<p align="center">
  <img src="/public/assets/admindb.png" alt="Project Image" width="100%">
</p>

## Architecture & Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescript.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **State & Forms**: [TanStack Form](https://tanstack.com/form) for high-performance schema-based validation.
- **Data Management**: [TanStack Table](https://tanstack.com/table) for advanced filtering, sorting, and pagination.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Authentication**: JWT-based with HttpOnly cookies
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Charts**: [Recharts](https://recharts.org/)

## Key Features

### Storefront
- **Editorial Blog**: A high-contrast blog system using serif typography for long-form content and monospaced accents for metadata.
- **Advanced Product Discovery**: Category-based browsing with interactive product dialogs.
- **WhatsApp Integration**: Streamlined "Order via WhatsApp" functionality for direct customer engagement.
- **Saved Items**: Client-side item persistence for personalized shopping experiences.
- **Responsive Design**: Fully optimized for mobile and desktop with custom hooks (`use-mobile`).

### Admin Dashboard (v4.0.0)
- **Terminal Intelligence UI**: A minimalist, tech-focused dashboard using mono typography and `bg-card` containers.
- **Real-time Metrics**: Dynamic analytics grid with "System Terminal" style status panels.
- **Content Management**: Full CRUD operations for Products, Categories, and Blog posts via authenticated API routes.
- **Data Tables**: Powerful filtering and sorting using `@tanstack/react-table`.

## Structure

```text
anastasya-store/
├── app/
│   ├── (auth)/                # Clerk authentication routes (sign-in, sign-up)
│   ├── admin/                 # Backoffice management routes
│   │   ├── blog/              # Blog post CRUD & editorial management
│   │   ├── categories/        # Category administration
│   │   ├── products/          # Product catalog & inventory controls
│   │   └── AdminDashboard.tsx # Terminal-inspired telemetry & metrics HUD
│   ├── api/                   # Route handlers (REST endpoints & Clerk webhooks)
│   ├── blog/                  # Customer-facing editorial blog & post details
│   ├── browse/                # Product catalog with category filter & pagination
│   ├── landing/               # Brand storytelling & flagship showcase
│   ├── layout.tsx             # Root application layout & font declarations
│   └── page.tsx               # Storefront homepage
├── components/
│   ├── admin/                 # Admin data tables, uploaders & modal dialogs
│   ├── landing/               # Hero, Staff Picks, Categories, FAQ, & CTA
│   ├── navigations/           # StoreNavbar, AdminSidebar, CurvedMenu, & Footer
│   ├── products/              # ProductCards, SavedItemsSheet, & SizeGuideModal
│   └── ui/                    # Reusable shadcn/ui & custom micro-interaction components
├── hooks/                     # Custom React hooks (useMobile, useSavedItems, etc.)
├── lib/                       # Prisma client, authentication helpers, & utilities
├── prisma/                    # Prisma schema, migrations, & database config
├── public/
│   └── assets/                # Brand logos, mockups, sizing charts, & static images
├── types/                     # Shared TypeScript interfaces & API contracts
├── next.config.ts             # Next.js build & image optimization settings
├── package.json               # Project manifest & dependency specifications
└── tsconfig.json              # Strict TypeScript configuration
```

---

## ✦ Getting Started

### Prerequisites

- **Node.js**: v20.x or higher
- **npm** / **pnpm** / **yarn**
- **PostgreSQL**: Local instance or cloud database (e.g., [Neon](https://neon.tech/))
- **Clerk Account**: For authentication keys
- **Cloudinary Account**: For media uploads and asset CDN

### 1. Clone the Repository

```bash
git clone https://github.com/xavierzaidane/anastasya-store.git
cd anastasya-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and populate the required environment variables:

```env
# Database (PostgreSQL / Neon)
DATABASE_URL="postgresql://user:password@localhost:5432/anastasya?sslmode=require"

# Environment Mode
NODE_ENV="development"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"

# Cloudinary Media Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Optional: Custom JWT Secret for legacy routes
JWT_SECRET="your_jwt_secret"
```

### 4. Database Setup & Migrations

Generate the Prisma Client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Launch Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the storefront, or navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to explore the admin dashboard.

---

## ✦ Engineering Highlights

- **Server-First Architecture**: Extensive use of **React Server Components (RSC)** to fetch products, categories, and blog articles directly on the server, eliminating client waterfall requests and improving First Contentful Paint (FCP).
- **Tailwind CSS v4 & Theme System**: Leverages the high-performance Rust-based engine of Tailwind CSS v4 with CSS custom properties (`@theme`), maintaining strict contrast ratios across light and dark interfaces.
- **Client-Side Image Manipulation**: Integrates `react-easy-crop` with HTML canvas transforms to crop and optimize images before pushing directly to Cloudinary, ensuring uniform aspect ratios across all product cards and banners.
- **Conversational Checkout Workflow**: Eliminates heavy traditional multi-step checkout friction for regional boutique floristry by serializing cart payloads into formatted WhatsApp API deep-links with item counts, notes, and totals.
- **Micro-Interaction Fidelity**: Custom ref-forwarded interactive ripple buttons that measure pointer entry coordinates and smoothly scale animated radial fills without blocking click propagation.

---

## ✦ Author & Contact

**Xavier Zaidane**

- **GitHub**: [@xavierzaidane](https://github.com/xavierzaidane)
- **Repository**: [anastasya-store](https://github.com/xavierzaidane/anastasya-store)

---

## ✦ License

This project is proprietary software developed for portfolio and commercial presentation. All rights reserved.
