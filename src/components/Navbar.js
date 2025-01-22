import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaMagic, FaExpandAlt, FaFeather, FaExchangeAlt } from 'react-icons/fa';

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
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <span className="ml-3 text-xl">AI-Summary</span>
                </Link>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/" className="mr-5 hover:text-gray-900 flex items-center">
                        <FaMagic className="mr-1" />
                        Smart Summary
                    </Link>
                    <Link to="/expand" className="mr-5 hover:text-gray-900 flex items-center">
                        <FaExpandAlt className="mr-1" />
                        Content Enhancer
                    </Link>
                    <Link to="/tone" className="mr-5 hover:text-gray-900 flex items-center">
                        <FaFeather className="mr-1" />
                        ToneCraft Pro
                    </Link>
                    <Link to="/paraphrase" className="mr-5 hover:text-gray-900 flex items-center">
                        <FaExchangeAlt className="mr-1" />
                        WordSmith
                    </Link>
                    <Link to="/contact" className="mr-5 hover:text-gray-900">Contact</Link>
                </nav>
                {currentUser ? (
                    <div className="flex items-center">
                        <span className="mr-4 text-sm">{currentUser.email}</span>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
} 