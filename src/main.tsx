import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TablaUsuarios } from './SearchNamesApi.tsx'
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/**<App />*/}
    <TablaUsuarios />
  </StrictMode>,
)
