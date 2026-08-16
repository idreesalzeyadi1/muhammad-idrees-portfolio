import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Clock, Search, Tag, ArrowRight, Twitter, Linkedin, Link2, MessageCircle } from 'lucide-react'

const CATEGORIES = ['All', 'Web Dev', 'React', 'Firebase', 'Tips & Tricks', 'Career', 'Personal']

function ShareButtons({ blog, small = false }) {
  const url = `${window.location.origin}/blog/${blog.id}`
  const text = encodeURIComponent(`${blog.title} - by Muhammad Idrees`)
  const share = {
    twitter:  `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${text}%20${encodeURIComponent(url)}`,
  }
  const copyLink = () => {
    navigator.clipboard.writeText(url)
    const el = document.createElement('div')
    el.textContent = 'Link copy ho gaya!'
    el.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#6366f1;color:white;padding:8px 20px;border-radius:999px;font-size:13px;z-index:9999;animation:fadeup .3s ease`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 2000)
  }
  const sz = small ? 13 : 15
  const btn = small ? 'w-7 h-7 rounded-lg' : 'w-9 h-9 rounded-xl'
  return (
    <div className="flex items-center gap-1.5">
      <a href={share.twitter} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
        className={`${btn} bg-dark-700 hover:bg-[#1DA1F2]/20 border border-dark-600 hover:border-[#1DA1F2]/40 text-gray-500 hover:text-[#1DA1F2] flex items-center justify-center transition-all`}>
        <Twitter size={sz} />
      </a>
      <a href={share.linkedin} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
        className={`${btn} bg-dark-700 hover:bg-[#0A66C2]/20 border border-dark-600 hover:border-[#0A66C2]/40 text-gray-500 hover:text-[#0A66C2] flex items-center justify-center transition-all`}>
        <Linkedin size={sz} />
      </a>
      <a href={share.whatsapp} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
        className={`${btn} bg-dark-700 hover:bg-[#25D366]/20 border border-dark-600 hover:border-[#25D366]/40 text-gray-500 hover:text-[#25D366] flex items-center justify-center transition-all`}>
        <MessageCircle size={sz} />
      </a>
      <button onClick={e => { e.stopPropagation(); e.preventDefault(); copyLink() }}
        className={`${btn} bg-dark-700 hover:bg-primary-500/20 border border-dark-600 hover:border-primary-500/40 text-gray-500 hover:text-primary-400 flex items-center justify-center transition-all`}>
        <Link2 size={sz} />
      </button>
    </div>
  )
}

function BlogCard({ blog, index }) {
  const date = blog.createdAt?.seconds
    ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''
  const tags = blog.tags ? blog.tags.split(',').map(t => t.trim()).filter(Boolean) : []

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }} className="group">
      <Link to={`/blog/${blog.id}`} className="block">
        <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1">
          <div className="relative aspect-video overflow-hidden bg-dark-700">
            {blog.coverImage ? (
              <>
                <img src={blog.coverImage} alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => e.target.style.display = 'none'} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-dark-700">
                <span className="text-5xl opacity-20">✍️</span>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-500/90 text-white backdrop-blur-sm">
                {blog.category}
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
              <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime || 1} min read</span>
              {date && <span>• {date}</span>}
            </div>
            <h2 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{blog.subtitle}</p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.slice(0, 3).map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 bg-dark-700 text-gray-500 rounded-full border border-dark-600 flex items-center gap-1">
                    <Tag size={9} /> {t}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between pt-3 border-t border-dark-700">
              <ShareButtons blog={blog} small />
              <span className="text-primary-400 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read more <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const q = query(collection(db, 'blogs'), where('published', '==', true))
        const snap = await getDocs(q)
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        setBlogs(data)
      } catch (err) { console.error(err) }
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  const filtered = blogs.filter(b => {
    const matchCat = category === 'All' || b.category === category
    const q = search.toLowerCase()
    const matchSearch = !q || b.title?.toLowerCase().includes(q) || b.subtitle?.toLowerCase().includes(q) || b.tags?.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/8 blur-3xl rounded-full pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative max-w-2xl mx-auto">
          <span className="inline-block text-xs font-mono text-primary-400 bg-primary-500/10 border border-primary-500/20 px-3 py-1 rounded-full mb-4">
            // my thoughts & learnings
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Blog <span className="text-primary-400">&</span> Articles
          </h1>
          <p className="text-gray-400 text-lg">Web dev, Firebase, React aur career ke baare mein jo sikha, woh yahan share karta hoon.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="relative max-w-md mx-auto mt-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Blog search karo..."
            className="w-full bg-dark-800 border border-dark-700 focus:border-primary-500 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors" />
        </motion.div>
      </div>

      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all ${category === cat ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-dark-800 border-dark-700 text-gray-400 hover:border-primary-500/50 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 text-gray-600">
            <span className="text-5xl block mb-4">✍️</span>
            <p className="text-lg">{search || category !== 'All' ? 'Koi blog match nahi kiya — filter clear karo' : 'Abhi koi blog publish nahi hua'}</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
            </AnimatePresence>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeup { from{opacity:0;transform:translate(-50%,12px)} to{opacity:1;transform:translate(-50%,0)} }`}</style>
    </div>
  )
}

export default Blog