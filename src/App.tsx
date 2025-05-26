import { Routes, Route } from 'react-router'

import LoginSignupLayout from './screens/login_signup_layout.tsx'
import LoginCard from './components/login_card.tsx'
import SignupCard from './components/signup_card.tsx'

import Layout from './screens/layout.tsx'
import CreateQuestion from './screens/create_question.tsx'
import Home from './screens/home.tsx'

import UserProvider from './provider/user_context.tsx'
import SignupProvider from './provider/signup_context.tsx'

function App() {

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LoginSignupLayout />} >
          <Route path="/login" element={<LoginCard />} />
          <Route path="/signup" element={
            <SignupProvider>
              <SignupCard />
            </SignupProvider>
          } />
        </Route>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/create-question" element={<CreateQuestion />} />
        </Route>
      </Routes>
    </UserProvider>
  )
}

export default App
