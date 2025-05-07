import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import EventDetail from './components/EventDetails.jsx'

const router = createBrowserRouter([{
    path:"/",
    element:<Home/>
  },
  {
    path:'/events/:eventId',
    element:<EventDetail/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
