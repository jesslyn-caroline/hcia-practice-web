import { Routes, Route } from 'react-router'

import Login from './screens/login'
import Layout from './screens/layout'
import Signup from './screens/signup'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Layout />} >
        <Route index element={<></>} />
        
      </Route>
    </Routes>
  )
}

export default App
