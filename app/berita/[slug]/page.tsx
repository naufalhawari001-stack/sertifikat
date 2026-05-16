import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '~/lib/sanity.client';
import { PortableText } from '@portabletext/react';
import { FaSearch, FaFolder, FaCalendarAlt } from 'react-icons/fa';
import type { Metadata, ResolvingMetadata } from 'next'; // <--- IMPORT TYPE METADATA

export const revalidate = 10;

// --- FUNGSI GENERATE METADATA (UNTUK PREVIEW WA & SEO) ---
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Ambil data postingan berdasarkan slug
  const post = await getPostBySlug(params.slug);

  // Jika post tidak ada, kembalikan metadata default
  if (!post) {
    return {
      title: 'Berita Tidak Ditemukan | Solusi Sertifikat',
    }
  }

  // Gunakan URL absolut untuk gambar. Jika postingan tidak ada gambar, pakai og-image.jpg default
  const imageUrl = post.image ? post.image : 'https://solusi-sertifikat.com/og-image.jpg';
  const postUrl = `https://solusi-sertifikat.com/berita/${params.slug}`;

  return {
    title: `${post.title} | Solusi Sertifikasi Sulteng`,
    description: post.excerpt || `Membaca berita ${post.title} selengkapnya di Solusi Sertifikat.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Baca selengkapnya tentang ${post.title}`,
      url: postUrl,
      siteName: "Solusi Sertifikat",
      images: [
        {
          url: imageUrl, // Menampilkan gambar khusus untuk berita ini
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "id_ID",
      type: "article", // Gunakan tipe 'article' untuk postingan blog/berita
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Baca selengkapnya tentang ${post.title}`,
      images: [imageUrl],
    },
  }
}

// --- KOMPONEN UTAMA HALAMAN ---
export default async function BeritaDetail({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  // Fetch recent posts for the sidebar
  const recentPosts = await getPosts(); 

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* 1. TITLE SECTION (DARK HEADER) */}
      <div className="bg-[#1e2338] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{post.title}</h1>
            
            {/* Breadcrumb */}
            <div className="text-xs md:text-sm text-gray-400 flex items-center space-x-2">
                <span className="font-bold">Anda di sini:</span>
                <Link href="/" className="hover:text-[#4ade80] transition">Beranda</Link>
                <span>/</span>
                <Link href="/berita" className="hover:text-[#4ade80] transition">Berita</Link>
                <span>/</span>
                <span className="text-gray-300 line-clamp-1">{post.title}</span>
            </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (Grid with Sidebar) */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: ARTICLE CONTENT */}
        <div className="lg:col-span-2">
            {/* Featured Image */}
            {post.image && (
                <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden mb-8 border border-gray-100 shadow-sm">
                    <Image 
                        src={post.image} 
                        alt={post.title || 'Berita'} 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Post Meta (Date & Category) */}
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-1">
                    <FaCalendarAlt className="text-[#4ade80]"/>
                    <span>{post.date ? new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <FaFolder className="text-[#4ade80]"/>
                    <span>{post.category || 'Uncategorized'}</span>
                </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg prose-headings:font-bold prose-headings:text-[#1e2338] prose-p:text-gray-600 prose-li:text-gray-600 max-w-none">
                {post.body ? (
                    <PortableText value={post.body} />
                ) : (
                    <p className="text-gray-400 italic">Belum ada konten teks untuk berita ini.</p>
                )}
            </div>

            {/* Share Buttons (Dummy) */}
            <div className="mt-10 pt-6 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-700 mr-4">Share:</span>
                <div className="inline-flex space-x-2">
                    <button className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center text-xs hover:opacity-80">FB</button>
                    <button className="bg-sky-500 text-white w-8 h-8 rounded flex items-center justify-center text-xs hover:opacity-80">TW</button>
                    <button className="bg-green-500 text-white w-8 h-8 rounded flex items-center justify-center text-xs hover:opacity-80">WA</button>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="space-y-10">
            
            {/* Search Widget */}
            <div>
                <div className="flex">
                    <input type="text" placeholder="Search..." className="w-full border border-gray-300 rounded-l px-4 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    <button className="bg-gray-100 border border-l-0 border-gray-300 px-3 rounded-r hover:bg-gray-200"><FaSearch className="text-gray-500 text-sm"/></button>
                </div>
            </div>

            {/* Recent Posts Widget */}
            <div>
                <h3 className="text-lg font-bold text-[#1e2338] mb-4 border-b-2 border-gray-100 pb-2">Recent Posts</h3>
                <ul className="space-y-3">
                    {recentPosts && recentPosts.slice(0, 5).map((recent: any, idx: number) => (
                        <li key={idx}>
                            <Link href={`/berita/${recent.slug}`} className="text-sm text-gray-600 hover:text-[#4ade80] transition block leading-snug">
                                • {recent.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Categories Widget (Dummy Data for now) */}
            <div>
                <h3 className="text-lg font-bold text-[#1e2338] mb-4 border-b-2 border-gray-100 pb-2">Categories</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link href="#" className="hover:text-[#4ade80] flex items-center"><FaFolder className="mr-2 text-gray-300"/> Sertifikasi</Link></li>
                    <li><Link href="#" className="hover:text-[#4ade80] flex items-center"><FaFolder className="mr-2 text-gray-300"/> Konstruksi</Link></li>
                    <li><Link href="#" className="hover:text-[#4ade80] flex items-center"><FaFolder className="mr-2 text-gray-300"/> Pendirian Badan Usaha</Link></li>
                    <li><Link href="#" className="hover:text-[#4ade80] flex items-center"><FaFolder className="mr-2 text-gray-300"/> Perizinan ESDM</Link></li>
                </ul>
            </div>

        </div>

      </div>
    </main>
  );
}