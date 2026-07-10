import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Star, Quote, ExternalLink, BadgeCheck } from 'lucide-react'

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('status', '==', 'approved')
        )
        const snap = await getDocs(q)
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        setReviews(data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchReviews()
  }, [])

  const renderName = (review) => {
    if (review.url) {
      return (
        <a href={review.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 group w-fit">
          <span className="text-primary-400 font-semibold text-sm group-hover:text-primary-300 transition-colors">
            {review.name}
          </span>
          <BadgeCheck size={15} className="text-[#1D9BF0] shrink-0" fill="#1D9BF0" stroke="#0f1115" strokeWidth={1.5} />
          <ExternalLink size={12} className="text-primary-400/60 group-hover:text-primary-300 transition-colors" />
        </a>
      )
    }
    return (
      <div className="flex items-center gap-1 w-fit">
        <p className="text-white font-semibold text-sm">{review.name}</p>
        <BadgeCheck size={15} className="text-[#1D9BF0] shrink-0" fill="#1D9BF0" stroke="#0f1115" strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <section id="reviews" className="section-padding">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent-gold/10 border border-accent-gold/30 rounded-full px-4 py-2 mb-4">
            <Star size={16} className="text-accent-gold fill-accent-gold" />
            <span className="text-accent-gold text-sm">Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Feedback from people I have had the pleasure of working with
          </p>
        </motion.div>

        {!loading && reviews.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-800/60 border border-dark-700 hover:border-primary-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col"
              >
                <Quote size={24} className="text-primary-500/40 mb-4" />

                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      size={16}
                      className={s <= review.rating ? 'text-accent-gold fill-accent-gold' : 'text-dark-600'}
                    />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed flex-1 mb-6 italic">
                  "{review.message}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-dark-700">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-gold flex items-center justify-center text-white font-bold shrink-0">
                    {review.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    {renderName(review)}
                    <p className="text-xs truncate">
                      {review.role && (
                        <span className="text-primary-400 font-bold">{review.role}</span>
                      )}
                      {review.role && review.company ? <span className="text-gray-500"> • </span> : ''}
                      {review.company && (
                        <span className="text-gray-300 font-semibold">{review.company}</span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">Worked with me? Share your experience!</p>
          <motion.a
            href="/review"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Star size={18} />
            Leave a Review
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}

export default Reviews