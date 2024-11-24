import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/Layout'
import Home from './components/Home'
import Products from './components/Products'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='*' element={<p>Page Not Found!</p>} />
        </Route>
      </Routes>
    </>
  )
}
export default App