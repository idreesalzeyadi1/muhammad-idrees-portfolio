import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { ArrowLeft, Clock, Calendar, Tag, Twitter, Linkedin, Link2, MessageCircle, BookOpen } from 'lucide-react'

function renderContent(text = '') {
  const blocks = text.split(/\n\n+/)
  return blocks.map((block, i) => {
    const trimmed = block.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('## '))
      return <h2 key={i} className="text-white text-2xl font-bold mt-10 mb-4 leading-snug">{trimmed.slice(3)}</h2>
    if (trimmed.startsWith('### '))
      return <h3 key={i} className="text-primary-400 text-lg font-semibold mt-7 mb-3">{trimmed.slice(4)}</h3>
    if (trimmed.split('\n').every(l => /^[-•]\s/.test(l.trim())))
      return (
        <ul key={i} className="space-y-2 my-5 pl-2">
          {trimmed.split('\n').map((line, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-300 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
              <span>{line.replace(/^[-•]\s/, '')}</span>
            </li>
          ))}
        </ul>
      )
    if (trimmed.split('\n').every(l => /^\d+\.\s/.test(l.trim())))
      return (
        <ol key={i} className="space-y-2 my-5 pl-2">
          {trimmed.split('\n').map((line, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-300 leading-relaxed">
              <span className="text-primary-400 font-mono text-sm shrink-0 mt-0.5 min-w-[20px]">{j+1}.</span>
              <span>{line.replace(/^\d+\.\s/, '')}</span>
            </li>
          ))}
        </ol>
      )
    if (trimmed.startsWith('```'))
      return (
        <div key={i} className="my-6 rounded-xl overflow-hidden border border-dark-600">
          <div className="bg-dark-700 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <pre className="bg-dark-800 p-5 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed">
            {trimmed.replace(/^```[a-z]*\n?/, '').replace(/```$/, '')}
          </pre>
        </div>
      )
    if (trimmed.startsWith('> '))
      return (
        <blockquote key={i} className="border-l-4 border-primary-500 pl-5 py-2 my-6 bg-primary-500/5 rounded-r-xl">
          <p className="text-gray-300 italic text-lg leading-relaxed">{trimmed.slice(2)}</p>
        </blockquote>
      )
    const renderInline = (str) => str.split(/(\*\*[^*]+\*\*)/).map((p, j) =>
      p.startsWith('**') && p.endsWith('**')
        ? <strong key={j} className="text-white font-semibold">{p.slice(2,-2)}</strong> : p)
    return (
      <p key={i} className="text-gray-300 leading-[1.9] text-[17px] my-5">
        {trimmed.split('\n').map((line, j) => (
          <span key={j}>{renderInline(line)}{j < trimmed.split('\n').length - 1 && <br />}</span>
        ))}
      </p>
    )
  })
}

function ShareBar({ blog }) {
  const url = window.location.href
  const text = encodeURIComponent(`${blog.title} - by Muhammad Idrees`)
  const [copied, setCopied] = useState(false)
  const copyLink = () => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const socials = [
    { label: 'Twitter',  icon: <Twitter size={16} />,       color: '#1DA1F2', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}` },
    { label: 'LinkedIn', icon: <Linkedin size={16} />,      color: '#0A66C2', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'WhatsApp', icon: <MessageCircle size={16} />, color: '#25D366', href: `https://wa.me/?text=${text}%20${encodeURIComponent(url)}` },
  ]
  return (
    <div className="sticky top-28 mt-8">
      <p className="text-gray-600 text-xs font-mono mb-3 text-center">// share</p>
      <div className="flex flex-col gap-2">
        {socials.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
            className="flex items-center gap-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-xl px-3 py-2.5 text-gray-400 hover:text-white transition-all group text-sm">
            <span style={{ color: s.color }} className="group-hover:scale-110 transition-transform">{s.icon}</span>
            {s.label}
          </a>
        ))}
        <button onClick={copyLink}
          className="flex items-center gap-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-xl px-3 py-2.5 text-gray-400 hover:text-white transition-all text-sm">
          <Link2 size={16} className={copied ? 'text-green-400' : 'text-gray-400'} />
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  )
}

