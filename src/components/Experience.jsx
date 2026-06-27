import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

// Import images
import mcsLogo from '../assets/mcs.jpg'
import ggsLogo from '../assets/ggs.png'
import pamirLogo from '../assets/pamir.png'

// Your actual experience
const experiences = [
  {
    id: 1,
    schoolLogo: mcsLogo,
    schoolName: 'Muslim Collegiate School Peshawar',
    position: 'Computer Science Teacher',
    location: 'Peshawar, KPK',
    startDate: '2026',
    endDate: 'Present',
    description: 'Teaching computer science fundamentals, programming languages, and web development to students. Developing curriculum, conducting practical lab sessions, and mentoring students in technology skills.',
    highlights: ['Web Development', 'Programming', 'Lab Management', 'Student Mentoring'],
  },
  {
    id: 2,
    schoolLogo: ggsLogo,
    schoolName: 'GreenWich Grammar School Peshawar',
    position: 'Computer Science Teacher',
    location: 'Peshawar, KPK',
    startDate: '2025',
    endDate: '2026',
    description: 'Taught computer science and IT skills to students. Organized coding workshops, managed computer labs, and helped students develop practical technology skills.',
    highlights: ['IT Skills', 'Coding Workshops', 'Lab Management', 'Curriculum Development'],
  },
  {
    id: 3,
    schoolLogo: pamirLogo,
    schoolName: 'Pamir Public School',
    position: 'Computer Science Teacher',
    location: 'Chitral, KPK',
    startDate: '2024',
    endDate: '2025',
    description: 'Started my teaching career by introducing students to computer basics, MS Office, and foundational programming concepts. Built strong relationships with students and colleagues.',
    highlights: ['Computer Basics', 'MS Office', 'Programming Basics', 'Student Engagement'],
  },
]

function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold text-sm tracking-wider uppercase">
            My Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey as a Computer Science Teacher, dedicated to empowering students with technology skills.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div ref={ref} className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card p-6 md:p-8 group hover:border-primary-500/30 transition-all duration-300 relative"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* School Logo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-dark-700 border border-dark-600 flex items-center justify-center overflow-hidden group-hover:border-primary-500/50 transition-colors">
                    {exp.schoolLogo ? (
                      <img
                        src={exp.schoolLogo}
                        alt={exp.schoolName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Briefcase className="text-primary-400" size={32} />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-primary-400 font-semibold text-lg">{exp.schoolName}</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                      <span className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-400 px-3 py-1 rounded-full text-sm font-semibold">
                        <Calendar size={14} />
                        {exp.startDate} - {exp.endDate}
                      </span>
                      <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-accent-gold/10 text-accent-gold text-sm rounded-full border border-accent-gold/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Job Indicator */}
              {exp.endDate === 'Present' && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Currently Working
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
