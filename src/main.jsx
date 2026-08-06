import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import ThemeProvider from './Contexts/ThemeProvider.jsx'
import ToastProvider from './Contexts/ToastProvider.jsx'
import CartProvider from './Contexts/CartProvider.jsx'
import router from './routers/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
