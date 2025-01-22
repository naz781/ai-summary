import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaMagic, FaExpandAlt, FaFeather, FaExchangeAlt, FaBrain } from 'react-icons/fa';

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    }

    return (
        <header className="text-gray-600 body-font bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 shadow-lg">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 group">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-lg transform group-hover:scale-105">
                        <FaBrain className="text-2xl text-white transform group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300">
                        AI Text Tools
                    </span>
                </Link>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/" className="mr-6 flex items-center px-3 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 group">
                        <FaMagic className="mr-2 text-indigo-500 group-hover:scale-110 transform transition-transform duration-200" />
                        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">Smart Summary</span>
                    </Link>
                    <Link to="/expand" className="mr-6 flex items-center px-3 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 group">
                        <FaExpandAlt className="mr-2 text-indigo-500 group-hover:scale-110 transform transition-transform duration-200" />
                        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">Content Enhancer</span>
                    </Link>
                    <Link to="/tone" className="mr-6 flex items-center px-3 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 group">
                        <FaFeather className="mr-2 text-indigo-500 group-hover:scale-110 transform transition-transform duration-200" />
                        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">ToneCraft Pro</span>
                    </Link>
                    <Link to="/paraphrase" className="mr-6 flex items-center px-3 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 group">
                        <FaExchangeAlt className="mr-2 text-indigo-500 group-hover:scale-110 transform transition-transform duration-200" />
                        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">WordSmith</span>
                    </Link>
                    <Link to="/contact" className="flex items-center px-3 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200">
                        <span className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">Contact</span>
                    </Link>
                </nav>
                {currentUser ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                            {currentUser.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 py-2 px-6 focus:outline-none hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 rounded-lg text-base transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="inline-flex items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 py-2 px-6 focus:outline-none hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 rounded-lg text-base transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
} 