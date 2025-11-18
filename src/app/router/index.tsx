import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/main-page'
import { TasksPage } from '@/pages/tasks-page'
import { KnowledgeBasePage } from '@/pages/knowledge-base-page'
import { ResourcesPage } from '@/pages/resources-page'
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
      {
        path: 'tasks',
        element: <TasksPage />,
      },
      {
        path: 'knowledge-base',
        element: <KnowledgeBasePage />,
        children: [
          {
            index: true,
            element: <KnowledgeBasePage />,
          },
          {
            path: ':categoryId',
            element: <KnowledgeBasePage />,
          },
          {
            path: ':categoryId/:topicId',
            element: <KnowledgeBasePage />,
          },
        ],
      },
      {
        path: 'resources',
        element: <ResourcesPage />,
      },
    ],
  },
])
