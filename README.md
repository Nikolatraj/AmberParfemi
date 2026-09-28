# Amber Parfemi

Monorepo containing a decoupled **Next.js** frontend and a **Laravel** JSON API backend.

## Structure

```
.
├── backend/    # Laravel API (PHP 8.5, MySQL, Sanctum auth)
└── frontend/   # Next.js app (TypeScript, Tailwind, App Router)
```

## Prerequisites

- Node.js 24+ and npm
- PHP 8.5+ and Composer
- MySQL 8.0+

## Getting started

### 1. Backend (Laravel API)

```bash
cd backend
cp .env.example .env          # already created on setup
composer install
php artisan key:generate
# ensure the MySQL database exists and .env DB_* values are correct
php artisan migrate
php artisan serve             # http://localhost:8000
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev                   # http://localhost:3000
```

The frontend talks to the API via `NEXT_PUBLIC_API_URL` (see `frontend/.env.local`).

## Auth

The API uses **Laravel Sanctum** for SPA cookie-based authentication. CORS and
`SANCTUM_STATEFUL_DOMAINS` are configured for `localhost:3000`.
