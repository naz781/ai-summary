import { useState } from "react";
import { FaExchangeAlt } from 'react-icons/fa';

export default function ParaphrasingTool() {
    const [content, setContent] = useState("");
    const [style, setStyle] = useState("simple");
    const [paraphrased, setParaphrased] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const styleOptions = [
        "simple",
        "academic",
        "creative",
        "concise",
        "elaborate"
    ];

    const paraphraseContent = async () => {
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
                        content: `You are a helpful assistant that paraphrases text in a ${style} style while maintaining the original meaning.`,
                    },
                    {
                        role: "user",
                        content: `Please paraphrase the following text in a ${style} style while keeping the same meaning: ${content}`
                    },
                ],
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to paraphrase content");
            }

            const result = await response.json();
            setParaphrased(result.choices[0].message.content);
        } catch (err) {
            setError("An error occurred while paraphrasing. Please try again.");
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
                            <FaExchangeAlt className="text-4xl text-indigo-500 mr-2" />
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">WordSmith</h1>
                        </div>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Master the art of expression with our advanced paraphrasing tool. Reshape your text with different styles while preserving its essence.
                        </p>
                    </div>

                    <div className="p-2 w-full">
                        <div className="relative mb-4">
                            <label htmlFor="style" className="leading-7 text-sm text-gray-600">Select Style:</label>
                            <select
                                id="style"
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            >
                                {styleOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative">
                            <label htmlFor="content" className="leading-7 text-sm text-gray-600">Enter Text to Paraphrase:</label>
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
                            onClick={paraphraseContent}
                            disabled={loading || !content}
                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50"
                        >
                            {loading ? "Paraphrasing..." : "Paraphrase"}
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-center mt-4">
                            {error}
                        </div>
                    )}
                </div>
            </section>
            {paraphrased && (
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Paraphrased Content</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base whitespace-pre-wrap">{paraphrased}</p>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
} 