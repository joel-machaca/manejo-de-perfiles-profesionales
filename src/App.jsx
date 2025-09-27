import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './components/login/AuthPage'
import ProfilePublic from './components/profilePublic/ProfilePublic'
import CreateProfile from './components/profiles/CreateProfile'
import PageMain from './components/profiles_main/PageMain'
import Register from './components/register/Register'
import Navbar from './components/Navbar'
import UserProvider from './Context/UserContext'




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
        <Route path={'/profilePublic/:id'} element={<ProfilePublic/>}/>
      </Routes>
      </BrowserRouter>
    </UserProvider>

      
      
      
  )
}

export default App
