import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Send, ChevronDown, X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram } from 'lucide-react'
import { Player } from '@lottiefiles/react-lottie-player'

function Hero() {
  // پاپ اپ اسکرین (Modal) کو کنٹرول کرنے کے لیے اسٹیٹ
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // واٹس ایپ کا آفیشل SVG آئکن
  const whatsappIcon = (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.198 1.451 4.82 1.452 5.423 0 9.835-4.416 9.838-9.84.002-2.628-1.022-5.1-2.882-6.959C16.505 1.948 14.034.92 11.413.92c-5.424 0-9.838 4.417-9.842 9.844-.001 1.74.457 3.44 1.326 4.953l-.99 3.613 3.702-.971zm10.99-5.185c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    </svg>
  )

  return (
    <section id="about" className="min-h-screen flex items-center section-padding pt-32 relative overflow-hidden">
      {/* Background Shapes */}
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
              {/* Hire Me بٹن پر کلک کرنے سے پاپ اپ اوپن ہوگا */}
              <motion.button
                onClick={() => setIsProfileOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold shadow-lg hover:bg-primary-600 transition-colors"
              >
                <Send size={18} />
                Hire Me
              </motion.button>

              {/* CV پبلک فولڈر سے ڈاؤن لوڈ کرنے کا لنک */}
              <motion.a
                href="/cv.pdf"
                download="Muhammad_Idrees_CV.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-xl border border-dark-600 text-gray-300 font-semibold hover:bg-dark-800 transition-colors"
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

      {/* --- HIRE ME PROFILE POPUP (MODAL) --- */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* بلیک بلر بیک گراؤنڈ اوورلے */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* پروفائل کارڈ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-dark-800 border border-dark-700 rounded-2xl p-6 shadow-2xl text-center z-10 overflow-hidden"
            >
              {/* کلوز بٹن */}
              <button
                onClick={() => setIsProfileOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-dark-700/50 p-2 rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              {/* پروفائل امیج پبلک فولڈر سے */}
              <div className="relative w-28 h-28 mx-auto mb-4 rounded-full border-2 border-primary-500 p-1 bg-dark-900 overflow-hidden">
                <img 
                  src="/profile-pic.jpg" 
                  alt="Muhammad Idrees" 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // اگر پبلک فولڈر میں تصویر نہ ملے تو یہ خوبصورت اوتار نظر آئے گا
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200"
                  }}
                />
              </div>

              {/*info */}
              <h3 className="text-2xl font-bold text-white font-display mb-1">Muhammad Idrees</h3>
              <p className="text-primary-400 font-medium text-sm mb-4">Computer Science Teacher & Web Developer</p>
              
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                I am a computer science teacher and web developer based in Peshawar, Pakistan. I am passionate about creating engaging and user-friendly websites and applications.
              </p>

              {/*links */}
              <div className="space-y-3 text-left mb-6 bg-dark-900/50 p-4 rounded-xl border border-dark-700">
                <a href="mailto:idreesalzeyadi03@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-primary-400 text-sm transition-colors">
                  <Mail size={16} className="text-primary-400" />
                  idreesalzeyadi03@gmail.com
                </a>
                <a href="tel:+923411929949" className="flex items-center gap-3 text-gray-300 hover:text-primary-400 text-sm transition-colors">
                  <Phone size={16} className="text-primary-400" />
                  +92 341 1929949
                </a>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <MapPin size={16} className="text-primary-400" />
                  Peshawar, Pakistan
                </div>
              </div>

              {/* سوشل لنکس بشمول واٹس ایپ */}
              <div className="flex justify-center gap-3">
                <a href="https://wa.me/923411929949" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-700 hover:bg-green-500 hover:text-white rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300" title="WhatsApp">
                  {whatsappIcon}
                </a>
                <a href="https://github.com/idreesalzeyadi1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-700 hover:bg-primary-500 hover:text-white rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300" title="GitHub">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/idreesalzeyadi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-700 hover:bg-primary-500 hover:text-white rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.facebook.com/idreesalzeyadi01/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-700 hover:bg-primary-500 hover:text-white rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300" title="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/idreesalzeyadi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-dark-700 hover:bg-primary-500 hover:text-white rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300" title="Instagram">
                  <Instagram size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hero