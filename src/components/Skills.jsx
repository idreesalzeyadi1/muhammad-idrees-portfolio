import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// 1. Vite mein assets ko handle karne ke liye top par import karna zaroori hai
import webImg from '../assets/web.jpg'
import typingImg from '../assets/typing.jpg'
import msofficeImg from '../assets/msoffice.jpg'
import canvaImg from '../assets/canva.jpg'
import digitalImg from '../assets/digital.jpg'

const skills = [
  {
    image: webImg, // Path string ke bajaye imported variable use karein
    name: 'Web Development',
    description: 'Building modern, responsive websites and web applications using React, HTML, CSS, JavaScript, and Tailwind CSS.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    image: typingImg,
    name: 'Typing',
    description: 'Professional typing skills with high speed and accuracy for efficient documentation and data entry.',
    color: 'from-green-400 to-emerald-600',
  },
  {
    image: msofficeImg,
    name: 'MS Office',
    description: 'Expert in Microsoft Office Suite including Word, Excel, PowerPoint, and Outlook for professional documentation.',
    color: 'from-orange-400 to-red-500',
  },
  {
    image: canvaImg,
    name: 'Canva',
    description: 'Creating stunning graphics, presentations, social media posts, and marketing materials using Canva.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    image: digitalImg,
    name: 'Digital Marketing',
    description: 'Social media marketing, SEO basics, content strategy, and online brand promotion techniques.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    
    name: 'Teaching',
    description: 'Experienced educator with skills in curriculum development, classroom management, and student engagement.',
    color: 'from-teal-400 to-cyan-500',
  },
]

function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="section-padding bg-dark-800/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold text-sm tracking-wider uppercase">
            What I Do
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive set of skills that I use to deliver quality education and create exceptional digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              {/* Skill Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 
                            group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills