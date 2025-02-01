import { useState } from 'react';
import { ArrowRight, Smartphone, Layers, Globe2 } from 'lucide-react';
import { questions } from './data/questions';
import type { Strategy, StrategyType } from './types';

function App() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const calculateScores = (): Strategy[] => {
    const totalWeights = questions.reduce((sum, q) => sum + 8, 0);
    const strategies: StrategyType[] = ['native', 'crossPlatform', 'webApp'];
    
    return strategies.map(strategy => {
      const score = Object.entries(answers).reduce((sum, [questionId, optionIndex]) => {
        const question = questions.find(q => q.id === questionId);
        if (!question) return sum;
        return sum + question.options[optionIndex].scores[strategy];
      }, 0) / totalWeights * 100;

      const criticalAnswers = Object.entries(answers).map(([questionId, optionIndex]) => {
        const question = questions.find(q => q.id === questionId);
        if (!question) return null;
        return {
          question: question.text,
          answer: question.options[optionIndex].text,
          reasoning: question.options[optionIndex].reasoning
        };
      }).filter(Boolean);

      return {
        name: strategy === 'native' ? 'Native' : 
              strategy === 'crossPlatform' ? 'Cross-Platform' : 'Web App',
        score: Math.round(score),
        criticalAnswers
      };
    });
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: optionIndex
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const currentQuestionData = questions[currentQuestion];

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              Mobile Development Advisor
            </h1>
            
            <p className="text-gray-600 mb-8">
              Answer a few questions about your mobile app requirements, and we'll help you determine 
              the best development strategy between:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-lg border border-gray-200 text-center">
                <Smartphone className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">Native</h3>
                <p className="text-sm text-gray-600 mt-2">Platform-specific development</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 text-center">
                <Layers className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">Cross-Platform</h3>
                <p className="text-sm text-gray-600 mt-2">Single codebase, multiple platforms</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 text-center">
                <Globe2 className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">Web App</h3>
                <p className="text-sm text-gray-600 mt-2">Browser-based solution</p>
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            Mobile Development Advisor
          </h1>

          {!showResults ? (
            <div className="space-y-6">
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {currentQuestionData.text}
              </h2>

              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-between group"
                  >
                    <span>{option.text}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Recommended Development Strategies
              </h2>
              
              {calculateScores().sort((a, b) => b.score - a.score).map((strategy, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg border border-gray-200 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">
                      {strategy.name}
                    </h3>
                    <span className="text-2xl font-bold text-indigo-600">
                      {strategy.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${strategy.score}%` }}
                    ></div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-800 mb-2">Key Considerations:</h4>
                    <ul className="space-y-3">
                      {strategy.criticalAnswers.map((answer, i) => (
                        <li key={i} className="text-sm text-gray-600">
                          <span className="font-medium">{answer.question}:</span>
                          <br />
                          You chose: "{answer.answer}"
                          <br />
                          <span className="italic">{answer.reasoning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <button
                onClick={handleReset}
                className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;