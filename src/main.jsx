import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App"
import Home from './routes/Home/Home.jsx'
import Competidor from './routes/Competidor/Competidor.jsx'
import Cadastrar from './routes/Cadastrar/index.jsx'
import Remover from './routes/Remover'
import Editar from './routes/Editar'
import EditCompetidor from './routes/EditCompetidor'
import Batle from './routes/Batle'
import Modalidade from './routes/Modalidade'
import CadBatle from './routes/CadBatle'
import Editbatle from './routes/EditBatle'
import Ranking from './routes/Ranking'

const router = createBrowserRouter([
  {
    path: "/site-card-vite/",
    element: <App />,
    children:[
      {
        path: "/site-card-vite/",
        element: <Home/>
      },
      {
        path: "/site-card-vite/:id",
        element: <Competidor/>
      },
      {
        path: "/site-card-vite/cadastrar",
        element: <Cadastrar/>
      },
      {
        path: "/site-card-vite/remover",
        element: <Remover />
      },
      {
        path: "/site-card-vite/editar",
        element: <Editar />
      },
      {
        path:"/site-card-vite/editar/:id",
        element: <EditCompetidor />
      },
      {
        path: "/site-card-vite/batle",
        element: <Batle />
      },
      {
        path: "/site-card-vite/batle/:modalidade",
        element: <Modalidade />
      },
      {
        path: "/site-card-vite/batle/:modalidade/cadastrar",
        element: <CadBatle />
      },
      {
        path: "/site-card-vite/batle/:modalidade/editar",
        element: <Editbatle />
      },
      {
        path: "/site-card-vite/ranking",
        element: <Ranking />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
