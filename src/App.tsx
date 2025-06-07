import { Routes, Route, Navigate } from 'react-router'
import { useContext } from 'react'

import LoginSignupLayout from './screens/login_signup_layout.tsx'
import Layout from './screens/layout.tsx'

import { UserContext } from './provider/user_context.tsx'

import SignupProvider from './provider/signup_context.tsx'
import LoginProvider from './provider/login_context.tsx'

import LoginCard from './components/login_card.tsx'
import SignupCard from './components/signup_card.tsx'
import CreateQuestion from './screens/create_question.tsx'
import Home from './screens/home.tsx'
import NotFound from './screens/not_found.tsx'
import QuestionList from './screens/question_list.tsx'
import EditQuestion from './screens/edit_question.tsx'
import EditQuestionProvider from './provider/edit_question_context.tsx'
import CreateQuestionProvider from './provider/create_question_context.tsx'

function App() {

  const { role } = useContext(UserContext)

  return (
    <Routes>
      {/* == if user tries to access "/" without log in == */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* == login and sign up == */}
      <Route element={<LoginSignupLayout />} >
        <Route path="/login" element={
          <LoginProvider>
            <LoginCard />
          </LoginProvider>   
        } />
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
        </Route> : null
      }

      {
        role === "admin"? 
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/question/new" element={
            <CreateQuestionProvider>
              <CreateQuestion />
            </CreateQuestionProvider> 
          } />
          <Route path="/question" element={<QuestionList />} />
          <Route path="/question/edit/:id" element={
            <EditQuestionProvider>
               <EditQuestion />
            </EditQuestionProvider>} />
        </Route> : null
      }
      
      {/* == unauthorized == */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
