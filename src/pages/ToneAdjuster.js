import { useState } from "react";
import { FaFeather } from 'react-icons/fa';
import '../styles/textbox.css';

export default function ToneAdjuster() {
    const [content, setContent] = useState("");
    const [tone, setTone] = useState("professional");
    const [adjusted, setAdjusted] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const toneOptions = [
        "professional",
        "casual",
        "friendly",
        "formal",
        "enthusiastic",
        "confident",
        "empathetic"
    ];

    const adjustTone = async () => {
        try {
            setLoading(true);
            setError("");
            const apiUrl = process.env.REACT_APP_API_URL;
            const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            };
            const data = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful assistant that adjusts the tone of text to be more ${tone} while maintaining the original message.`,
                    },
                    {
                        role: "user",
                        content: `Please rewrite the following text in a ${tone} tone while keeping the same meaning: ${content}`
                    },
                ],
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to adjust tone");
            }

            const result = await response.json();
            setAdjusted(result.choices[0].message.content);
        } catch (err) {
            setError("An error occurred while adjusting the tone. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-12 mx-auto">
                    <div className="flex flex-col text-center w-full mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <FaFeather className="text-4xl text-indigo-500 mr-2" />
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">ToneCraft Pro</h1>
                        </div>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600">
                            Transform your writing's emotional resonance with AI-powered tone adjustment. Perfect for crafting the right message for any audience.
                        </p>
                    </div>

                    <div className="content-container max-w-4xl mx-auto">
                        <div className="mb-8">
                            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">Select Tone:</label>
                            <div className="select-glow">
                                <select
                                    id="tone"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    className="enhanced-select"
                                >
                                    {toneOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-8">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Enter Text to Adjust:</label>
                            <div className="textbox-glow">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    id="content"
                                    name="content"
                                    className="enhanced-textbox"
                                    placeholder="Paste your text here..."
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={adjustTone}
                                disabled={loading || !content}
                                className="inline-flex items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 py-3 px-8 focus:outline-none hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 rounded-lg text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adjusting...
                                    </>
                                ) : "Adjust Tone"}
                            </button>
                        </div>
                        {error && (
                            <div className="text-red-500 text-center mt-4">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {adjusted && (
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-12 mx-auto">
                        <div className="content-container max-w-4xl mx-auto">
                            <h2 className="text-2xl font-medium text-gray-900 mb-4 text-center">Adjusted Content</h2>
                            <div className="textbox-glow">
                                <div className="enhanced-textbox whitespace-pre-wrap">
                                    {adjusted}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
} 