import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CrowdfundingPlatform from './CrowdfundingPlatform'
import MusicCrowdfundingLanding from './MusicCrowdfundingLanding'
import CourseReviewsProject from './CourseReviewsProject'
import ColorPaletteProProject from './ColorPaletteProProject'
import CreativeBusProject from './CreativeBusProject'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <Router basename="/AlbertPetenberg">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CrowdfundingPlatform />} />
        <Route path="/project/tiiva-all" element={<MusicCrowdfundingLanding />} />
        <Route path="/project/course-reviews" element={<CourseReviewsProject />} />
        <Route path="/project/color-palette-pro" element={<ColorPaletteProProject />} />
        <Route path="/project/creative-bus" element={<CreativeBusProject />} />
      </Routes>
    </Router>
  )
}

export default App
