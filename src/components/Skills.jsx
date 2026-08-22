import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Vite assets imports
import webImg from '../assets/web.jpg'
import seoImg from '../assets/seo.png'
import msofficeImg from '../assets/msoffice.jpg'
import canvaImg from '../assets/canva.jpg'
import digitalImg from '../assets/digital.jpg'
import markImg from '../assets/mark.jpg'

const skills = [
  {
    image: webImg,
    name: 'Web Development Services',
    description: 'Building modern, responsive websites and web applications using React, HTML, CSS, JavaScript, and Tailwind CSS in Peshawar & Chitral.',
    color: 'from-cyan-400 to-blue-500',
    altText: 'Web Development Services by Idrees Alzeyadi in Peshawar'
  },
  {
    image: seoImg,
    name: 'Search Engine Optimization (SEO)',
    description: 'Learn SEO strategies to improve website rankings, increase organic traffic, optimize content, and grow your online presence on search engines.',
    color: 'from-green-400 to-emerald-600',
    altText: 'SEO Specialist in Peshawar and Chitral - RiseDigital Solutions'
  },
  {
    image: msofficeImg,
    name: 'MS Office & Documentation',
    description: 'Expert in Microsoft Office Suite including Word and PowerPoint for professional documentation and corporate presentation training.',
    color: 'from-orange-400 to-red-500',
    altText: 'Microsoft Office Expert and ICT Trainer in Peshawar'
  },
  {
    image: canvaImg,
    name: 'Canva & Graphic Design',
    description: 'Creating stunning graphics, presentations, social media posts, corporate branding logos, and marketing materials using Canva.',
    color: 'from-purple-400 to-pink-500',
    altText: 'Canva Graphic Designer Peshawar - RiseDigital Solutions'
  },
  {
    image: markImg, // FIXED: Corrected syntax error
    name: 'Digital Marketing & Strategy',
    description: 'Social media marketing, SEO basics, content strategy, and online brand promotion techniques in Peshawar & Chitral.',
    color: 'from-yellow-400 to-orange-500',
    altText: 'Digital Marketing Course and Services in Peshawar Chitral'
  },
  {
    image: digitalImg,
    name: 'Social Media Management',
    description: 'Proficient in managing social media platforms like Facebook, Twitter, LinkedIn, and Instagram for effective engagement and lead generation.',
    color: 'from-teal-400 to-cyan-500',
    altText: 'Social Media Manager and Brand Strategist Peshawar'
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
            My <span className="text-gradient">Skills & Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive Web Development, SEO, Digital Marketing, and Training services provided across Peshawar, Chitral, and Pakistan by Idrees Alzeyadi (RiseDigital Solutions).
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
              className="glass-card overflow-hidden group cursor-pointer relative"
            >
              {/* Skill Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={skill.image}
                  alt={skill.altText} // SEO Optimized Alt Attribute
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
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