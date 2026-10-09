import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { SheetFrame } from './components/SheetFrame/SheetFrame'
import { Home } from './pages/Home/Home'
import { Projects } from './pages/Projects/Projects'
import { ProjectDetail } from './pages/ProjectDetail/ProjectDetail'
import { Experience } from './pages/Experience/Experience'
import { Footer } from './components/Footer/Footer'

// Each route opens at the top of its sheet, unless it targets an anchor
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SheetFrame />
      <div className="app">
        <Navbar />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/experience" element={<Experience />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
