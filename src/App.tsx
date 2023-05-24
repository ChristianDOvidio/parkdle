import React, { useState } from 'react';

function getRandomRoundedDate(from: Date, to: Date) {
	const fromTime = from.getTime();
	const toTime = to.getTime();
	const minutes = 30;
	const ms = 1000 * 60 * minutes;

	const randomDate = new Date(fromTime + Math.random() * (toTime - fromTime));
	return new Date(Math.round(randomDate.getTime() / ms) * ms)
}

function get12HourFormattedTime(time: Date) {
	var hours = time.getHours();
	const amOrPm = hours >= 12 ? 'PM' : 'AM';
	hours = (hours % 12) || 12;
	var minutes = pad(time.getMinutes());
	return (hours + ":" + minutes + " " + amOrPm); 
}

function pad(input: number) {
	if(input < 10) {
		return '0' + input;
	} else {
		return input;
	}
}

const Parkdle: React.FC = () => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();


	// picking random time between start of day and 21:30
	const startTimeStart = new Date(currentYear, currentMonth, currentDay, 0, 0, 0, 0);
	const startTimeEnd = new Date(currentYear, currentMonth, currentDay, 21, 29, 59, 999);
	const randomStartTime = getRandomRoundedDate(startTimeStart, startTimeEnd);

	// picking random time between startTimeEnd + 30min and end of day
	const endTimeStart = new Date(currentYear, currentMonth, currentDay, randomStartTime.getHours(), randomStartTime.getMinutes() + 30, 59, 999);
	const endTimeEnd = new Date(currentYear, currentMonth, currentDay, 23, 29, 59, 999);
	const randomEndTime = getRandomRoundedDate(endTimeStart, endTimeEnd);

	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (answer: boolean) => {
		const clickedCurrentDate = new Date();
		const clickedHour = clickedCurrentDate.getHours();
		const clickedMinute = clickedCurrentDate.getMinutes();

		const normalizedClickedDate = new Date(currentYear, currentMonth, currentDay, clickedHour, clickedMinute, 0, 0);
		const canPark = (normalizedClickedDate >= randomStartTime && normalizedClickedDate <= randomEndTime)
		
		if (answer != canPark) {	
			setScore(score + 1);
		} else {
			setShowScore(true);
		}

	};

	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} points
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-text'>{"NO PARKING " + get12HourFormattedTime(randomStartTime) + " TO " + get12HourFormattedTime(randomEndTime)}</div>

					</div>
					<div className='answer-section'>
						<button onClick={() => handleAnswerOptionClick(true)}>{"✅"}</button>
						<button onClick={() => handleAnswerOptionClick(false)}>{"❌"}</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Parkdle;
