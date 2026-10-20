import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import UserDirectory from './pages/UserDirectory';
import UserProfile from './pages/UserProfile';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/AdminPanel';

function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0); }, [pathname]); return null; }
function Layout() { return <><ScrollToTop/><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/users" element={<UserDirectory/>}/><Route path="/users/:id" element={<UserProfile/>}/><Route path="/login" element={<Login/>}/><Route path="/add-post" element={<ProtectedRoute><AddPost/></ProtectedRoute>}/><Route path="/admin" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>}/><Route path="*" element={<NotFound/>}/></Routes><footer className="site-footer"><span>© 2025 DevDirectory</span><span>Made for people who build things <i>✳</i></span><Link to="/users">The directory ↗</Link></footer></>; }
import { Link } from 'react-router-dom';
export default function App() { return <AuthProvider><BrowserRouter><Layout/></BrowserRouter></AuthProvider>; }
