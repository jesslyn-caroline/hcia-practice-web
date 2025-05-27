import { Routes, Route, Navigate } from 'react-router'
import { useContext } from 'react'

import LoginSignupLayout from './screens/login_signup_layout.tsx'
import LoginCard from './components/login_card.tsx'
import SignupCard from './components/signup_card.tsx'

import Layout from './screens/layout.tsx'
import CreateQuestion from './screens/create_question.tsx'
import Home from './screens/home.tsx'

import { UserContext } from './provider/user_context.tsx'
import SignupProvider from './provider/signup_context.tsx'

function App() {

  const { role } = useContext(UserContext)

  return (
    <Routes>
      {/* == if user tries to access "/" without log in == */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* == login and sign up == */}
      <Route element={<LoginSignupLayout />} >
        <Route path="/login" element={<LoginCard />} />
        <Route path="/signup" element={
          <SignupProvider>
            <SignupCard />
          </SignupProvider>
        } />
      </Route>

      {/* == routes for student == */}
      {
        role === "student"? 
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/create-question" element={<CreateQuestion />} />
        </Route> : null
      }
      
      {/* == unauthorized == */}
      <Route path="*" element={<h1>Unauthorized</h1>} />
    </Routes>
  )
}

export default App