function RelatedCard({ blog }) {
  return (
    <Link to={`/blog/${blog.id}`}
      className="group flex gap-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-primary-500/40 rounded-xl p-4 transition-all">
      {blog.coverImage && (
        <img src={blog.coverImage} alt={blog.title} className="w-16 h-16 object-cover rounded-lg shrink-0"
          onError={e => e.target.style.display = 'none'} />
      )}
      <div className="min-w-0">
        <p className="text-white font-semibold text-sm leading-snug group-hover:text-primary-400 transition-colors line-clamp-2">{blog.title}</p>
        <p className="text-gray-500 text-xs mt-1 flex items-center gap-1"><Clock size={10} /> {blog.readTime || 1} min read</p>
      </div>
    </Link>
  )
}

function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true)
      try {
        const snap = await getDoc(doc(db, 'blogs', id))
        if (!snap.exists() || !snap.data().published) { navigate('/blog'); return }
        const data = { id: snap.id, ...snap.data() }
        setBlog(data)
        const relQ = query(collection(db, 'blogs'), where('published', '==', true), where('category', '==', data.category))
        const relSnap = await getDocs(relQ)
        setRelated(relSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter(b => b.id !== id).slice(0, 3))
      } catch (err) { console.error(err); navigate('/blog') }
      setLoading(false)
    }
    fetchBlog()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
    </div>
  )
  if (!blog) return null

  const date = blog.createdAt?.seconds
    ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''
  const tags = blog.tags ? blog.tags.split(',').map(t => t.trim()).filter(Boolean) : []

  return (
    <div className="min-h-screen bg-dark-900">
      {blog.coverImage && (
        <div className="relative h-[55vh] min-h-[320px] overflow-hidden">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/20" />
          <div className="absolute top-6 left-6">
            <Link to="/blog" className="flex items-center gap-2 text-sm text-white/80 hover:text-white bg-dark-900/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full transition-all">
              <ArrowLeft size={15} /> Back to Blog
            </Link>
          </div>
          <div className="absolute top-6 right-6">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary-500 text-white">{blog.category}</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6">
        {!blog.coverImage && (
          <div className="pt-28 mb-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors">
              <ArrowLeft size={15} /> Back to Blog
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_200px] gap-12 pb-24">
          <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className={blog.coverImage ? 'pt-8' : ''}>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-5">
              {date && <span className="flex items-center gap-1.5"><Calendar size={12} /> {date}</span>}
              <span className="flex items-center gap-1.5"><Clock size={12} /> {blog.readTime || 1} min read</span>
              <span className="flex items-center gap-1.5"><BookOpen size={12} /> {blog.category}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white leading-tight mb-5">
              {blog.title}
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed mb-8 border-l-4 border-primary-500/40 pl-4">
              {blog.subtitle}
            </p>

            <div className="flex items-center gap-3 bg-dark-800 border border-dark-700 rounded-2xl p-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold shrink-0">
                MI
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Muhammad Idrees</p>
                <p className="text-gray-500 text-xs">CS Teacher & Web Developer · Peshawar</p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-primary-500/40 via-dark-700 to-transparent mb-10" />

            <div>{renderContent(blog.content)}</div>

            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-dark-700">
                <p className="text-gray-500 text-xs font-mono mb-3">// tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(t => (
                    <span key={t} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-dark-800 border border-dark-700 text-gray-400 rounded-full hover:border-primary-500/40 hover:text-primary-400 transition-colors cursor-default">
                      <Tag size={11} /> {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile share */}
            <div className="mt-10 lg:hidden">
              <p className="text-gray-500 text-xs font-mono mb-3">// share this post</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Twitter',  icon: <Twitter size={14} />,       color: '#1DA1F2', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}` },
                  { label: 'LinkedIn', icon: <Linkedin size={14} />,      color: '#0A66C2', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
                  { label: 'WhatsApp', icon: <MessageCircle size={14} />, color: '#25D366', href: `https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}` },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 bg-dark-800 border border-dark-700 hover:border-current rounded-xl px-4 py-2 text-sm text-gray-400 hover:text-white transition-all">
                    <span style={{ color: s.color }}>{s.icon}</span> {s.label}
                  </a>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-14">
                <p className="text-gray-500 text-xs font-mono mb-4">// related posts</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {related.map(b => <RelatedCard key={b.id} blog={b} />)}
                </div>
              </div>
            )}

            <div className="mt-14">
              <Link to="/blog"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 bg-dark-800 border border-dark-700 hover:border-primary-500/40 px-6 py-3 rounded-2xl transition-all text-sm font-medium">
                <ArrowLeft size={16} /> Back
              </Link>
            </div>
          </motion.article>

          <div className="hidden lg:block">
            <div className={blog.coverImage ? 'pt-8' : ''}>
              <ShareBar blog={blog} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail