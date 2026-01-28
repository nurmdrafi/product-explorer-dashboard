# JustGo Product Explorer Dashboard

A modern React application for browsing and exploring products using the DummyJSON API. Built with TypeScript, Vite, and industry-standard state management libraries.
[Live URL](https://magical-beignet-8b3b23.netlify.app/)


## Features

- **Product Listing**: Infinite scroll with 20 items per load
- **Product Details**: Comprehensive product information view
- **Categories**: Browse and filter products by category
- **Search**: Real-time search with debouncing and URL persistence
- **Multi-Currency**: Support for USD, GBP, and EUR with global context
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Loading States**: Skeleton components throughout the application
- **Error Handling**: Error boundaries with fallback UI

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 + TypeScript | Frontend framework with type safety |
| Vite | Build tool and development server |
| React Router v7 | Client-side routing |
| React Query | Server state management and caching |
| Zustand | Client state management (filters, UI) |
| Tailwind CSS | Utility-first styling |
| DummyJSON API | Public product data source |

## Quick Start

### Prerequisites
- Node.js 20+ and npm 10+

### Installation

```bash
cd product-explorer-dashboard
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - TypeScript type checking

## Routes

| Route | Description |
|-------|-------------|
| `/products` | Main product listing with infinite scroll, filtering, and sorting |
| `/products/{id}` | Individual product detail page |
| `/products/categories` | Browse and select categories (navigates to `/products` with filter) |
| `/products/search?q=` | Search products by title with URL persistence |
| `/settings` | Currency configuration (USD/GBP/EUR) |

## Architecture

The application uses a **feature-based architecture** with clear separation of concerns:

```
src/
├── app/                    # App configuration and routing
├── features/               # Self-contained feature modules
│   ├── categories/         # Category listing
│   ├── product-details/    # Product details page
│   ├── products/           # Product listing with filters
│   ├── search/             # Search functionality
│   └── settings/           # Settings (currency)
├── components/             # Shared/reusable UI components
│   └── common/            # Layouts, errors, skeleton, table, etc.
├── pages/                  # Route components (composition only)
├── store/                  # Zustand stores (UI state)
├── contexts/               # React contexts (global config)
├── hooks/                  # Custom hooks
├── config/                 # Configuration files
├── types/                  # Global type definitions
├── utils/                  # Utility functions
└── styles/                 # Global styles
```

**State Management Strategy:**
- **Server Data** → React Query (API, caching, synchronization)
- **UI State** → Zustand (filters, search, user interactions)
- **Global Config** → React Context (currency settings)

---

## Submission Answers

### 1. Trade-offs Made Due to Time Constraints

| Area | Trade-off | Rationale |
|------|-----------|-----------|
| **Category Filter** | API does not support price sorting | Prioritized data fetching and did not sort manually |
| **Currency Integration** | Context and selector component exist, prices not yet converted | Core display working; conversion logic straightforward to add |
| **Tailwind CSS** | Utility classes inline, no reusable component classes | Could extract common patterns with `@apply` or CSS modules for better maintainability |
| **Testing** | No test suite implemented | Focused on feature completeness and architecture over test coverage |
| **Skeleton Components** | Basic implementation | Functional but could be more polished with animations |
| **Error Boundaries** | Basic fallback components | Covers critical paths; could be more granular |

**Primary Focus:** Established solid architecture, type safety, and core functionality. UI polish and advanced features can be iterated upon.

### 2. Scaling Considerations

If this application needed to scale (more data, more features), here's what I would refactor first:

1. **Virtual Scrolling** for infinite scroll - Current implementation loads all items into DOM. For thousands of products, windowed rendering would be necessary.

2. **Real-time Currency API** - Exchange rates are currently hardcoded. A production app would integrate with a currency API and cache rates appropriately.

3. **Comprehensive Testing Suite** - Unit tests (Jest/Vitest), integration tests (API), and E2E tests (Cypress) would be essential before scaling.


### 3. AI Tool Usage

Yes, AI tools (Claude Code) were used during development:

| Phase | AI Usage | Verification |
|-------|----------|--------------|
| **Code Quality** | Leveraged AI Agent Skills | Evaluated against React best practices, proper type definitions, accessibility standards, and assignment requirements
| **Type Definitions** | TypeScript types for API responses | Verified against DummyJSON API documentation |
| **Component Design** | Table, Skeleton, Layout components | Manual testing in browser, cross-referenced with requirements |
| **Troubleshooting** | Debugging build/type errors | Understood root cause before applying fixes |

**Verification Approach:**
- All AI-generated code was reviewed for understanding
- Manual testing of all implemented features
- Cross-referenced with assignment requirements checklist
- Committed incrementally with clear messages

---
