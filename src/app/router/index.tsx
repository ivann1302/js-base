import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/main-page'
import { App } from '@/App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
])
