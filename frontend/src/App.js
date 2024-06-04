
import './App.css';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from './Components/Header/Header';
import Login from './Login/Login';
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Home from './Home/Home';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import Register from './Components/Register/Register';
import UpdateProfile from './Components/updateProfile/updateProfile';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import RestorePassword from './Components/RestorePassword/RestorePassword';
import UserProfile from './Components/userProfile/UserProfile';
import Search from './Components/SearchUser/Search';
import NotFound from './Components/NotFound/NotFound';
function App() {
   const dispatch=useDispatch();
   useEffect(() => {
      dispatch(loadUser());
   },[dispatch]); 
   const {isAuthenticated}=useSelector((state)=>state.user)
  return (
    
     <Router> 
      {isAuthenticated && <Header/> }
     
      <Routes>
        
   <Route path="/" element={isAuthenticated?<Home/>:<Login/>}/>
   <Route path="/account" element={isAuthenticated?<Account/>:<Login/>}/>
   <Route path="/user/:id" element={isAuthenticated?<UserProfile/>:<Login/>}/>
   <Route path="/newpost" element={isAuthenticated?<NewPost/>:<Login/>}/>
   <Route path="/update/profile" element={isAuthenticated?<UpdateProfile/>:<Login/>}/>
   <Route path="/update/password" element={isAuthenticated?<ResetPassword/>:<Login/>}/>
   <Route path="/forgot/password" element={isAuthenticated?<ResetPassword/>:<ForgotPassword/>}/>
   { <Route path="/password/reset/:token" element={isAuthenticated?<ResetPassword/>:<RestorePassword/>}/>/*resetpassword is actually working as update password */}
   <Route path="/register" element={isAuthenticated?<Account/>:<Register/>}/>
   <Route path="/search" element={isAuthenticated?<Search/>:<Home/>}/>
   <Route path="*" element={<NotFound/>}/>
      </Routes>
     </Router>
    
  );
}

export default App;
