import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from './components/Footer';
import { useEffect } from 'react';
import Details from './components/Details';
import { getRestaurants } from './redux/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddRestaurant from './components/AddRestaurant';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import Users from './components/Users';
import User from './components/User';
import instance from './axios';


function App() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("isatheticated-->", isAuthenticated);

  useEffect(()=> {
    // componentDidMount()

    // fetch("/restaurants.json")
    // .then((data) => data.json())
    // .then((res) => dispatch(getRestaurants(res.restaurants)));

    const fetchRestaurants = async ()=>{
      try {
        const res = await instance.get('/api/v1/restaurants')

        if (res.data.success) {
          dispatch(getRestaurants(res.data.restaurants));
        }else{
          console.log(res.data.message);
        }

      } catch (error) {
        console.log(error.message);
      }
    }

    // return ("") // componentWillUnmount()
    fetchRestaurants();


  }, [dispatch]); // dependancy array --> componentDidUpdate()

  

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />

        {/* Protected Routes */}
        <Route path='/contact' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <Contact/> </ProtectedRoute>} />
        <Route path='/details/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <Details/> </ProtectedRoute>} />
        <Route path='/add' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <AddRestaurant/> </ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <Users/> </ProtectedRoute>} />
        <Route path='/user/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <User/> </ProtectedRoute>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
