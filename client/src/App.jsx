
import './App.css'
import Content from './components/Content/Content'
import Header from './components/Header/Header'
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Layout from './Layout'
import Homepage from './components/pages/Homepage'
import { UserContextProvider } from './UserContext';
import Createpost from './components/pages/Createpost'
import PostPage from './components/pages/PostPage'
import EditPost from './components/pages/EditPost'



function App() {

  return (
   <UserContextProvider>
        <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element= { <Homepage/>}/>
              <Route path={'/login'} element ={<Login />}/>
              <Route  path={'/register'} element ={<Register />}/>
              <Route  path={'/create'} element ={<Createpost />}/>
              <Route  path={'/post/:id'} element={<PostPage/>}/>
              <Route  path={'/edit/:id'} element={<EditPost/>}/>
            </Route>
        </Routes>

   </UserContextProvider>
      
    
   
    
  )
}

export default App
