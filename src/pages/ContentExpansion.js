import { useState } from "react";
import { FaExpandAlt } from 'react-icons/fa';

export default function ContentExpansion() {
    const [content, setContent] = useState("");
    const [expanded, setExpanded] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const expandContent = async () => {
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
                        content: "You are a helpful assistant that expands text content while maintaining its original meaning and adding relevant details and examples.",
                    },
                    {
                        role: "user",
                        content: `Please expand the following text while maintaining its core message and adding relevant details and examples: ${content}`
                    },
                ],
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to expand content");
            }

            const result = await response.json();
            setExpanded(result.choices[0].message.content);
        } catch (err) {
            setError("An error occurred while expanding the content. Please try again.");
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
                            <FaExpandAlt className="text-4xl text-indigo-500 mr-2" />
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Content Enhancer</h1>
                        </div>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Elevate your writing with AI-powered content expansion. Turn concise ideas into rich, detailed narratives while maintaining your original message.
                        </p>
                    </div>

                    <div className="p-2 w-full">
                        <div className="relative">
                            <label htmlFor="content" className="leading-7 text-sm text-gray-600">Enter Text to Expand:</label>
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
                            onClick={expandContent}
                            disabled={loading || !content}
                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50"
                        >
                            {loading ? "Expanding..." : "Expand"}
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-center mt-4">
                            {error}
                        </div>
                    )}
                </div>
            </section>
            {expanded && (
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Expanded Content</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base whitespace-pre-wrap">{expanded}</p>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
} 