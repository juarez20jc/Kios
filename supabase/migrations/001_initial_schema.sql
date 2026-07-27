-- supabase/migrations/001_initial_schema.sql
-- Esquema inicial para Kios - Personal Finance Tracker

-- Extensiones
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Perfiles de usuario (extiende auth.users)
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  currency text not null default 'EUR',
  locale text not null default 'es',
  theme text not null default 'system' check (theme in ('light', 'dark', 'system')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Cuentas (efectivo, tarjetas, banco, inversiones, crypto)
create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null,
  type text not null check (type in ('cash', 'card', 'bank', 'investment', 'crypto', 'other')),
  currency text not null default 'EUR',
  balance numeric(18,2) not null default 0,
  icon text,           -- nombre icono Lucide
  color text,          -- hex color
  is_archived boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Categorías (jerárquicas: parent_id para subcategorías)
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  parent_id uuid references public.categories on delete set null,
  name text not null,
  icon text not null,        -- nombre icono Lucide
  color text not null,       -- hex color
  type text not null check (type in ('expense', 'income', 'transfer')),
  is_default boolean not null default false,
  is_archived boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Transacciones
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  account_id uuid not null references public.accounts on delete restrict,
  category_id uuid references public.categories on delete set null,
  amount numeric(18,2) not null,      -- siempre positivo
  type text not null check (type in ('expense', 'income', 'transfer')),
  description text,
  date timestamptz not null default now(),

  -- Transferencias
  destination_account_id uuid references public.accounts on delete set null,
  destination_amount numeric(18,2),   -- para conversión de moneda

  -- Recurrentes
  is_recurring boolean not null default false,
  recurrence_rule text,               -- RRULE RFC 5545
  recurrence_end_date timestamptz,
  parent_transaction_id uuid references public.transactions on delete set null,

  -- Metadatos
  notes text,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Presupuestos (por categoría y período)
create table public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  category_id uuid not null references public.categories on delete cascade,
  amount numeric(18,2) not null,
  period text not null check (period in ('weekly', 'monthly', 'quarterly', 'yearly')),
  start_date date not null,
  end_date date,
  alert_threshold numeric(3,2) not null default 0.8, -- 80%
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, category_id, period, start_date)
);

-- Índices para consultas frecuentes
create index idx_transactions_user_date on public.transactions (user_id, date desc);
create index idx_transactions_user_account on public.transactions (user_id, account_id);
create index idx_transactions_user_category on public.transactions (user_id, category_id);
create index idx_transactions_recurring on public.transactions (user_id, is_recurring) where is_recurring = true;
create index idx_budgets_user_period on public.budgets (user_id, period, start_date);
create index idx_accounts_user on public.accounts (user_id, is_archived);
create index idx_categories_user_type on public.categories (user_id, type, is_archived);

-- RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.accounts enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;

-- Políticas: usuarios solo ven/modifican sus datos
create policy "Users own their profile" on public.profiles
  for all using (auth.uid() = id);

create policy "Users own their accounts" on public.accounts
  for all using (auth.uid() = user_id);

create policy "Users own their categories" on public.categories
  for all using (auth.uid() = user_id);

create policy "Users own their transactions" on public.transactions
  for all using (auth.uid() = user_id);

create policy "Users own their budgets" on public.budgets
  for all using (auth.uid() = user_id);

-- Función para updated_at automático
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Triggers updated_at
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger accounts_updated_at before update on public.accounts
  for each row execute function public.handle_updated_at();

create trigger transactions_updated_at before update on public.transactions
  for each row execute function public.handle_updated_at();

create trigger budgets_updated_at before update on public.budgets
  for each row execute function public.handle_updated_at();