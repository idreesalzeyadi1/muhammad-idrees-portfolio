import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home',         href: '/' },
  { name: 'Skills',       href: '/#skills' },
  { name: 'Experience',   href: '/#experience' },
  { name: 'Education',    href: '/#education' },
  { name: 'Certificates', href: '/#certificates' },
  { name: 'Projects',     href: '/#projects' },
  { name: 'Blog',         href: '/blog' },
  { name: 'Contact',      href: '/#contact' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const isActive = (href) => {
    if (href === '/blog') return location.pathname.startsWith('/blog')
    if (href === '/') return location.pathname === '/'
    return false
  }

  return (
    <motion.nav aria-label="Main Navigation" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between">
        <motion.a href="/" title="Muhammad Idrees - Web Developer Home" className="flex items-center gap-1 group" whileHover={{ scale: 1.02 }}>
          <span className="text-2xl md:text-3xl font-display font-black">
            <span className="text-primary-400">M</span><span className="text-white">uhammad</span>
          </span>
          <span className="text-2xl md:text-3xl font-display font-black">
            <span className="text-accent-gold">I</span><span className="text-white">drees</span>
          </span>
          <motion.span className="w-2 h-2 bg-primary-400 rounded-full ml-1"
            animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => {
            const active = isActive(link.href)
            return (
              <motion.a key={link.name} href={link.href} title={`Navigate to ${link.name}`}
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}
                className={`font-medium transition-colors duration-300 relative group ${active ? 'text-primary-400' : 'text-gray-400 hover:text-primary-400'}`}>
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-400 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </motion.a>
            )
          })}
        </div>

        <button onClick={() => setMobileOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="lg:hidden p-2 text-gray-400 hover:text-primary-400 transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="lg:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden">
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link, index) => {
                const active = isActive(link.href)
                return (
                  <motion.a key={link.name} href={link.href} title={`Navigate to ${link.name}`}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    className={`font-medium py-3 px-4 rounded-xl transition-all duration-300 ${active ? 'text-primary-400 bg-primary-500/10' : 'text-gray-300 hover:text-primary-400 hover:bg-dark-700/50'}`}>
                    {link.name}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar