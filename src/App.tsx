import { useRef, useState, useEffect, useMemo } from "react";
import { ArrowRight, Smartphone, Layers, Globe2, Download, Eye, Info } from "lucide-react";
import { questions } from "./data/questions";
import type { Strategy, StrategyType } from "./types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import Confetti from "react-canvas-confetti/dist/presets/realistic";
import { TConductorInstance, TPresetInstanceProps } from "react-canvas-confetti/dist/types";
import { firstLetterLowerCase } from "./lib/utils";

const tips: Record<StrategyType, string[]> = {
    native: [
        "Take advantage of native capabilities to deliver the best user experience",
        "Follow platform guidelines to ensure better user satisfaction",
    ],
    crossPlatform: [
        "Ensure consistent UI/UX across all platforms to gain users trust",
        "Test on real devices as emulators miss platform-specific bugs",
    ],
    webApp: [
        "63% browse on mobile so focus on mobile first design",
        "Use Service Workers for offline capabilities",
        "Fast load times can improve retention rates and SEO",
    ],
};

function App() {
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
    const confettiRef = useRef<TConductorInstance | null>(null);
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [doubleWeightQuestions, setDoubleWeightQuestions] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    // Set initial selected strategy when showing results
    useEffect(() => {
        if (showResults) {
            const scores = calculateScores().sort((a, b) => b.score - a.score);
            setSelectedStrategy(scores[0]);
        }
    }, [showResults]);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (deferredPrompt as any).prompt();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (deferredPrompt as any).userChoice.then(() => {
                setDeferredPrompt(null);
            });
        }
    };

    const calculateScores = (): Strategy[] => {
        const totalWeights = questions.reduce((sum, question) => sum + (doubleWeightQuestions[question.id] ? 16 : 8), 0);
        const strategies: StrategyType[] = ["native", "crossPlatform", "webApp"];

        return strategies.map((strategy) => {
            const score =
                (Object.entries(answers).reduce((sum, [questionId, optionIndex]) => {
                    const question = questions.find((q) => q.id === questionId);
                    if (!question) return sum;
                    const weightFactor = doubleWeightQuestions[questionId] ? 2 : 1;
                    return sum + question.options[optionIndex].scores[strategy] * weightFactor;
                }, 0) /
                    totalWeights) *
                100;

            const criticalAnswers = Object.entries(answers)
                .map(([questionId, optionIndex]) => {
                    const question = questions.find((q) => q.id === questionId);
                    if (!question) return null;
                    return {
                        question: question.text,
                        answer: question.options[optionIndex].text,
                        reasoning: question.explanation,
                    };
                })
                .filter((answer): answer is { question: string; answer: string; reasoning: string } => answer !== null);

            return {
                name: strategy === "native" ? "Native" : strategy === "crossPlatform" ? "Cross-Platform" : "Web App",
                score: Math.round(score),
                criticalAnswers,
                criticalQuestions: criticalAnswers.map((answer) => answer?.question || ""),
            };
        });
    };

    const { warningCount, criticalCount } = useMemo(() => {
        if (!selectedStrategy) return { warningCount: 0, criticalCount: 0 };

        const strategyKey = firstLetterLowerCase(selectedStrategy.name.replace("-", "").replace(" ", "")) as "native" | "crossPlatform" | "webApp";
        console.log({ strategyKey });
        let warnings = 0;
        let criticals = 0;

        Object.entries(answers).forEach(([questionId, optionIndex]) => {
            const question = questions.find((q) => q.id === questionId);
            if (question) {
                const score = question.options[optionIndex].scores[strategyKey];
                console.log(score);
                if (score === 0) criticals++;
                else if (score === 1) warnings++;
            }
        });

        return { warningCount: warnings, criticalCount: criticals };
    }, [selectedStrategy, answers]);

    const handleAnswer = (optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questions[currentQuestion].id]: optionIndex,
        }));

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setShowResults(true);
            triggerConfetti();
        }
    };

    const handleDoubleWeightToggle = () => {
        setDoubleWeightQuestions((prev) => ({
            ...prev,
            [questions[currentQuestion].id]: !prev[questions[currentQuestion].id],
        }));
    };

    const handleReset = () => {
        setStarted(false);
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
        setSelectedStrategy(null);
    };

    const triggerConfetti = () => {
        confettiRef.current?.shoot();
    };

    const handleConfettiInit: TPresetInstanceProps["onInit"] = ({ conductor }) => {
        confettiRef.current = conductor;

        setTimeout(() => {
            triggerConfetti();
        }, 500);
    };

    const handleDownloadThesis = () => {
        const link = document.createElement("a");
        link.href = `Bachelor_Arbeit.pdf`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const currentQuestionData = questions[currentQuestion];

    if (!started) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-0 md:p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-none md:rounded-xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">Mobile Development Advisor</h1>

                        <div className={`mb-8 grid ${deferredPrompt ? "grid-cols-2 gap-3" : "grid-cols-1"}`}>
                            {deferredPrompt && (
                                <button
                                    onClick={handleInstallClick}
                                    className="w-full flex items-center justify-center bg-slate-900 font-bold text-white py-3 rounded-lg hover:bg-slate-800 transition-colors mt-4">
                                    <Download className="w-4 h-4 mr-2" />
                                    Install App
                                </button>
                            )}
                            <button
                                onClick={handleDownloadThesis}
                                className="w-full flex items-center justify-center border border-slate-950 font-bold py-3 rounded-lg hover:bg-slate-50 transition-colors mt-4">
                                <Eye className="w-4 h-4 mr-2" />
                                View Thesis
                            </button>
                        </div>

                        <p className="text-gray-600 mb-8">
                            Answer a few questions about your mobile app requirements, and we'll help you determine the best development strategy
                            between the available options <br></br> based on the research and findings from my bachelor thesis.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="p-6 rounded-lg border-gray-200 text-center">
                                <Smartphone className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-800">Native</h3>
                                <p className="text-sm text-gray-600 mt-2">Platform-specific development</p>
                            </div>
                            <div className="p-6 rounded-lg border-gray-200 text-center">
                                <Layers className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-800">Cross-Platform</h3>
                                <p className="text-sm text-gray-600 mt-2">Single codebase, multiple platforms</p>
                            </div>
                            <div className="p-6 rounded-lg border-gray-200 text-center">
                                <Globe2 className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-800">Web App</h3>
                                <p className="text-sm text-gray-600 mt-2">Browser-based solution</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setStarted(true)}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                            Start Assessment
                        </button>
                        {/*  put a divider here */}
                        <div className="border-t border-gray-200 my-6"></div>
                        {/* Put a link to github and impressum here */}
                        <div className="text-center font-bold text-sm text-slate-500">
                            <a href="/impressum.html">Impressum</a> - <a href="https://github.com/BenniBM/AppDecide">Github Project</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-0 md:p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-none md:rounded-xl min-h-screen md:min-h-full shadow-lg p-8">
                    {!showResults ? (
                        <>
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>
                                            Question {currentQuestion} of {questions.length}
                                        </span>
                                        <span>{Math.round((currentQuestion / questions.length) * 100)}% Complete</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}></div>
                                    </div>
                                </div>

                                <h2 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestionData.text}</h2>

                                <div className="space-y-3">
                                    {currentQuestionData.options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(index)}
                                            className="w-full text-left p-4 rounded-lg border border-gray-200 transition-all duration-200 flex items-center justify-between group">
                                            <span>{option.text}</span>
                                            <ArrowRight className="w-5 h-5 text-gray-400 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6">
                            <Confetti onInit={handleConfettiInit} width={window.innerWidth} height={window.innerHeight}></Confetti>
                            <h2 className="text-2xl font-semibold text-gray-800 !mt-0">Recommended Development Strategies</h2>
                            {calculateScores()
                                .sort((a, b) => b.score - a.score)
                                .map((strategy, index) => (
                                    <div
                                        key={index}
                                        className={`p-5 pt-4 rounded-lg border space-y-4 cursor-pointer transition-all ${
                                            selectedStrategy?.name === strategy.name
                                                ? "border-indigo-600 bg-indigo-50"
                                                : "border-gray-200 hover:border-indigo-300"
                                        }`}
                                        onClick={() => setSelectedStrategy(strategy)}>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium text-gray-800">{strategy.name}</h3>
                                            <span className="text-2xl font-bold text-indigo-600">{strategy.score}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${strategy.score}%` }}></div>
                                        </div>
                                    </div>
                                ))}

                            {selectedStrategy && (
                                <div className="pt-4 mb-8 !mt-10">
                                    <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Info className="w-6 h-6 text-blue-600" />
                                            <h2 className="font-bold text-gray-800 text-2xl">Tips for {selectedStrategy.name}</h2>
                                        </div>
                                        <ul className="list-none space-y-3">
                                            {tips[firstLetterLowerCase(selectedStrategy.name.replace("-", "").replace(" ", "")) as StrategyType].map(
                                                (tip, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-gray-600">
                                                        <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-2" />
                                                        {tip}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 mb-8 !mt-10">
                                <h2 className="font-bold text-gray-800 text-2xl mb-2">Questions</h2>
                                {selectedStrategy && (
                                    <div className="flex gap-4 mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                            <span className="text-sm font-medium">
                                                {warningCount} Warning{warningCount !== 1 ? "s" : ""}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <span className="text-sm font-medium">
                                                {criticalCount} Critical Issue{criticalCount !== 1 ? "s" : ""}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <ul className="space-y-3">
                                    <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                                        {calculateScores()[0].criticalAnswers.map((answer, i) => (
                                            <AccordionItem
                                                key={i}
                                                value={i.toString()}
                                                className={`border rounded-lg mb-4 shadow-sm ${
                                                    selectedStrategy &&
                                                    (() => {
                                                        const question = questions.find((q) => q.text === answer.question);
                                                        const answerIndex = Object.entries(answers).find(([id]) => id === question?.id)?.[1];
                                                        if (question && typeof answerIndex === "number") {
                                                            const score =
                                                                question.options[answerIndex].scores[
                                                                    firstLetterLowerCase(selectedStrategy.name.replace("-", "").replace(" ", "")) as
                                                                        | "native"
                                                                        | "crossPlatform"
                                                                        | "webApp"
                                                                ];
                                                            if (score === 0) return "border-red-500";
                                                            if (score === 1) return "border-yellow-400";
                                                        }
                                                        return "";
                                                    })()
                                                }`}>
                                                <AccordionTrigger
                                                    className={`px-4 py-3 rounded-lg text-md !no-underline font-semibold hover:bg-gray-50 ${
                                                        selectedStrategy &&
                                                        (() => {
                                                            const question = questions.find((q) => q.text === answer.question);
                                                            const answerIndex = Object.entries(answers).find(([id]) => id === question?.id)?.[1];
                                                            if (question && typeof answerIndex === "number") {
                                                                const score =
                                                                    question.options[answerIndex].scores[
                                                                        firstLetterLowerCase(
                                                                            selectedStrategy.name.replace("-", "").replace(" ", "")
                                                                        ) as "native" | "crossPlatform" | "webApp"
                                                                    ];
                                                                if (score === 0) return "bg-red-50 hover:bg-red-100";
                                                                if (score === 1) return "bg-yellow-50 hover:bg-yellow-100";
                                                            }
                                                            return "";
                                                        })()
                                                    }`}>
                                                    {answer.question}
                                                </AccordionTrigger>

                                                <AccordionContent className="px-4 py-3 space-y-4">
                                                    <div className="space-y-2">
                                                        <div className="flex flex-col space-y-1">
                                                            <span className="font-semibold text-gray-700">Your Answer</span>
                                                            <p className="text-gray-600 pl-2">"{answer.answer}"</p>
                                                        </div>

                                                        <div className="flex flex-col space-y-1">
                                                            <span className="font-semibold text-gray-700">Explanation</span>
                                                            <p className="text-gray-600 pl-2 italic">{answer.reasoning}</p>
                                                        </div>

                                                        <div className="flex flex-col space-y-1">
                                                            <span className="font-semibold text-gray-700">Sources</span>
                                                            <div className="flex flex-wrap gap-2">
                                                                {questions
                                                                    .find((q) => q.text === answer.question)
                                                                    ?.sources?.map((source, i) => (
                                                                        <a
                                                                            key={i}
                                                                            href={source.url}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 active:bg-indigo-200 transition-colors">
                                                                            {source.name}
                                                                        </a>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </ul>
                            </div>
                            <button
                                onClick={handleReset}
                                className="!mt-12 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                                Start Over
                            </button>
                        </div>
                    )}
                    {!showResults && (
                        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                            <div className="max-w-2xl px-0 md:px-8 mx-auto">
                                <button
                                    onClick={handleDoubleWeightToggle}
                                    className={`w-full text-left p-4 max-w-2xl rounded-lg border transition-all duration-200 flex items-center justify-between group ${
                                        doubleWeightQuestions[questions[currentQuestion].id]
                                            ? "border-indigo-600 border-2 text-indigo-600"
                                            : "border-gray-200 border-2"
                                    }`}>
                                    <span className="font-bold">2x</span>
                                    <span className={doubleWeightQuestions[questions[currentQuestion].id] ? "font-bold" : ""}>Double Weight</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
