import Navbar from './components/Navbar'
import './index.css'
import JetList from './components/JetList/JetList.jsx'
import Welcome from './components/Welcome.jsx'

function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Welcome />
      <JetList />

      
    </div>
  )
}

export default App
