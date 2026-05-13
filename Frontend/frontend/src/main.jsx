import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './component/Style_component/Style_footer.css'
import './component/Style_component/Style_body_accueil.css'
import './component/Style_component/Style_testPage.css'
import './component/Style_component/Style_navbar.css'
import './component/Style_component/UserMenu.css'
import './component/Style_component/PatientDashboard.css'
import './component/Style_component/DiagnosticDetail.css'
import './component/Style_component/AboutPage.css'
import './component/Style_component/Style_Dashboard_Admin/AdminDashboard.css'
import './component/Style_component/Style_Dashboard_Admin/EditProfile.css'
import './component/Style_component/Style_Dashboard_Admin/AnalyticsPage.css'
import './component/Style_component/Style_loading.css'
import './component/Style_component/ContactPage.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
