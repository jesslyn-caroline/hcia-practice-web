import { Routes, Route } from 'react-router'

import LoginSignupLayout from './screens/login_signup_layout.tsx'
import LoginCard from './components/login_card.tsx'
import SignupCard from './components/signup_card.tsx'

import Layout from './screens/layout.tsx'
import CreateQuestion from './screens/create_question.tsx'
import Home from './screens/home.tsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginSignupLayout />} >
        <Route path="/login" element={<LoginCard />} />
        <Route path="/signup" element={<SignupCard />} />
      </Route>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="/create-question" element={<CreateQuestion />} />
      </Route>
    </Routes>
  )
}

export default App
