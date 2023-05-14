import './App.css';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import Header from './components/Header/Navbar';
import AppFooter from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import PrivateComponent from './components/Private Component/PrivateComponent';
import Login from './components/Login/Login';
import AddProduct from './components/Add Product/AddProduct';
import ProductList from './components/ProductList/ProductList';
import UpdateProduct from './components/Update Product /UpdateProduct';
function App() {
  return (
    <div className="App">
         <BrowserRouter>
         <Header/>
         <Routes>

         <Route element={<PrivateComponent/>}>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/add' element={<AddProduct/>}/>
          <Route path='/update/:id' element={<UpdateProduct/>}/>
          <Route path='/logout' element={<h3>Logout</h3>}/>
          <Route path='/profile' element={<h3>Profile component</h3>}/>
          </Route>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          

          <Route/>
          
         </Routes>
         </BrowserRouter>
         <AppFooter/>
    </div>
  );
}

export default App;
