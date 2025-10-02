import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AuthPage from './components/login/AuthPage'
import ProfilePublic from './components/profilePublic/ProfilePublic'
import CreateProfile from './components/profiles/CreateProfile'
import PageMain from './components/profiles_main/PageMain'
import Register from './components/register/Register'
import Navbar from './components/Navbar'
import UserProvider from './Context/UserContext'
import EditProfile from './components/editProfile/EditProfile'





function App() {


  return (
    <UserProvider>

    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<PageMain/>}/>
        <Route path={'/login'} element={<AuthPage/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/createProfile'} element={<CreateProfile/>}/>
        <Route path={'/editProfile'} element={<EditProfile/>}/>
        <Route path={'/profilePublic/:id'} element={<ProfilePublic/>}/>
      </Routes>
      <ToastContainer/>
      </BrowserRouter>
    </UserProvider>

      
      
      
  )
}

export default App
