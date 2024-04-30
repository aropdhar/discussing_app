import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Error from "./pages/error/Error";
import Rootlayout from "./component/layout/Rootlayout";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Message from "./pages/message/Message";
import Notification from "./pages/notification/Notification";
import Settings from "./pages/setting/Settings";


function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route element={<Rootlayout/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/message' element={<Message/>}/>
            <Route path='/notification' element={<Notification/>}/>
            <Route path='/setting' element={<Settings/>}/>
          </Route>
            <Route path='*' element={<Error/>}/>
            <Route path='/' element={<Login/>}/>
            <Route path='/registration' element={<Register/>}/>
      </Route>
       
    )
  );

  return (<RouterProvider router={router}/>)
}

export default App
