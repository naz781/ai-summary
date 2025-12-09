import { Link } from 'react-router-dom';


export default function LandingPage() {
    return (
        <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center">
            <div className="container mx-auto px-5 lg:px-20 flex flex-col-reverse lg:flex-row items-center">

                {/* Left side: Text */}
                <div className="w-full max-w-lg mx-auto text-left mt-18">
                    {/* Heading aligned with paragraph */}
                    <h1 className="text-4xl sm:text-5xl text-left font-bold text-white mb-4">
                        AI Text Tools
                    </h1>
                    <h2
                        className="text-xl sm:text-2xl font-semibold text-gray-100 typewriter mb-4"
                        style={{ "--chars": "38" }}
                    >
                        Boost your writing effortlessly!
                    </h2>
                    {/* Paragraphs */}
                    <div className="text-lg sm:text-xl text-gray-300 mb-6 space-y-2">
                        <p className='text-gray-200'>
                            Transform your text with precision—enhance clarity, style, and impact instantly.
                        </p>
                        <p>
                            Save time, communicate smarter, and craft content that truly resonates!
                        </p>
                    </div>
                    {/* Small login button aligned left */}
                    <Link
                        to="/login"
                        className="inline-block bg-white text-indigo-600 font-semibold py-2 px-6 rounded-lg shadow hover:bg-gray-100 transition-all duration-300 text-left"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Right side: Bot Image */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-16 lg:mb-0">
                    <img
                        src="/IntelliCap1.jpg"
                        alt="AI Bot"
                        className="w-72 sm:w-80 lg:w-96 rounded-2xl shadow-2xl"
                    />
                </div>

            </div>
        </section>
    );
}
