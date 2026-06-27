import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react'

// Import images
import uniLogo from '../assets/uni.jpg'
import collegeLogo from '../assets/college.jfif'
import schoolLogo from '../assets/school.png'
import medLogo from '../assets/med.png'

// Your actual education
const education = [
  {
    id: 1,
    logo: uniLogo,
    degree: 'BS in Computer Science',
    institution: 'University of Peshawar',
    location: 'Peshawar, KPK',
    year: '2020 - 2024',
    description: 'Completed Bachelor\'s degree in Computer Science with focus on programming, web development, databases, and software engineering.',
    achievements: ['Programming', 'Web Development', 'Database Management', 'Software Engineering'],
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 2,
    logo: collegeLogo,
    degree: 'Intermediate in Computer Science',
    institution: 'Govt College Peshawar',
    location: 'Peshawar, KPK',
    year: '2018 - 2020',
    description: 'Completed intermediate education with Computer Science as major subject. Built strong foundation in programming and computer fundamentals.',
    achievements: ['Computer Science', 'Programming Basics', 'Mathematics'],
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 3,
    logo: schoolLogo,
    degree: 'Matriculation (SSC)',
    institution: 'Govt Shaheed Hasnain Higher Secondary School',
    location: 'Peshawar, KPK',
    year: '2016 - 2018',
    description: 'Completed matriculation with science subjects. Developed interest in technology and computers during this period.',
    achievements: ['Science', 'Mathematics', 'Computer Studies'],
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 4,
    logo: medLogo,
    degree: 'Primary & Middle Education',
    institution: 'Alberuni Public School',
    location: 'Upper Chitral, KPK',
    year: '2008 - 2016',
    description: 'Completed primary and middle school education. Built strong academic foundation and developed passion for learning.',
    achievements: ['Primary Education', 'Middle School', 'Academic Foundation'],
    color: 'from-orange-500 to-amber-600',
  },
]

function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="education" className="section-padding bg-dark-800/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold text-sm tracking-wider uppercase">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4">
            My <span className="text-gradient">Education</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic journey that laid the foundation for my career in technology and education.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div ref={ref} className="relative">
          {/* Timeline Line - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-gold to-primary-500/20 hidden lg:block transform -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col lg:flex-row gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot - Desktop */}
                <div className="absolute left-1/2 w-5 h-5 bg-primary-500 rounded-full transform -translate-x-1/2 border-4 border-dark-900 hidden lg:block z-10">
                  <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-20" />
                </div>

                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card p-6 md:p-8 group hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Background Gradient */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${edu.color} opacity-5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:opacity-10 transition-opacity`} />

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 relative z-10">
                      {/* Logo */}
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-dark-700 border border-dark-600 flex items-center justify-center overflow-hidden group-hover:border-primary-500/50 transition-colors flex-shrink-0">
                        {edu.logo ? (
                          <img
                            src={edu.logo}
                            alt={edu.institution}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <GraduationCap className="text-primary-400" size={32} />
                        )}
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-primary-400 font-semibold text-lg">{edu.institution}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1 bg-primary-500/10 text-primary-400 px-2 py-1 rounded-full">
                            <Calendar size={14} />
                            {edu.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed relative z-10">
                      {edu.description}
                    </p>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {edu.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-accent-gold/10 text-accent-gold text-sm rounded-full border border-accent-gold/20"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for timeline alignment - Desktop */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
