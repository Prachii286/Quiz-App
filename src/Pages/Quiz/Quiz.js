import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../../Components/Question/Question";

import "./Quiz.css";

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState([]);
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    if (questions && questions.length > 0) {
      const shuffledOptions = handleShuffle([
        questions[currQues]?.correct_answer,
        ...questions[currQues]?.incorrect_answers,
      ]);
      setOptions(shuffledOptions);
    }
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  // Check if questions array is empty or undefined
  if (!questions || questions.length === 0 || !questions[currQues]) {
    return (
      <div className="quiz">
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      </div>
    );
  }

  console.log("Current Question:", questions[currQues]); // Log current question for debugging

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>
      <>
        <div className="quizInfo">
          <span>{questions[currQues].category}</span>
          <span>Score: {score}</span>
        </div>
        <Question
          currQues={currQues}
          setCurrQues={setCurrQues}
          questions={questions}
          options={options}
          correct={questions[currQues]?.correct_answer}
          score={score}
          setScore={setScore}
          setQuestions={setQuestions}
        />
      </>
    </div>
  );
};

export default Quiz;
