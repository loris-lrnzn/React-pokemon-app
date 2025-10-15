import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Teams from './pages/Teams'

function App() {
  const title = 'REACT'

  return (
    <div>
      <Navbar></Navbar>
      <Teams></Teams>
      <Footer></Footer>
    </div>
  )
}

export default App