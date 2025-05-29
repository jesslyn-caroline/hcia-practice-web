import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'
import UserProvider from './provider/user_context.tsx'
import CreateQuestionProvider from './provider/create_question_context.tsx'
import ErrorMessageProvider from './provider/error_message_context.tsx'

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ErrorMessageProvider>
        <UserProvider>   
          <CreateQuestionProvider>
            <App />
          </CreateQuestionProvider>
        </UserProvider>
      </ErrorMessageProvider>
    </BrowserRouter>
  </StrictMode>,
)