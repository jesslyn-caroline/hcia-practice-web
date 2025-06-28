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
import ClassList from './screens/class_list.tsx'
import ClassListProvider from './provider/class_list_context.tsx'
import ClassViewProvider from './provider/class_view_context.tsx'
import ClassView from './screens/class_view.tsx'
import ClassEnter from './screens/students/class_enter.tsx'
import NewClass from './screens/new_class.tsx'
import QuizMenu from './screens/quiz_menu.tsx'
import QuizNew from './screens/quiz_new.tsx'
import OnQuizRegular from './screens/on_quiz_regular.tsx'
import OnQuizFlash from './screens/on_quiz_flash.tsx'
import StudentProfile from './screens/student_profile.tsx'
import QuizResult from './screens/quiz_result.tsx'
import AssignmentNew from './screens/assignment_new.tsx'

function App() {

  const { user } = useContext(UserContext)

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
        user.role === "student"? 
        <>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/class" element={ user.classId === null? 
          <ClassEnter /> : 
          <ClassViewProvider>
            <ClassView />
          </ClassViewProvider>} />
          <Route path="/quiz/menu" element={<QuizMenu />} />
          <Route path="/quiz/new" element={<QuizNew />} />
          <Route path="/quiz/result/:quizId" element={<QuizResult />} />
        </Route> 
        <Route path="/quiz/regular/ongoing" element={<OnQuizRegular />} />
        <Route path="/quiz/flash/ongoing" element={<OnQuizFlash />} />
        </>: null
        
      }

      {
        user.role === "admin"? 
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
          <Route path="/classes" element={
            <ClassListProvider>
              <ClassList />
            </ClassListProvider> }/>
          <Route path="/class/:id" element={
            <ClassViewProvider>
              <ClassView />
            </ClassViewProvider>
          } />
          <Route path="/class/new" element={
            <NewClass />
          }/>
          <Route path="/assignment/new" element={<AssignmentNew />}></Route>
          <Route path="/profile/:studentId" element={<StudentProfile />} />
        </Route> : null
      }
      
      {/* == unauthorized == */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
