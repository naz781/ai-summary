import { useState } from "react";

export default function Home() {
    const [content, setContent] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateSummary = async () => {
        try {
            setLoading(true);
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
                        content: "You are a helpful assistant. and you have to summarize the text provided by the user",
                    },
                    { role: "user", content: content },
                ],
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to generate summary");
            }

            const result = await response.json();
            const summary = result.choices[0].message.content;
            setSummary(summary);
        } catch (err) {
            setError("An error occurred while generating the summary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">SmartSummary</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Transform lengthy content into clear, concise summaries instantly – your key to saving time and staying informed!
                        </p>
                    </div>

                    <div className="p-2 w-full">
                        <div className="relative">
                            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Enter Text to Summarize:</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                id="message"
                                name="message"
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        <button
                            onClick={generateSummary}
                            disabled={loading}
                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                            {loading ? "Generating..." : "Summarize"}
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-center mt-4">
                            {error}
                        </div>
                    )}
                </div>
            </section>
            {summary && (
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Summary</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{summary}</p>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
} 