
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


function App() {
  return (
  <>
  <BrowserRouter>
  <Toaster position='top-center'/>
  <Routes>

    {/*shared routes */}
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    
    {/*admin routes */}
    <Route path='/' element={<Adminlinks/>}/>
    <Route path='/addbook' element={<Addbook/>}/>
    <Route path='/booklist' element={<Booklist/>}/>
    <Route path='/editbook/:id' element={<Editbook/>}/>
    <Route path='/users/:id' element={<Users/>}/>
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
