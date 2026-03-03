import { Home } from "lucide-react"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    // --- TAMBAHAN UNTUK GAMBAR BANNER HERO ---
    defineField({
      name: "heroImage",
      title: "Gambar Banner Utama (Hero)",
      type: "image",
      description: "Upload gambar banner promo Anda di sini. Resolusi rekomendasi: 1920x800 px.",
      options: {
        hotspot: true, // Mengaktifkan fitur fokus/crop gambar dari dashboard
      },
    }),
  ],
})