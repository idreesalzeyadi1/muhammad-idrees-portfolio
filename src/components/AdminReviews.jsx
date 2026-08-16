import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { db, auth } from '../firebase'
import {
  collection, getDocs, doc, updateDoc, deleteDoc, addDoc,
  query, where, serverTimestamp
} from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import {
  Star, Check, X, LogOut, Clock, CheckCircle, Eye,
  PenLine, Trash2, Globe, EyeOff, Plus, ChevronDown, ChevronUp,
  BookOpen, Image, Tag, AlignLeft, FileText
} from 'lucide-react'

const CATEGORIES = ['Web Dev', 'React', 'Firebase', 'Tips & Tricks', 'Career', 'Personal']

function calcReadTime(text = '') {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

const emptyBlog = {
  title: '', subtitle: '', content: '',
  coverImage: '', category: 'Web Dev',
  tags: '', published: false,
}

function BlogForm({ initial = emptyBlog, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-5"
    >
      <h3 className="text-white font-bold text-lg flex items-center gap-2">
        <PenLine size={18} className="text-primary-400" />
        {initial.id ? 'Blog Edit Karo' : 'Naya Blog Likho'}
      </h3>

      <div>
        <label className="text-gray-400 text-sm mb-1.5 flex items-center gap-1.5">
          <Image size={14} /> Cover Image URL
        </label>
        <input
          value={form.coverImage}
          onChange={e => set('coverImage', e.target.value)}
          placeholder="https://... (imgbb, cloudinary, ya koi bhi image link)"
          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors text-sm"
        />
        {form.coverImage && (
          <img src={form.coverImage} alt="preview"
            className="mt-2 w-full h-40 object-cover rounded-xl opacity-80"
            onError={e => e.target.style.display = 'none'} />
        )}
      </div>

      <div>
        <label className="text-gray-400 text-sm mb-1.5 flex items-center gap-1.5">
          <FileText size={14} /> Title *
        </label>
        <input value={form.title} onChange={e => set('title', e.target.value)}
          placeholder="Blog ka title likho..."
          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors" />
      </div>

      <div>
        <label className="text-gray-400 text-sm mb-1.5 flex items-center gap-1.5">
          <AlignLeft size={14} /> Subtitle / Short Description *
        </label>
        <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)}
          placeholder="Ek line mein kya hai is blog mein..."
          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm mb-1.5 block">Category</label>
          <select value={form.category} onChange={e => set('category', e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-1.5 flex items-center gap-1.5">
            <Tag size={14} /> Tags (comma se alag karo)
          </label>
          <input value={form.tags} onChange={e => set('tags', e.target.value)}
            placeholder="React, Firebase, Tips"
            className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors" />
        </div>
      </div>

      <div>
        <label className="text-gray-400 text-sm mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><BookOpen size={14} /> Content *</span>
          <span className="text-gray-600 text-xs">~{calcReadTime(form.content)} min read</span>
        </label>
        <textarea value={form.content} onChange={e => set('content', e.target.value)}
          placeholder={"Blog ka pura content yahan likho...\n\nDouble enter = naya paragraph\n## Heading = section\n> Quote\n- Bullet"}
          rows={14}
          className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors text-sm leading-relaxed resize-y" />
        <p className="text-gray-600 text-xs mt-1">
          Tip: Double enter = naya paragraph · ## Heading = section · - bullet · &gt; quote · **bold**
        </p>
      </div>

      <div className="flex items-center justify-between bg-dark-700 rounded-xl px-4 py-3 border border-dark-600">
        <span className="text-gray-300 text-sm">Abhi publish karo?</span>
        <button onClick={() => set('published', !form.published)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${form.published ? 'bg-primary-500' : 'bg-dark-600'}`}>
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${form.published ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      <div className="flex gap-3 pt-1">
        <motion.button onClick={() => onSave(form)}
          disabled={saving || !form.title || !form.content}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
          {saving ? 'Saving...' : (initial.id ? 'Update Karo' : 'Blog Save Karo')}
        </motion.button>
        <button onClick={onCancel}
          className="px-5 py-2 bg-dark-700 border border-dark-600 text-gray-400 rounded-xl hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </motion.div>
  )
}

function BlogRow({ blog, onEdit, onDelete, onTogglePublish }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }} className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        {blog.coverImage ? (
          <img src={blog.coverImage} alt={blog.title}
            className="w-16 h-16 object-cover rounded-xl shrink-0"
            onError={e => e.target.style.display = 'none'} />
        ) : (
          <div className="w-16 h-16 bg-dark-700 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen size={20} className="text-gray-600" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${blog.published ? 'bg-green-500/15 text-green-400 border border-green-500/20' : 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20'}`}>
              {blog.published ? 'Published' : 'Draft'}
            </span>
            <span className="text-xs text-gray-600 bg-dark-700 px-2 py-0.5 rounded-full">{blog.category}</span>
          </div>
          <p className="text-white font-semibold text-sm truncate">{blog.title}</p>
          <p className="text-gray-500 text-xs truncate mt-0.5">{blog.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <motion.button onClick={() => onTogglePublish(blog)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${blog.published ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400' : 'bg-dark-700 border-dark-600 text-gray-500 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400'}`}>
            {blog.published ? <Globe size={15} /> : <EyeOff size={15} />}
          </motion.button>
          <motion.button onClick={() => onEdit(blog)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-9 h-9 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-xl flex items-center justify-center transition-all">
            <PenLine size={15} />
          </motion.button>
          <motion.button onClick={() => onDelete(blog.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-9 h-9 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl flex items-center justify-center transition-all">
            <Trash2 size={15} />
          </motion.button>
          <button onClick={() => setExpanded(!expanded)}
            className="w-9 h-9 bg-dark-700 border border-dark-600 text-gray-500 hover:text-white rounded-xl flex items-center justify-center transition-all">
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="border-t border-dark-700 px-5 py-4">
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-5 whitespace-pre-line">{blog.content}</p>
            {blog.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {blog.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 bg-dark-700 text-gray-500 rounded-full">#{t}</span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function BlogManager() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [filterPub, setFilterPub] = useState('all')

  const fetchBlogs = async () => {
    setLoading(true)
    const snap = await getDocs(collection(db, 'blogs'))
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    setBlogs(data)
    setLoading(false)
  }

  useEffect(() => { fetchBlogs() }, [])

  const handleSave = async (form) => {
    if (!form.title.trim() || !form.content.trim()) return
    setSaving(true)
    const payload = {
      title: form.title.trim(), subtitle: form.subtitle.trim(),
      content: form.content.trim(), coverImage: form.coverImage.trim(),
      category: form.category, tags: form.tags.trim(),
      published: form.published, readTime: calcReadTime(form.content),
      updatedAt: serverTimestamp(),
    }
    try {
      if (form.id) {
        await updateDoc(doc(db, 'blogs', form.id), payload)
      } else {
        await addDoc(collection(db, 'blogs'), { ...payload, createdAt: serverTimestamp() })
      }
      await fetchBlogs()
      setShowForm(false)
      setEditing(null)
    } catch (err) { console.error(err) }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yeh blog delete karna chahte ho?')) return
    await deleteDoc(doc(db, 'blogs', id))
    setBlogs(b => b.filter(x => x.id !== id))
  }

  const handleTogglePublish = async (blog) => {
    await updateDoc(doc(db, 'blogs', blog.id), { published: !blog.published })
    setBlogs(b => b.map(x => x.id === blog.id ? { ...x, published: !x.published } : x))
  }

  const handleEdit = (blog) => {
    setEditing(blog); setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filtered = filterPub === 'all' ? blogs
    : filterPub === 'published' ? blogs.filter(b => b.published)
    : blogs.filter(b => !b.published)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2">
          {[
            { key: 'all', label: `All (${blogs.length})` },
            { key: 'published', label: `Published (${blogs.filter(b => b.published).length})` },
            { key: 'drafts', label: `Drafts (${blogs.filter(b => !b.published).length})` },
          ].map(f => (
            <button key={f.key} onClick={() => setFilterPub(f.key)}
              className={`px-3 py-1.5 rounded-xl text-sm border transition-all ${filterPub === f.key ? 'bg-primary-500 border-primary-500 text-white' : 'bg-dark-800 border-dark-700 text-gray-400 hover:border-primary-500/50'}`}>
              {f.label}
            </button>
          ))}
        </div>
        {!showForm && (
          <motion.button onClick={() => { setEditing(null); setShowForm(true) }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={16} /> Naya Blog
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <BlogForm initial={editing || emptyBlog} onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditing(null) }} saving={saving} />
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p>Koi blog nahi mila</p>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="mt-4 text-primary-400 text-sm hover:underline">
              Pehla blog likho →
            </button>
          )}
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-3">
            {filtered.map(blog => (
              <BlogRow key={blog.id} blog={blog} onEdit={handleEdit}
                onDelete={handleDelete} onTogglePublish={handleTogglePublish} />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}

function ReviewsManager() {
  const [reviews, setReviews] = useState([])
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(false)

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'reviews'), where('status', '==', filter))
      const snap = await getDocs(q)
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      setReviews(data)
    } catch (err) { console.error('Fetch error:', err) }
    setLoading(false)
  }

  useEffect(() => { fetchReviews() }, [filter])

  const handleApprove = async (id) => {
    await updateDoc(doc(db, 'reviews', id), { status: 'approved' })
    setReviews(reviews.filter(r => r.id !== id))
  }
  const handleReject = async (id) => {
    await deleteDoc(doc(db, 'reviews', id))
    setReviews(reviews.filter(r => r.id !== id))
  }

  return (
    <div>
      <div className="flex gap-3 mb-6">
        {[
          { key: 'pending', label: 'Pending', icon: <Clock size={16} /> },
          { key: 'approved', label: 'Approved', icon: <CheckCircle size={16} /> },
        ].map((tab) => (
          <button key={tab.key} onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${filter === tab.key ? 'bg-primary-500 border-primary-500 text-white' : 'bg-dark-800 border-dark-700 text-gray-400 hover:border-primary-500/50'}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <Eye size={40} className="mx-auto mb-3 opacity-30" />
          <p>Koi review nahi mila</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {reviews.map((review) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }} className="bg-dark-800 border border-dark-700 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={16} className={s <= review.rating ? 'text-accent-gold fill-accent-gold' : 'text-dark-600'} />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-3 leading-relaxed">"{review.message}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-400 font-bold text-sm">
                        {review.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{review.name}</p>
                        <p className="text-gray-500 text-xs">{review.role}{review.role && review.company ? ' • ' : ''}{review.company}</p>
                      </div>
                    </div>
                  </div>
                  {filter === 'pending' && (
                    <div className="flex gap-2 shrink-0">
                      <motion.button onClick={() => handleApprove(review.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-green-500/10 hover:bg-green-500 border border-green-500/30 hover:border-green-500 rounded-xl flex items-center justify-center text-green-400 hover:text-white transition-all">
                        <Check size={18} />
                      </motion.button>
                      <motion.button onClick={() => handleReject(review.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 rounded-xl flex items-center justify-center text-red-400 hover:text-white transition-all">
                        <X size={18} />
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}

const ADMIN_TABS = [
  { key: 'reviews', label: 'Reviews', icon: <Star size={16} /> },
  { key: 'blogs',   label: 'Blogs',   icon: <BookOpen size={16} /> },
]

function AdminReviews() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('reviews')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return unsub
  }, [])

  const handleLogin = async () => {
    setLoginError('')
    try { await signInWithEmailAndPassword(auth, email, password) }
    catch { setLoginError('Email ya password galat hai') }
  }

  if (!user) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
          <p className="text-gray-500 text-sm">Reviews aur Blogs manage karne ke liye login karo</p>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors" />
          {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
          <motion.button onClick={handleLogin} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full btn-primary">Login</motion.button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          <motion.button onClick={() => signOut(auth)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors bg-dark-800 px-4 py-2 rounded-xl border border-dark-700">
            <LogOut size={16} /> Logout
          </motion.button>
        </div>

        <div className="flex gap-3 mb-8">
          {ADMIN_TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium transition-all ${activeTab === tab.key ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-dark-800 border-dark-700 text-gray-400 hover:border-primary-500/50 hover:text-white'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {activeTab === 'reviews' ? <ReviewsManager /> : <BlogManager />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AdminReviews