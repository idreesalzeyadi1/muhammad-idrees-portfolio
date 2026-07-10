import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Star, Send, CheckCircle } from 'lucide-react'

function ReviewForm() {
  const [form, setForm] = useState({ name: '', role: '', company: '', message: '', rating: 5, url: '' })
  const [hover, setHover] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.message) return
    setLoading(true)
    try {
      await addDoc(collection(db, 'reviews'), {
        ...form,
        status: 'pending',
        createdAt: serverTimestamp()
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Thank You! 🎉</h2>
          <p className="text-gray-400">Your review has been submitted. It will appear on the portfolio after approval.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-4">
            <Star size={16} className="text-primary-400" />
            <span className="text-primary-400 text-sm">Share Your Experience</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Leave a <span className="text-gradient">Review</span>
          </h1>
          <p className="text-gray-400">Share your experience working with Muhammad Idrees</p>
        </div>

        <div className="bg-dark-800/80 border border-dark-700 rounded-2xl p-6 space-y-5">

          {/* Rating */}
          <div>
            <label className="text-gray-400 text-sm mb-3 block">Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      star <= (hover || form.rating)
                        ? 'text-accent-gold fill-accent-gold'
                        : 'text-dark-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Your Name *</label>
            <input
              type="text"
              placeholder="e.g. Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Role & Company */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Designation</label>
              <input
                type="text"
                placeholder="e.g. Principal / CEO"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Company / School</label>
              <input
                type="text"
                placeholder="e.g. PMS SCHOOL AND COLLEGE"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          {/* URL */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Your Profile / Website URL <span className="text-gray-600">(Optional)</span>
            </label>
            <input
              type="url"
              placeholder="e.g. https://linkedin.com/in/yourname"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <p className="text-gray-600 text-xs mt-1">LinkedIn, Facebook, Instagram, school website, etc.</p>
          </div>

          {/* Message */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Your Review *</label>
            <textarea
              rows={4}
              placeholder="Share your experience working with Idrees..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            onClick={handleSubmit}
            disabled={loading || !form.name || !form.message}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                Submit Review
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default ReviewForm