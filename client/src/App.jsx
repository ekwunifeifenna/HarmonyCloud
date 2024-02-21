import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import { Toaster } from 'react-hot-toast'
import Home from './components/Home'

function App() {
  
  return (

    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
