import BloList from "./Components/BlogList";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blogpost from "./Components/Blogpost";
import AccountPage from "./Components/AcountPage";
import BlogsById from "./Components/BlogsById";
import AdminPanel from "./Components/AdminPanel";
import ViewBlog from "./Components/ViewBlog";
import UpdateBlogsById from "./Components/UpdateBlogsById";
import Contact from "./Components/Contact";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<BloList />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/post-blogs" element={<Blogpost />} />
          <Route path="/account/user" element={<AccountPage />} />
          <Route path="/your-blogs" element={<BlogsById />} />
          <Route path="/adminDashboard" element={<AdminPanel />} />
          <Route path="/userprofile/:id" element={<UserProfile/>} />
          <Route path="/view-blog/:id" element = {<ViewBlog/>} />
          <Route path="/update/:id" element={<UpdateBlogsById />} />
          <Route path="/contact-us" element={<Contact/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
