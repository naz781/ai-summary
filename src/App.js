// import './global.css'; // Import global styles
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import PrivateRoute from './components/PrivateRoute';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import ContentExpansion from './pages/ContentExpansion';
// import ToneAdjuster from './pages/ToneAdjuster';
// import ParaphrasingTool from './pages/ParaphrasingTool';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Register from './pages/Register';

// export default function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen flex flex-col">
//           <Navbar />
//           <main className="flex-grow">
//             <Routes>
//               {/* Public routes */}
//               <Route path="/login" element={
//                 <PublicRoute>
//                   <Login />
//                 </PublicRoute>
//               } />
//               <Route path="/register" element={
//                 <PublicRoute>
//                   <Register />
//                 </PublicRoute>
//               } />

//               {/* Protected routes */}
//               <Route path="/" element={
//                 <PrivateRoute>
//                   <Home />
//                 </PrivateRoute>
//               } />
//               <Route path="/expand" element={
//                 <PrivateRoute>
//                   <ContentExpansion />
//                 </PrivateRoute>
//               } />
//               <Route path="/tone" element={
//                 <PrivateRoute>
//                   <ToneAdjuster />
//                 </PrivateRoute>
//               } />
//               <Route path="/paraphrase" element={
//                 <PrivateRoute>
//                   <ParaphrasingTool />
//                 </PrivateRoute>
//               } />
//               <Route path="/contact" element={
//                 <PrivateRoute>
//                   <Contact />
//                 </PrivateRoute>
//               } />

//               {/* Catch all route */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }
// function ProtectedHome() {
//   const { currentUser } = useAuth();
//   return !currentUser ? <Navigate to="/landing" replace /> : <PrivateRoute><Home /></PrivateRoute>;
// }
// // Public route component
// function PublicRoute({ children }) {
//   const { currentUser } = useAuth();
//   return !currentUser ? children : <Navigate to="/" />;
// }
import './global.css'; // Import global styles
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import ContentExpansion from './pages/ContentExpansion';
import ToneAdjuster from './pages/ToneAdjuster';
import ParaphrasingTool from './pages/ParaphrasingTool';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Landing page */}
              <Route path="/landing" element={<LandingPage />} />

              {/* Public routes */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />

              {/* Protected routes */}
              <Route path="/" element={<ProtectedHome />} />
              <Route path="/expand" element={
                <PrivateRoute>
                  <ContentExpansion />
                </PrivateRoute>
              } />
              <Route path="/tone" element={
                <PrivateRoute>
                  <ToneAdjuster />
                </PrivateRoute>
              } />
              <Route path="/paraphrase" element={
                <PrivateRoute>
                  <ParaphrasingTool />
                </PrivateRoute>
              } />
              <Route path="/contact" element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              } />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Show landing page if not logged in, else Home
function ProtectedHome() {
  const { currentUser } = useAuth();
  return !currentUser ? <Navigate to="/landing" replace /> : <PrivateRoute><Home /></PrivateRoute>;
}

// Public route component
function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/" replace />;
}
