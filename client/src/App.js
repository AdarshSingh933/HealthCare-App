import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const router = createBrowserRouter([
    {path:"/",element:<HomePage />},
    {path:"/login",element:<Login />},
    {path:"/register",element:<Register />}
  ])
  return (
    <>
    <div className='app'>
     <RouterProvider router={router} />
     </div>
    </>
  );
}

export default App;
