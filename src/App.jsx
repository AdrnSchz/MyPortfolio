import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Home } from './pages/Home/Home'
import { Projects } from './pages/Projects/Projects'
import { ProjectDetail } from './pages/ProjectDetail/ProjectDetail'
import { Experience } from './pages/Experience/Experience'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <Router>
      {/* Navbar */}
        <Navbar />
      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/experience" element={<Experience />} />
        { /*<Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      {/* Footer */}
      <Footer />
    </Router>
  )
}

export default App
