import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { db, auth } from '../firebase'
import {
  collection, getDocs, doc, updateDoc, deleteDoc,
  query, orderBy, where
} from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { Star, Check, X, LogOut, Clock, CheckCircle, Eye } from 'lucide-react'

function AdminReviews() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [reviews, setReviews] = useState([])
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return unsub
  }, [])

  useEffect(() => {
    if (user) fetchReviews()
  }, [user, filter])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      // orderBy hata diya — index issue fix
      const q = query(
        collection(db, 'reviews'),
        where('status', '==', filter)
      )
      const snap = await getDocs(q)
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      // client side sort
      data.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0
        const bTime = b.createdAt?.seconds || 0
        return bTime - aTime
      })
      setReviews(data)
    } catch (err) {
      console.error('Fetch error:', err)
    }
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoginError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setLoginError('Email ya password galat hai')
    }
  }

  const handleApprove = async (id) => {
    await updateDoc(doc(db, 'reviews', id), { status: 'approved' })
    setReviews(reviews.filter(r => r.id !== id))
  }

  const handleReject = async (id) => {
    await deleteDoc(doc(db, 'reviews', id))
    setReviews(reviews.filter(r => r.id !== id))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
            <p className="text-gray-500 text-sm">Reviews manage karne ke liye login karen</p>
          </div>
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors"
            />
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <motion.button
              onClick={handleLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary"
            >
              Login
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Reviews Admin</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          <motion.button
            onClick={() => signOut(auth)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors bg-dark-800 px-4 py-2 rounded-xl border border-dark-700"
          >
            <LogOut size={16} />
            Logout
          </motion.button>
        </div>

        <div className="flex gap-3 mb-6">
          {[
            { key: 'pending', label: 'Pending', icon: <Clock size={16} /> },
            { key: 'approved', label: 'Approved', icon: <CheckCircle size={16} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                filter === tab.key
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : 'bg-dark-800 border-dark-700 text-gray-400 hover:border-primary-500/50'
              }`}
            >
              {tab.icon}
              {tab.label}
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
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-dark-800 border border-dark-700 rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex gap-1 mb-3">
                        {[1,2,3,4,5].map(s => (
                          <Star
                            key={s}
                            size={16}
                            className={s <= review.rating ? 'text-accent-gold fill-accent-gold' : 'text-dark-600'}
                          />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-3 leading-relaxed">"{review.message}"</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-400 font-bold text-sm">
                          {review.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{review.name}</p>
                          <p className="text-gray-500 text-xs">
                            {review.role}{review.role && review.company ? ' • ' : ''}{review.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {filter === 'pending' && (
                      <div className="flex gap-2 shrink-0">
                        <motion.button
                          onClick={() => handleApprove(review.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-green-500/10 hover:bg-green-500 border border-green-500/30 hover:border-green-500 rounded-xl flex items-center justify-center text-green-400 hover:text-white transition-all"
                        >
                          <Check size={18} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleReject(review.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 rounded-xl flex items-center justify-center text-red-400 hover:text-white transition-all"
                        >
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
    </div>
  )
}

export default AdminReviews