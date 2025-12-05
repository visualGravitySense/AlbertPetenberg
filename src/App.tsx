import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CrowdfundingPlatform from './CrowdfundingPlatform'
import MusicCrowdfundingLanding from './MusicCrowdfundingLanding'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <Router basename="/AlbertPetenberg">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CrowdfundingPlatform />} />
        <Route path="/project/tiiva-all" element={<MusicCrowdfundingLanding />} />
      </Routes>
    </Router>
  )
}

export default App
