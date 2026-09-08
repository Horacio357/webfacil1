import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WebLibre — Plataforma SaaS de Landing Pages Anti-Errores',
  description: 'Crea tu sitio web o landing page profesional en minutos con simplicidad extrema y personalización visual guiada.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased selection:bg-emerald-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
