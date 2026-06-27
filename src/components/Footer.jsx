import { motion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Twitter, 
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
  
]

// PLACEHOLDER: Edit your contact info here
const contactInfo = [
  { icon: <Mail size={18} />, text: 'idreesalzeyadi@gmail.com', href: 'mailto:your.email@example.com' },
  { icon: <Phone size={18} />, text: '+923411929949', href: 'tel:+923001234567' },
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
                {/* PLACEHOLDER: Edit your footer bio */}
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
