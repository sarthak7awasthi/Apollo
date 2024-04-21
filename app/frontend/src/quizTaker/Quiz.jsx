import React, { useState, useEffect } from 'react';

function QuizComponent() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  const fetchQuizQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic: 'animals', number: 5 }) // Change topic and number as needed
      });
      const data = await response.json();
      setQuizQuestions(data.quiz_questions);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    return (
      <div>
        <h1>Quiz Completed!</h1>
        <h2>Your score is: {score}/{quizQuestions.length}</h2>
      </div>
    );
  }

  if (!quizQuestions || quizQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div>
      <h1>Quiz</h1>
      <div>
        <h2>Question {currentQuestionIndex + 1}:</h2>
        <p>{currentQuestion.question}</p>
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option)} style={{ cursor: 'pointer' }}>
              {option}
            </li>
          ))}
        </ul>
        <button onClick={handleNextQuestion} disabled={!selectedOption}>Next</button>
      </div>
    </div>
  );
}

export default QuizComponent;
