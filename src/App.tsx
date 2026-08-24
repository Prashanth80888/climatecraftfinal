import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { CollectionsPage } from './pages/CollectionsPage'
import { ComingSoon } from './pages/ComingSoon'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { AboutPage } from './pages/AboutPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/case-studies" element={<ComingSoon title="Case Studies" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
