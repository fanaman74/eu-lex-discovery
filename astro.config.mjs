import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import 'dotenv/config';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { host: process.env.HOST ?? '127.0.0.1', port: Number(process.env.PORT ?? 4321) },
  vite: { plugins: [tailwindcss()], ssr: { external: ['pg'] } }
});
