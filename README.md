# Anastasya - Luxury Editorial Storefront & Admin

Anastasya is a high-end, minimalist e-commerce platform and editorial blog system. It features a sophisticated design language blending "Terminal Intelligence" (monospaced data layouts) with "Elegant Editorial" (serif-driven narratives). The application is built with a focus on luxury aesthetics, high-performance interactions, and a seamless management experience.

## 🏗️ Architecture & Tech Stack

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

## ✨ Key Features

### 🛍️ Storefront
- **Editorial Blog**: A high-contrast blog system using serif typography for long-form content and monospaced accents for metadata.
- **Advanced Product Discovery**: Category-based browsing with interactive product dialogs.
- **WhatsApp Integration**: Streamlined "Order via WhatsApp" functionality for direct customer engagement.
- **Saved Items**: Client-side item persistence for personalized shopping experiences.
- **Responsive Design**: Fully optimized for mobile and desktop with custom hooks (`use-mobile`).

### 🛡️ Admin Dashboard (v4.0.0)
- **Terminal Intelligence UI**: A minimalist, tech-focused dashboard using mono typography and `bg-card` containers.
- **Real-time Metrics**: Dynamic analytics grid with "System Terminal" style status panels.
- **Content Management**: Full CRUD operations for Products, Categories, and Blog posts via authenticated API routes.
- **Data Tables**: Powerful filtering and sorting using `@tanstack/react-table`.

## 📁 Project Structure

```text
app/                 # Next.js App Router (Admin, Blog, Browse, API)
components/          # UI Components (shadcn/ui + Custom Admin/Storefront)
hooks/               # Custom React Hooks (Theme, Mobile, Saved Items)
lib/                 # Core Utilities (Auth, Prisma, API Middleware)
prisma/              # Database Schema & Migrations
types/               # Global TypeScript Definitions
public/              # Static Assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL instance

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a `.env` file (see `prisma.config.ts` for reference):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/anastasya"
   JWT_SECRET="your_secret_key"
   ```
4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## 🎨 Theme & Design System
The project uses a centralized theme defined in [app/globals.css](app/globals.css):
- **Primary Color**: `#7c9082` (Sage Green)
- **Typography**: 
  - `font-mono`: Data, technical labels, and headers.
  - `font-serif`: Editorial titles and article content.
  - `font-sans`: Utility UI elements.

## 📄 License
Private project. All rights reserved.

