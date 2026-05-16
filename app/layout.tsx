import { Inter, Poppins } from "next/font/google"
import { GoogleAnalytics } from '@next/third-parties/google' // <--- IMPORT GA

import "~/styles/globals.css"
import { siteConfig } from "~/config/site"
import { cn } from "lib/utils"
import { TailwindIndicator } from "~/components/tailwind-indicator"

// --- IMPORT WRAPPER ---
import LayoutWrapper from "~/components/LayoutWrapper"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

// Metadata Website Global & Open Graph (KTP Digital untuk WhatsApp/Sosmed)
export const metadata = {
  title: {
    default: "Solusi Sertifikat | Solusi Sertifikasi Sulteng",
    template: `%s | Solusi Sertifikasi Sulteng`,
  },
  // Pastikan metadataBase menggunakan domain lengkap
  metadataBase: new URL("https://solusi-sertifikat.com"),
  description: "Jasa pembuatan legalitas perusahaan terpercaya dan sertifikasi di Sulawesi Tengah.",
  keywords: ["Next.js", "React", "Legalitas", "Workshop", "Sertifikasi", "Sulteng"],
  authors: [
    {
      name: "Solusi Sertifikasi Sulteng",
      url: "https://solusi-sertifikat.com",
    },
  ],
  creator: "Solusi Sertifikasi Sulteng",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  // --- OPEN GRAPH: INI YANG DIBACA OLEH WHATSAPP & FACEBOOK ---
  openGraph: {
    title: "Solusi Sertifikat | Solusi Sertifikasi Sulteng",
    description: "Jasa pembuatan legalitas perusahaan terpercaya dan sertifikasi di Sulawesi Tengah.",
    url: "https://solusi-sertifikat.com",
    siteName: "Solusi Sertifikat",
    images: [
      {
        // WAJIB FULL URL SEPERTI INI, TIDAK BOLEH HANYA "/og-image.jpg"
        url: "https://solusi-sertifikat.com/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Preview Website Solusi Sertifikasi Sulteng",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // --- TWITTER CARD: BACKUP JIKA WHATSAPP GAGAL BACA OPEN GRAPH ---
  twitter: {
    card: "summary_large_image",
    title: "Solusi Sertifikat | Solusi Sertifikasi Sulteng",
    description: "Jasa pembuatan legalitas perusahaan terpercaya dan sertifikasi di Sulawesi Tengah.",
    images: ["https://solusi-sertifikat.com/og-image.jpg"],
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // Menggunakan 'id' untuk SEO Indonesia
    <html lang="id" suppressHydrationWarning> 
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        {/* Wrapper Konten Utama */}
        <LayoutWrapper>
            {children}
        </LayoutWrapper>

        {/* Indikator Tailwind (Dev mode only) */}
        <TailwindIndicator />
      </body>

      {/* --- GOOGLE ANALYTICS (HARDCODED) --- */}
      {/* Kita tulis ID langsung agar pasti jalan saat di-deploy/push */}
      <GoogleAnalytics gaId="G-40LJQMRB2Y" />
    </html>
  )
}