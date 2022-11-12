 import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
 import Homes from "./pages/Homes"
 import ForgotPassword from "./pages/ForgotPassword"
 import Offer from "./pages/Offer"
 import Profile from "./pages/Profile"
 import SignIn from "./pages/SignIn"
 import SignUp from "./pages/SignUp"
import Header from "./components/Header"


function App() {
  return (
    <div>
       <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Homes/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/sign-in" element={<SignIn/>}></Route>
            <Route path="/sign-up" element={<SignUp/>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            <Route path="/offers" element={<Offer/>}></Route>
          </Routes>
       </Router>
    </div>
  );
}

export default App;
