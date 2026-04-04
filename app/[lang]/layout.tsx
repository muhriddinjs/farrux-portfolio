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
  title: "Farrux Asrorqulov — Data Analyst Portfolio",
  description:
    "Senior Data Analyst specializing in customer segmentation, cost optimization, and statistical analysis. Turning raw data into actionable business decisions.",
  keywords: [
    "Data Analyst",
    "Portfolio",
    "Python",
    "SQL",
    "Machine Learning",
    "Tableau",
    "Power BI",
  ],
  openGraph: {
    title: "Farrux Asrorqulov — Data Analyst Portfolio",
    description:
      "Transforming complex data into actionable business decisions.",
    type: "website",
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
