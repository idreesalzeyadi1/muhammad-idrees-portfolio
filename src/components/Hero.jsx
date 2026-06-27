import { motion } from 'framer-motion'
import { Download, Send, ChevronDown } from 'lucide-react'
import { Player } from '@lottiefiles/react-lottie-player'

function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center section-padding pt-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-gold/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">

          {/* Left Content - TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-dark-800/80 border border-dark-700 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-400 text-sm">Available for opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
            >
              <span className="text-gray-300">I'm </span>
              <span className="text-gradient">Muhammad Idrees</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span className="bg-primary-500/20 text-primary-400 px-4 py-2 rounded-lg font-semibold text-lg">
                Computer Science Teacher
              </span>
              <span className="text-gray-500 text-2xl">•</span>
              <span className="bg-accent-gold/20 text-accent-gold px-4 py-2 rounded-lg font-semibold text-lg">
                Web Developer
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl"
            >
              Passionate educator and developer with expertise in creating engaging learning experiences
              and building modern web applications. Dedicated to empowering students with technology
              skills and delivering high-quality digital solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center gap-2"
              >
                <Send size={18} />
                Hire Me
              </motion.a>
              <motion.a
                href="/cv.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center gap-2"
              >
                <Download size={18} />
                Download CV
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-8 mt-12 pt-8 border-t border-dark-700"
            >
              {[
                { value: '2+', label: 'Years Experience' },
                { value: '4+', label: 'Projects Completed' },
                { value: '500+', label: 'Students Taught' },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

         {/* Right Content - Animation */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="hidden lg:flex order-2 lg:order-2 justify-center"
>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-accent-gold/30 rounded-full blur-[100px]" />

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[220px] h-[220px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px]"
              >
                <Player
                  autoplay
                  loop
                  src="https://assets9.lottiefiles.com/packages/lf20_w98qte06.json"
                  style={{ width: '100%', height: '100%' }}
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-6 -right-6 w-24 h-24 border-2 border-dashed border-primary-500/40 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-6 -left-6 w-20 h-20 border-2 border-dashed border-accent-gold/40 rounded-full"
                />

                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-5 right-0 bg-dark-800/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-primary-500/30 shadow-lg shadow-primary-500/10"
                >
                  <span className="text-xl sm:text-2xl">⚛️</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-16 -left-2 bg-dark-800/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-accent-gold/30 shadow-lg shadow-accent-gold/10"
                >
                  <span className="text-xl sm:text-2xl">🎓</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/4 -left-8 bg-dark-800/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-green-500/30 shadow-lg shadow-green-500/10"
                >
                  <span className="text-xl sm:text-2xl">💻</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute bottom-1/4 -right-4 bg-dark-800/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/10"
                >
                  <span className="text-xl sm:text-2xl">🚀</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-sm">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="text-primary-400" size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero