import { motion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ArrowUp
} from 'lucide-react'

// PLACEHOLDER: Edit your social links here
const socialLinks = [
  { icon: <Github size={20} />, url: 'https://github.com/idreesalzeyadi1', label: 'GitHub' },
  { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/idreesalzeyadi/', label: 'LinkedIn' },
  { icon: <Facebook size={20} />, url: 'https://www.facebook.com/idreesalzeyadi01/', label: 'Facebook' },
  { icon: <Instagram size={20} />, url: 'https://www.instagram.com/idreesalzeyadi/', label: 'Instagram' },
  { 
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.198 1.451 4.82 1.452 5.423 0 9.835-4.416 9.838-9.84.002-2.628-1.022-5.1-2.882-6.959C16.505 1.948 14.034.92 11.413.92c-5.424 0-9.838 4.417-9.842 9.844-.001 1.74.457 3.44 1.326 4.953l-.99 3.613 3.702-.971zm10.99-5.185c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      </svg>
    ), 
    url: 'https://wa.me/923411929949', 
    label: 'WhatsApp' 
  },
]

// PLACEHOLDER: Edit your contact info here
const contactInfo = [
  { icon: <Mail size={18} />, text: 'idreesalzeyadi03@gmail.com', href: 'mailto:idreesalzeyadi03@gmail.com' },
  { icon: <Phone size={18} />, text: '+923411929949', href: 'tel:+923411929949' },
  { icon: <MapPin size={18} />, text: 'Peshawar, Pakistan', href: '#' },
]

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="bg-dark-800/50 border-t border-dark-700">
      {/* Main Footer */}
      <div className="section-padding pb-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.a
                href="#"
                className="inline-flex items-center gap-1 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-2xl font-display font-black">
                  <span className="text-primary-400">M</span>
                  <span className="text-white">uhammad</span>
                </span>
                <span className="text-2xl font-display font-black">
                  <span className="text-accent-gold">I</span>
                  <span className="text-white">drees</span>
                </span>
              </motion.a>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Computer Science Teacher and Web Developer passionate about creating 
                impactful digital experiences and empowering the next generation of tech enthusiasts.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-dark-700 hover:bg-primary-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact Info</h4>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index}>
                    <a
                      href={info.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-3"
                    >
                      <span className="text-primary-400">{info.icon}</span>
                      {info.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dark-700 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-gray-500 text-sm flex items-center gap-1">
                © {new Date().getFullYear()} Muhammad Idrees. Made with 
                <Heart size={14} className="text-red-500 fill-red-500" /> 
                All rights reserved.
              </p>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
              >
                Back to top
                <span className="w-8 h-8 bg-dark-700 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors">
                  <ArrowUp size={16} />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer