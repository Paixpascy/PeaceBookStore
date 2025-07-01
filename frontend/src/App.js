
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


function App() {
  return (
  <>
  <BrowserRouter>
  <Toaster position='top-center'/>
  <Routes>
    {/*users routes */}
    <Route path='/' element={<Home/>}/>
    <Route path='/books' element={<Books/>}/>
    <Route path='/bookdetails/:bkid' element={<Bookdetails/>}/>
    <Route path='/children' element={<Bookscategories category='Children'/>}/>
    <Route path='/faith' element={<Bookscategories category='Faith'/>}/>
    <Route path='/history' element={<Bookscategories category='History'/>}/>
    <Route path='/poems' element={<Bookscategories category='Poems'/>}/>
    <Route path='/cookbooks' element={<Bookscategories category='Cookbooks'/>}/>

    {/*shared routes */}
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    
    {/*admin routes */}
    <Route path='/admin' element={<Protectedroute><Adminlinks/></Protectedroute>}/>
    <Route path='/addbook' element={<Protectedroute><Addbook/></Protectedroute>}/>
    <Route path='/booklist' element={<Protectedroute><Booklist/></Protectedroute>}/>
    <Route path='/editbook/:id' element={<Protectedroute><Editbook/></Protectedroute>}/>
    <Route path='/users/:id' element={<Protectedroute><Users/></Protectedroute>}/>
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
