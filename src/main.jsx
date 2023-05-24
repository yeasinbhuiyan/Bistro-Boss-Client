import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import router from './router/router';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <HelmetProvider>

      <div className='max-w-5xl mx-auto'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </HelmetProvider>
  </React.StrictMode>,
)
