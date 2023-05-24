import React, {useState} from "react";
import {QuizContext} from './helpers/Contexts';
import Quiz from "./components/quiz/Quiz";
import End from "./components/end/End";
import { getRandomRoundedDate } from "./helpers/DateHelper";

const App = () => {

	const nowDate = new Date();

	const currentYear = nowDate.getFullYear();
	const currentMonth = nowDate.getMonth();
	const currentDay = nowDate.getDate();

	// picking random time between start of day and 21:30
	const startTimeStart = new Date(currentYear, currentMonth, currentDay, 0, 0, 0, 0);
	const startTimeEnd = new Date(currentYear, currentMonth, currentDay, 21, 29, 59, 999);
	const randomStartTime = getRandomRoundedDate(startTimeStart, startTimeEnd);

	// picking random time between startTimeEnd + 30min and end of day
	const endTimeStart = new Date(currentYear, currentMonth, currentDay, randomStartTime.getHours(), randomStartTime.getMinutes() + 30, 59, 999);
	const endTimeEnd = new Date(currentYear, currentMonth, currentDay, 23, 29, 59, 999);
	const randomEndTime = getRandomRoundedDate(endTimeStart, endTimeEnd);

	const [counter, setCounter] = useState(10);
	const [gameState, setGameState] = useState("quiz");
	const [score, setScore] = useState(0);
	const [currentDate] = useState(nowDate);
	const [startTime, setStartTime] = useState(randomStartTime);
	const [endTime, setEndTime] = useState(randomEndTime);

	return (
		<div className="App" id="app">
			<QuizContext.Provider value={{setGameState, score, setScore, currentDate, counter, setCounter, startTime, setStartTime, endTime, setEndTime}}>
				{/* {gameState === "main" && <Main/>} */}
				{gameState === "quiz" && <Quiz/>}
				{gameState === "end" && <End/>}
			</QuizContext.Provider>
		</div>
	)
}

export default App;