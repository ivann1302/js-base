import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/main-page'
import { TasksPage } from '@/pages/tasks-page'
import { KnowledgeBasePage } from '@/pages/knowledge-base-page'
import { ResourcesPage } from '@/pages/resources-page'
import { SearchResultsPage } from '@/pages/search-results-page'
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
      },
      {
        path: 'knowledge-base/:categoryId',
        element: <KnowledgeBasePage />,
      },
      {
        path: 'knowledge-base/:categoryId/:topicId',
        element: <KnowledgeBasePage />,
      },
      {
        path: 'resources',
        element: <ResourcesPage />,
      },
      {
        path: 'search',
        element: <SearchResultsPage />,
      },
    ],
  },
])
