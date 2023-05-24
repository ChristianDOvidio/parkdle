export function getRandomRoundedDate(from: Date, to: Date) {
	const fromTime = from.getTime();
	const toTime = to.getTime();
	const minutes = 30;
	const ms = 1000 * 60 * minutes;

	const randomDate = new Date(fromTime + Math.random() * (toTime - fromTime));
	return new Date(Math.round(randomDate.getTime() / ms) * ms)
}

export function get12HourFormattedTime(time: Date) {
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