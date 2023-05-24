import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../../helpers/Contexts';
import { get12HourFormattedTime, getRandomRoundedDate } from '../../helpers/DateHelper';

const Quiz: React.FC = () => {
	const { score, setScore } = useContext(QuizContext);
	const { counter, setCounter } = useContext(QuizContext);
	const { setGameState } = useContext(QuizContext);
	const { currentDate } = useContext(QuizContext);
	const { startTime, setStartTime } = useContext(QuizContext);
	const { endTime, setEndTime } = useContext(QuizContext);

	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();
	
	const handleAnswerOptionClick = (answer: boolean) => {
		const clickedCurrentDate = new Date();
		const clickedHour = clickedCurrentDate.getHours();
		const clickedMinute = clickedCurrentDate.getMinutes();

		const normalizedClickedDate = new Date(currentYear, currentMonth, currentDay, clickedHour, clickedMinute, 0, 0);
		const canPark = (normalizedClickedDate >= startTime && normalizedClickedDate <= endTime)
		
		if (answer !== canPark) {	
			setScore(score + 1);
			// picking random time between start of day and 21:30
			const startTimeStart = new Date(currentYear, currentMonth, currentDay, 0, 0, 0, 0);
			const startTimeEnd = new Date(currentYear, currentMonth, currentDay, 21, 29, 59, 999);
			const randomStartTime = getRandomRoundedDate(startTimeStart, startTimeEnd);

			// picking random time between startTimeEnd + 30min and end of day
			const endTimeStart = new Date(currentYear, currentMonth, currentDay, randomStartTime.getHours(), randomStartTime.getMinutes() + 30, 59, 999);
			const endTimeEnd = new Date(currentYear, currentMonth, currentDay, 23, 29, 59, 999);
			const randomEndTime = getRandomRoundedDate(endTimeStart, endTimeEnd);
			setCounter(10);
			setStartTime(randomStartTime);
			setEndTime(randomEndTime);
		} else {
			setGameState("end");
		}
	};

	useEffect(() => {
		const timer = counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : 0;
		if (timer === 0) {
			setGameState("end");
		}
		return () => clearInterval(timer);
	}, [counter])

	return (
		<>
			<div>
				{counter}
			</div>

			<div className='red-outline'>
				<div className='parking-text'>{"NO PARKING"}</div>
				<div className='question-text'>{get12HourFormattedTime(startTime)}</div>
				<div className='question-text'>{"TO " + get12HourFormattedTime(endTime)}</div>
			</div>

			<div className='button-section'>
				<>
					<button title="can park" onClick={() => handleAnswerOptionClick(true)}>{"✅"}</button>
					<button title="can't park" onClick={() => handleAnswerOptionClick(false)}>{"❌"}</button>
				</>
			</div>
		</>
	);
}

export default Quiz;
