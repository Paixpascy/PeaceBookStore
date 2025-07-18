
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Addbook from './pages/adminpages/addbook/Addbook';
import Booklist from './pages/adminpages/bookList/Booklist';
import Editbook from './pages/adminpages/editBook/Editbook';
import Users from './pages/adminpages/users/Users';
import Adminlinks from './routes/adminroutes/Adminlinks';
import Register from './routes/authroutes/Register';
import Login from './routes/authroutes/Login';
import Home from './pages/userpages/home/Home';
import Books from './pages/userpages/stoke/Books';
import Bookscategories from './pages/userpages/stoke/Bookscategories';
import Protectedroute from './routes/authroutes/Protectedroute';
import Bookdetails from './pages/userpages/stoke/Bookdetails';
import Cart from './pages/userpages/cart/Cart';
import Myorders from './pages/userpages/orders/Myorders';
import Placeorder from './pages/userpages/orders/Placeorder';
import Ordersmade from './pages/adminpages/ordersMade/Ordersmade';
import Account from './routes/account/Account';
import Verify from './pages/userpages/orders/Verify';
import Userlinks from './routes/userroutes/Userlinks';
import Profile from './routes/account/Profile';
import Editprofile from './routes/account/Editprofile';
import Footer from './routes/footer/Footer';
import Navbar from './routes/navigation/Navbar';
import Searched from './pages/userpages/Searched/Searched';
import Arrivals from './pages/userpages/stoke/Arrivals';
import Adminhome from './pages/adminpages/adminhome/Adminhome';


function App() {
  return (
  <>
  
  <BrowserRouter>
  <Navbar/>
  <Toaster position='top-center'/>
  <Routes>
    {/*users routes */}
    <Route path='/' element={<Home/>}/>
    <Route path='/userlinks' element={<Userlinks/>}/>
    <Route path='/books' element={<Books/>}/>
    <Route path='/bookdetails/:bkid' element={<Bookdetails/>}/>
    <Route path='/children' element={<Bookscategories category='Children'/>}/>
    <Route path='/faith' element={<Bookscategories category='Faith'/>}/>
    <Route path='/history' element={<Bookscategories category='History'/>}/>
    <Route path='/poems' element={<Bookscategories category='Poems'/>}/>
    <Route path='/cookbooks' element={<Bookscategories category='Cookbooks'/>}/>
    <Route path='/arrivals' element={<Arrivals/>}/>
    <Route path='/cart'element={<Cart/>}/>
    <Route path='/placeorder' element={<Placeorder/>}/>
    <Route path='/myorders'element={<Myorders/>}/>
    <Route path='/verify' element={<Verify/>}/>
    <Route path='/search' element={<Searched/>}/>

    {/*shared routes */}
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/account'element={<Account/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/edtiprofile' element={<Editprofile/>}/>
    
    {/*admin routes */}
    <Route path='/admin' element={<Protectedroute><Adminlinks/></Protectedroute>}/>
    <Route path='/adminhome' element={<Adminhome/>}/>
    <Route path='/addbook' element={<Protectedroute><Addbook/></Protectedroute>}/>
    <Route path='/booklist' element={<Protectedroute><Booklist/></Protectedroute>}/>
    <Route path='/editbook/:id' element={<Protectedroute><Editbook/></Protectedroute>}/>
    <Route path='/users/:id' element={<Protectedroute><Users/></Protectedroute>}/>
    <Route path='/ordersmade' element={<Protectedroute><Ordersmade/></Protectedroute>}/>
  </Routes>
  </BrowserRouter>
  <hr/>
  <Footer/>
  </>
  );
}

export default App;
