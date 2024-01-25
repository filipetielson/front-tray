import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PlatformProvider } from './hook/ButtonContext'
import { AuthProvider } from './hook/auth'
import { Router } from './routes'

export function App() {
  return (
    <div className="h-full flex justify-center">
      <BrowserRouter>
        <AuthProvider>
          <PlatformProvider>
            <ChakraProvider>
              <Router />
              <ToastContainer />
            </ChakraProvider>
          </PlatformProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}
