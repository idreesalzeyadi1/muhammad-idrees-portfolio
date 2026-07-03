import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Projects from './components/Projects'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import ReviewForm from './components/ReviewForm'
import AdminReviews from './components/AdminReviews'

function Portfolio() {
  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Certificates />
        <Projects />
        <Reviews />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/admin" element={<AdminReviews />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App