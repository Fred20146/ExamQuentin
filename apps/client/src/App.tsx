

import './App.css'
import { Route, Routes } from "react-router-dom";
import Users from './pages/Users';
import Todoss from "./pages/Todo";



function App() {
  

  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/todo" element={<Todoss/>} />
      
    </Routes>
  )
}

export default App
