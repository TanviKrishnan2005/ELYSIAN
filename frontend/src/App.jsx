import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/footer'

import './App.css'
function App() {

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
  )
}

export default App

