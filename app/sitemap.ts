import { type MetadataRoute } from "next"
import { getMainPagesSlugs, getSecondaryPagesSlugs } from "~/lib/sanity.client"

// --- UBAH DI SINI: Kita "Kunci" langsung ke domain asli Anda ---
// Supaya Google Search Console tidak bingung lagi dengan URL Vercel
const baseUrl = "https://www.solusi-sertifikat.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const mainPagesPromise = getMainPagesSlugs().then((pages) =>
    (pages || []).map((page) => ({
      url: `${baseUrl}/${page.main_page.slug}`,
      lastModified: page.main_page._updatedAt,
    }))
  )

  const secondaryPagesPromise = getSecondaryPagesSlugs().then((pages) =>
    (pages || []).reduce<{ url: string; lastModified: string }[]>(
      (result, page) => {
        const secondaryPageSlugs = page.secondary_pages || []
        const secondaryPages = secondaryPageSlugs.map((sec_page) => ({
          url: `${baseUrl}/${page.main_page.slug}/${sec_page.slug}`,
          lastModified: sec_page._updatedAt,
        }))
        return result.concat(secondaryPages)
      },
      []
    )
  )

  const fetchedRoutes = (
    await Promise.all([mainPagesPromise, secondaryPagesPromise])
  ).flat()

  return [...routesMap, ...fetchedRoutes]
}