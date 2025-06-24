import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'
import UserProvider from './provider/user_context.tsx'
import ErrorMessageProvider from './provider/error_message_context.tsx'
import QuestionListProvider from './provider/question_list_context.tsx'
import OnQuizProvider from './provider/on_quiz_context.tsx'

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ErrorMessageProvider>    
          <QuestionListProvider>
            <OnQuizProvider>
              <App /> 
            </OnQuizProvider>
          </QuestionListProvider>  
        </ErrorMessageProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)