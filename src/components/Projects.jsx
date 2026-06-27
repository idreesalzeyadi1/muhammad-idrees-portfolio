import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Folder, Clock } from 'lucide-react'

// Your actual projects
const projects = [
  {
    id: 1,
    image: '/src/assets/mj.jpeg',
    title: 'M&J Traders',
    description: 'A full-featured e-commerce platform for electronics with cart, checkout, order tracking, and admin panel. Built with React and Firebase.',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://www.mjtraders.company/',
    githubUrl: '#',
    featured: true,
    comingSoon: false,
  },
  {
    id: 2,
    image: '/src/assets/afs.jpg',
    title: 'AFS Virtual Tutor Hub',
    description: 'An educational platform for virtual tutoring with course management, student dashboard, and interactive learning features.',
    technologies: ['React', 'Vercel', 'CSS3', 'JavaScript'],
    liveUrl: 'https://afs-virtual-tutor-hub.vercel.app/',
    githubUrl: '#',
    featured: true,
    comingSoon: false,
  },
  {
    id: 3,
    image: '/src/assets/mcs.jpg',
    title: 'MCS Maths Battle',
    description: 'An interactive math competition web app where students can battle in real-time math challenges and track their scores.',
    technologies: ['React', 'JavaScript', 'Vercel', 'CSS3'],
    liveUrl: 'https://mcs-maths-battleweb.vercel.app/',
    githubUrl: '#',
    featured: false,
    comingSoon: false,
  },
  {
    id: 4,
    image: '/src/assets/student.png',
    title: 'StudentTrack',
    description: 'A student management and tracking system for monitoring attendance, grades, and academic progress.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    liveUrl: 'https://idreesalzeyadi1.github.io/StudentTrack/',
    githubUrl: 'https://github.com/idreesalzeyadi1/StudentTrack',
    featured: false,
    comingSoon: false,
  },
  {
    id: 5,
    image: null,
    title: 'Coming Soon',
    description: 'An exciting new project is currently in development. Stay tuned for updates!',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    comingSoon: true,
  },
  {
    id: 6,
    image: null,
    title: 'Coming Soon',
    description: 'Another amazing project is on the way. Check back soon for the reveal!',
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    comingSoon: true,
  },
]

function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="section-padding bg-dark-800/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold text-sm tracking-wider uppercase">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in web development, from concept to deployment.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: project.comingSoon ? 0 : -8 }}
              className={`glass-card overflow-hidden group ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              } ${project.comingSoon ? 'opacity-70' : ''}`}
            >
              {/* Project Image */}
              <div className="relative h-52 bg-dark-700 overflow-hidden">
                {project.comingSoon ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-500/10 to-accent-gold/10">
                    <Clock className="text-primary-400 mb-3" size={48} />
                    <span className="text-primary-400 font-semibold">Coming Soon</span>
                  </div>
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                
                {/* Placeholder if image fails */}
                <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-primary-500/10 to-accent-gold/10">
                  <Folder className="text-primary-400" size={64} />
                </div>

                {/* Overlay with Links */}
                {!project.comingSoon && (
                  <div className="absolute inset-0 bg-dark-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-400 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                    {project.githubUrl !== '#' && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                  </div>
                )}

                {/* Featured Badge */}
                {project.featured && !project.comingSoon && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent-gold text-dark-900 text-xs font-bold rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-md border border-primary-500/20"
                    >
                      {tech}
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

export default Projects
