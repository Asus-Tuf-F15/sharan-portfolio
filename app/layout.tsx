import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sharan Rai | Artificial Intelligence & Machine Learning Engineer',
  description:
    'Interactive 3D digital world portfolio of Sharan Rai, AI & ML Engineer. Featuring real-time seasonal & diurnal environmental transformations, computer vision pipelines, neural edge models, and robotics research.',
  keywords: [
    'Sharan Rai',
    'AI Engineer',
    'Machine Learning',
    'Computer Vision',
    'Robotics',
    'PyTorch',
    'TensorRT',
    'YOLOv11',
    'Edge AI',
    'Portfolio',
  ],
  authors: [{ name: 'Sharan Rai' }],
  creator: 'Sharan Rai',
  openGraph: {
    title: 'Sharan Rai | AI & ML Engineer Portfolio',
    description:
      'Explore projects, research papers, and interactive models in a dynamic living 3D environment.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharan Rai | AI & ML Engineer Portfolio',
    description:
      'Explore projects, research papers, and interactive models in a dynamic living 3D environment.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-emerald-500 selection:text-white bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
