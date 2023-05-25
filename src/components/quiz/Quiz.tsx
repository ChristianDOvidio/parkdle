import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../../helpers/Contexts';
import { get12HourFormattedTime, getRandomRoundedDate } from '../../helpers/DateHelper';

const Quiz: React.FC = () => {
	const { score, setScore } = useContext(QuizContext);
	const { counter, setCounter } = useContext(QuizContext);
	const { setGameState } = useContext(QuizContext);
	const { currentDate } = useContext(QuizContext);
	const { startTime, setStartTime } = useContext(QuizContext);
	const { endTime, setEndTime } = useContext(QuizContext);

	const [ clock, setClock ] = useState(currentDate);
	const [ showDays, setShowDays ] = useState(false);
	const [ firstRandomWeekday, setFirstRandomWeekday ] = useState(0);
	const [ secondRandomWeekday, setSecondRandomWeekday ] = useState(0);

	const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();
	const currentWeekday = currentDate.getDay();
	
	function refreshClock() {
		setClock(new Date());
	  }

	const handleAnswerOptionClick = (answer: boolean) => {
		const clickedCurrentDate = new Date();
		const clickedHour = clickedCurrentDate.getHours();
		const clickedMinute = clickedCurrentDate.getMinutes();

		const normalizedClickedDate = new Date(currentYear, currentMonth, currentDay, clickedHour, clickedMinute, 0, 0);
		let canPark = !(normalizedClickedDate >= startTime && normalizedClickedDate <= endTime);
		if (showDays) {
			if (currentWeekday === firstRandomWeekday || currentWeekday === secondRandomWeekday) {
				canPark = true;
			}
		}

		if (answer === canPark) {
			setScore(score + 1);
			// picking random time between start of day and 21:30
			const startTimeStart = new Date(currentYear, currentMonth, currentDay, 0, 0, 0, 0);
			const startTimeEnd = new Date(currentYear, currentMonth, currentDay, 21, 29, 59, 999);
			const randomStartTime = getRandomRoundedDate(startTimeStart, startTimeEnd);

			// picking random time between startTimeEnd + 30min and end of day
			const endTimeStart = new Date(currentYear, currentMonth, currentDay, randomStartTime.getHours(), randomStartTime.getMinutes() + 30, 59, 999);
			const endTimeEnd = new Date(currentYear, currentMonth, currentDay, 23, 29, 59, 999);
			const randomEndTime = getRandomRoundedDate(endTimeStart, endTimeEnd);
			
			const firstRandomWeekday = Math.floor(Math.random() * dayNames.length);
			let secondRandomWeekday = Math.floor(Math.random() * dayNames.length);
			
			do {
				secondRandomWeekday = Math.floor(Math.random() * dayNames.length);
			} while(firstRandomWeekday === secondRandomWeekday);

			setFirstRandomWeekday(firstRandomWeekday);
			setSecondRandomWeekday(secondRandomWeekday);

			if (score < 10) {
				setCounter(10);
			} else if (score < 20) {
				setShowDays(true)
				setCounter(10);
			} else if (score < 30) {
				setShowDays(true)
				setCounter(9);
			} else if (score < 40) {
				setShowDays(true)
				setCounter(8);
			} else if (score < 50) {
				setShowDays(true)
				setCounter(7);
			} else if (score < 60) {
				setShowDays(true)
				setCounter(6);
			} else if (score < 70) {
				setShowDays(true)
				setCounter(5);
			} else {
				setShowDays(true)
				setCounter(5);
			}

			setStartTime(randomStartTime);
			setEndTime(randomEndTime);
		} else {
			setGameState("end");
		}
	};

	useEffect(() => {
		const timer = counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : 0;
		const clockTimer = setInterval(refreshClock, 1000);
		if (timer === 0) {
			setGameState("end");
		}
		return function cleanup() {
			clearInterval(timer);
			clearInterval(clockTimer);
		}
	}, [counter])

	return (
		<>
			<div className='clock'>
				{clock.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
			</div>

			<div className={(counter < 7 ? (counter < 5 ? 'timer-red' : 'timer-orange') : 'timer')}>
				{counter}
			</div>

			<div className='red-outline'>
				<div className='parking-text'>{"NO PARKING"}</div>
				<div className='question-text'>{get12HourFormattedTime(startTime)}</div>
				<div className='question-text'>{"TO " + get12HourFormattedTime(endTime)}</div>
				{showDays ? (
					<div className='question-text-small'>{"EXCEPT " + dayNames[firstRandomWeekday] + " & " + dayNames[secondRandomWeekday]}</div>
				) : (
					null
				)}
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
