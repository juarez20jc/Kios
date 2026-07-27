import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Salida estática: genera solo HTML/CSS/JS en ./dist (sin servidor Node)
  // Ideal para GitHub Pages — gratis, rápido, seguro
  output: 'static',

  // URL pública de tu sitio
  site: 'https://juarez20jc.github.io/Kios',

  // Integraciones oficiales de Astro
  integrations: [
    react(),      // Habilita componentes React (.tsx) como "islands" interactivas
    tailwind(),   // Procesa Tailwind CSS en .astro y .tsx
  ],

  // Opciones avanzadas
  typescript: {
    strict: true,
  },
});