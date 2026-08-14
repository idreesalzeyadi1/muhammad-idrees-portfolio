import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, ExternalLink, Calendar, X, ZoomIn } from 'lucide-react'

// Vite production-friendly static imports
import dartImg from '../assets/dart.png'

import DigitalMrk from '../assets/DigitalMrk.png'
import ActAiCrt from '../assets/ActAiCrt.png'


const certificates = [
  {
    id: 1,
    image: ActAiCrt, 
    title: 'Advanced AI (ACT AI)',
    issuer: ' HEC Pakistan , SkillBridge',
    date: '2026',
    credentialUrl: '#', 
    // Updated tags as requested
    skills: ['AI TOOLS', 'VIBE CODING', 'CUSTOMIZE CHAT BOTS'],
  },
  {
    id: 2,
    image: DigitalMrk,
    title: 'Digital Marketing Course',
    issuer: 'DigiSkills (via NAVTTC)',
    date: '2026',
    credentialUrl: '#', 
    skills: ['Social Media Marketing', 'SEO', 'Content Strategy', 'Online Branding'],
  },
  {
    id: 3,
    image: dartImg, 
    title: 'Dart Fundamentals',
    issuer: 'Cisco Networking Academy',
    date: '2025',
    credentialUrl: '#', 
    skills: ['Dart Programming', 'Flutter Basics', 'OOP', 'Application Logic'],
  },
  {
    id: 4,
    image: dartImg, 
    title: 'Dart Fundamentals',
    issuer: 'Cisco Networking Academy',
    date: '2025',
    credentialUrl: '#', 
    skills: ['Dart Programming', 'Flutter Basics', 'OOP', 'Application Logic'],
  },
]

function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Track which certificate is currently open in the modal (null = closed)
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certificates" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold text-sm tracking-wider uppercase">
            Achievements
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4">
            Certificates & <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional certifications and courses that validate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass-card overflow-hidden group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              {/* Certificate Image */}
              <div className="relative h-48 bg-dark-700 overflow-hidden flex items-center justify-center">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-500/10 to-accent-gold/10">
                    <Award className="text-primary-400 mb-2 group-hover:scale-110 transition-transform duration-300" size={54} />
                    <span className="text-gray-500 text-xs font-medium tracking-wide uppercase">Verified Credential</span>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60" />

                {/* Zoom hint icon (shows on hover, indicates it's clickable) */}
                <div className="absolute inset-0 flex items-center justify-center bg-dark-900/0 group-hover:bg-dark-900/40 transition-colors duration-300">
                  <ZoomIn
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    size={32}
                  />
                </div>
                
                {/* View Button (external credential link, unrelated to the modal) */}
                {cert.credentialUrl !== '#' && (
                  <motion.a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-dark-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-primary-400 font-medium text-sm mb-2">{cert.issuer}</p>
                <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                  <Calendar size={14} />
                  {cert.date}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded-md border border-gray-600/10 uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-dark-900/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl my-auto max-h-[95vh] flex flex-col bg-dark-800 rounded-2xl overflow-hidden border border-gray-700/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-10 h-10 bg-dark-900/80 hover:bg-dark-900 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Scrollable content area: image + details together, so nothing gets clipped */}
              <div className="flex-1 min-h-0 overflow-y-auto">
                {/* Full Certificate Image */}
                <div className="flex items-center justify-center bg-dark-900 p-2 sm:p-4">
                  {selectedCert.image ? (
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 flex flex-col items-center justify-center">
                      <Award className="text-primary-400 mb-2" size={64} />
                      <span className="text-gray-500 text-sm">No image available</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 border-t border-gray-700/40">
                <h3 className="text-xl font-bold text-white mb-1">{selectedCert.title}</h3>
                <p className="text-primary-400 font-medium text-sm mb-2">{selectedCert.issuer}</p>
                <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                  <Calendar size={14} />
                  {selectedCert.date}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded-md border border-gray-600/10 uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Certificates