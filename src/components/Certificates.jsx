import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, ExternalLink, Calendar } from 'lucide-react'

// PLACEHOLDER: Edit your certificates here
const certificates = [
  {
    id: 1,
    image: '/placeholder-certificate-1.png', // PLACEHOLDER: Add your certificate image
    title: 'Web Development Bootcamp',
    issuer: 'Udemy / Coursera / etc.',
    date: 'December 2023',
    credentialUrl: '#', // PLACEHOLDER: Add credential URL
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    id: 2,
    image: '/placeholder-certificate-2.png', // PLACEHOLDER: Add your certificate image
    title: 'Advanced React & Redux',
    issuer: 'Platform Name',
    date: 'October 2023',
    credentialUrl: '#', // PLACEHOLDER: Add credential URL
    skills: ['React', 'Redux', 'Hooks', 'Context API'],
  },
  {
    id: 3,
    image: '/placeholder-certificate-3.png', // PLACEHOLDER: Add your certificate image
    title: 'Teaching Excellence Certificate',
    issuer: 'Education Board / Institution',
    date: 'August 2023',
    credentialUrl: '#', // PLACEHOLDER: Add credential URL
    skills: ['Pedagogy', 'Curriculum Design', 'Assessment'],
  },
]

function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
            {/* PLACEHOLDER: Edit your certificates description */}
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
              className="glass-card overflow-hidden group"
            >
              {/* Certificate Image */}
              <div className="relative h-48 bg-dark-700 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Placeholder if image fails */}
                <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-primary-500/20 to-accent-gold/20">
                  <Award className="text-primary-400" size={64} />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60" />
                
                {/* View Button */}
                <motion.a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-dark-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ExternalLink size={18} />
                </motion.a>
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
                      className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded-md"
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
    </section>
  )
}

export default Certificates
