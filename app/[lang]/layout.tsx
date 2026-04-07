import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

// Load Inter font with Latin subset
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Farrux Asrorqulov | Senior Data Analyst Portfolio",
    template: "%s | Farrux Asrorqulov"
  },
  description:
    "Farrux Asrorqulov (Farrukh Asrorqulov) is a Senior Data Analyst specializing in customer segmentation, cost optimization, Python, SQL, Tableau, and Power BI. Discover my full portfolio and projects.",
  keywords: [
    "Farrux Asrorqulov",
    "Farrukh Asrorqulov",
    "Фаррух Асроркулов",
    "Farrux Data Analyst",
    "Data Analyst in Uzbekistan",
    "Tashkent Data Analyst",
    "Senior Data Analyst",
    "Portfolio",
    "Python",
    "SQL",
    "Machine Learning",
    "Tableau",
    "Power BI",
  ],
  authors: [{ name: "Farrux Asrorqulov" }],
  creator: "Farrux Asrorqulov",
  publisher: "Farrux Asrorqulov",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Farrux Asrorqulov | Senior Data Analyst Portfolio",
    description:
      "Explore the portfolio of Farrux Asrorqulov, a Data Analyst transforming complex data into actionable business decisions using Python, SQL, and Machine Learning.",
    siteName: "Farrux Asrorqulov Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farrux Asrorqulov | Data Analyst",
    description: "Senior Data Analyst portfolio by Farrux Asrorqulov.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { ThemeProvider } from "../components/ThemeProvider";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uz" }, { lang: "ru" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <html lang={lang} className={inter.variable} suppressHydrationWarning>
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
