import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./src/contexts/AuthContext";
import { EditProvider } from "./src/contexts/EditContext";
import { ContentProvider } from "./src/contexts/ContentContext";
import { Toaster } from "./components/ui/sonner";
import { DevelopmentIndicator } from "./components/DevelopmentIndicator";

// Import page components
import HomePage from "./src/app/page";
import AdminLoginPage from "./src/app/admin/login/page";
import AdminRegisterPage from "./src/app/admin/register/page";
import AdminForgotPasswordPage from "./src/app/admin/forgot-password/page";

// Import CSS
import "./styles/globals.css";

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <EditProvider>
          <Router>
            <Routes>
              {/* Main landing page - with inline editing when logged in */}
              <Route path="/" element={<HomePage />} />
              
              {/* Authentication routes */}
              <Route path="/login" element={<AdminLoginPage />} />
              <Route path="/register" element={<AdminRegisterPage />} />
              <Route path="/forgot-password" element={<AdminForgotPasswordPage />} />
              
              {/* Legacy admin routes - redirect to home */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/register" element={<AdminRegisterPage />} />
              <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
              
              {/* Fallback for any other routes */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Router>
          <Toaster />
          <DevelopmentIndicator />
        </EditProvider>
      </ContentProvider>
    </AuthProvider>
  );
}