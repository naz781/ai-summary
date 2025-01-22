import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const { login, googleSignIn, resetPassword } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        try {
            setError('');
            setLoading(true);
            await googleSignIn();
            navigate('/');
        } catch (err) {
            setError('Failed to sign in with Google.');
        } finally {
            setLoading(false);
        }
    }

    async function handleResetPassword() {
        try {
            if (!email) {
                return setError('Please enter your email address');
            }
            setError('');
            setLoading(true);
            await resetPassword(email);
            setResetSent(true);
        } catch (err) {
            setError('Failed to send password reset email.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Login</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Sign in to access your account.</p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    {error && (
                        <div className="mb-4 text-red-500 text-center">
                            {error}
                        </div>
                    )}
                    {resetSent && (
                        <div className="mb-4 text-green-500 text-center">
                            Password reset email sent! Check your inbox.
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </div>
                        <div className="p-2 w-full">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="flex mx-auto items-center justify-center space-x-2 bg-white border border-gray-300 py-2 px-8 focus:outline-none hover:bg-gray-50 rounded text-lg w-full max-w-md"
                            >
                                <FcGoogle className="text-2xl" />
                                <span>Sign in with Google</span>
                            </button>
                        </div>
                        <div className="p-2 w-full text-center space-y-2">
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="text-indigo-500 hover:text-indigo-600"
                            >
                                Forgot Password?
                            </button>
                            <p>Need an account? <Link to="/register" className="text-indigo-500 hover:text-indigo-600">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
} 