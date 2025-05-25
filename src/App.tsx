import { Routes, Route } from 'react-router'

import LoginSignupLayout from './screens/login_signup_layout.tsx'
import LoginCard from './components/login_card.tsx'
import SignupCard from './components/signup_card.tsx'

import Layout from './screens/layout.tsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginSignupLayout />} >
        <Route path="/login" element={<LoginCard />} />
        <Route path="/signup" element={<SignupCard />} />
      </Route>
      <Route path="/" element={<Layout/>}>
        <Route index element={<h1>Home</h1>} />
      </Route>
    </Routes>
  )
}

export default App
