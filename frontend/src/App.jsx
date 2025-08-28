import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.jsx';
import HomePage from './pages/home/HomePage.jsx';
import SignUpPage from './pages/signup/SignUpPage.jsx'
import NotificationPage from './pages/notification/NotificationPage.jsx'
import ProfilePage from './pages/Profile/ProfilePage.jsx'

import Sidebar from './components/common/Sidebar.jsx';
import RightPanel from './components/common/RightPanel.jsx';

function App() {

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* Common component, bc it's not wrapped with Routes */}
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/notifications' element={<NotificationPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  );

}

export default App
