import { useState } from "react";
import { FaFeather } from 'react-icons/fa';

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
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <div className="flex items-center justify-center mb-4">
                            <FaFeather className="text-4xl text-indigo-500 mr-2" />
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">ToneCraft Pro</h1>
                        </div>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Transform your writing's emotional resonance with AI-powered tone adjustment. Perfect for crafting the right message for any audience.
                        </p>
                    </div>

                    <div className="p-2 w-full">
                        <div className="relative mb-4">
                            <label htmlFor="tone" className="leading-7 text-sm text-gray-600">Select Tone:</label>
                            <select
                                id="tone"
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            >
                                {toneOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative">
                            <label htmlFor="content" className="leading-7 text-sm text-gray-600">Enter Text to Adjust:</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                id="content"
                                name="content"
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        <button
                            onClick={adjustTone}
                            disabled={loading || !content}
                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50"
                        >
                            {loading ? "Adjusting..." : "Adjust Tone"}
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-center mt-4">
                            {error}
                        </div>
                    )}
                </div>
            </section>
            {adjusted && (
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Adjusted Content</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base whitespace-pre-wrap">{adjusted}</p>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
} 