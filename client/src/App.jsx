
import './App.css'
import Content from './components/Content/Content'
import Header from './components/Header/Header'
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Layout from './Layout'
import Homepage from './components/pages/Homepage'
import { UserContextProvider } from './UserContext';



function App() {

  return (
   <UserContextProvider>
        <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element= { <Homepage/>}/>
              <Route path={'/login'} element ={<Login />}/>
              <Route  path={'/register'} element ={<Register />}/>
            </Route>
        </Routes>

   </UserContextProvider>
      
    
   
    
  )
}

export default App
