import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinners from './components/Spinners';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import ApplyConsultant from './pages/ApplyConsultant';
import Notifications from './pages/Notifications';
import Consultants from './pages/admin/Consultants';
import Users from './pages/admin/Users';
import Profile from './pages/consultants/Profile';
import Booking from './pages/Booking';
import Appointments from './pages/Appointments';
import ConsultantAppointments from './pages/consultants/ConsultantAppointments';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? <Spinners /> :
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/apply-consultant'
              element={
                <ProtectedRoutes>
                  <ApplyConsultant />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/admin/consultants'
              element={
                <ProtectedRoutes>
                  <Consultants />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/admin/users'
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/consultants/profile/:id'
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/consultants/book-consultant/:consultantId'
              element={
                <ProtectedRoutes>
                  <Booking />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/notifications'
              element={
                <ProtectedRoutes>
                  <Notifications />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/appointments'
              element={
                <ProtectedRoutes>
                  <Appointments />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/consultant/appointments'
              element={
                <ProtectedRoutes>
                  <ConsultantAppointments />
                </ProtectedRoutes>
              }
            />
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        }
      </BrowserRouter>
    </>
  );
}

export default App;
