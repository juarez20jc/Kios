-- supabase/seed.sql
-- Categorías por defecto (se insertan al crear usuario via trigger o manualmente)

-- Gasto (expense)
insert into public.categories (user_id, name, icon, color, type, is_default, sort_order) values
  -- Alimentación
  (null, 'Supermercado', 'shopping-cart', '#ef4444', 'expense', true, 10),
  (null, 'Restaurantes', 'utensils-crossed', '#f97316', 'expense', true, 20),
  (null, 'Café/Snacks', 'coffee', '#f59e0b', 'expense', true, 30),

  -- Transporte
  (null, 'Transporte público', 'bus', '#3b82f6', 'expense', true, 40),
  (null, 'Combustible', 'fuel', '#06b6d4', 'expense', true, 50),
  (null, 'Taxi/Rideshare', 'car', '#8b5cf6', 'expense', true, 60),

  -- Vivienda
  (null, 'Alquiler/Hipoteca', 'home', '#ec4899', 'expense', true, 70),
  (null, 'Servicios (luz, agua, gas)', 'zap', '#f43f5e', 'expense', true, 80),
  (null, 'Internet/Teléfono', 'wifi', '#a855f7', 'expense', true, 90),

  -- Salud
  (null, 'Farmacia', 'pill', '#10b981', 'expense', true, 100),
  (null, 'Médico/Dentista', 'stethoscope', '#059669', 'expense', true, 110),
  (null, 'Seguro médico', 'shield', '#0d9488', 'expense', true, 120),

  -- Ocio
  (null, 'Suscripciones', 'repeat', '#6366f1', 'expense', true, 130),
  (null, 'Entretenimiento', 'gamepad-2', '#4f46e5', 'expense', true, 140),
  (null, 'Deportes/Gym', 'dumbbell', '#4338ca', 'expense', true, 150),

  -- Otros gastos
  (null, 'Compras', 'shopping-bag', '#e11d48', 'expense', true, 160),
  (null, 'Regalos', 'gift', '#f43f5e', 'expense', true, 170),
  (null, 'Educación', 'graduation-cap', '#be185d', 'expense', true, 180),
  (null, 'Otros gastos', 'more-horizontal', '#64748b', 'expense', true, 190),

-- Ingresos (income)
  (null, 'Salario', 'briefcase', '#22c55e', 'income', true, 10),
  (null, 'Freelance/Extras', 'laptop', '#16a34a', 'income', true, 20),
  (null, 'Inversiones', 'trending-up', '#15803d', 'income', true, 30),
  (null, 'Regalos recibidos', 'gift', '#166534', 'income', true, 40),
  (null, 'Otros ingresos', 'plus-circle', '#65a30d', 'income', true, 50),

-- Transferencias
  (null, 'Transferencia entre cuentas', 'arrow-left-right', '#f59e0b', 'transfer', true, 10),
  (null, 'Pago tarjeta', 'credit-card', '#d97706', 'transfer', true, 20)
on conflict do nothing;