import Login from "./pages/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/accueil.jsx";
import Test_D from "./pages/test_d.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AdminDashboard from "./pages/Dashboard_Admin/AdminDashboard.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Analyses from "./pages/Dashboard_Admin/Patients_DA/AnalyticsPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/" element={<Accueil />} />
                <Route path="/Test" element={<Test_D />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <PatientDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/about" element={<AboutPage />} />
                <Route
                    path="/dash" element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                } />
                <Route
                    path="/edite" element={
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                } />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                    path="/analyses" element={
                        <ProtectedRoute>
                            <Analyses />
                        </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;