import { useContext } from "react";
import { QuizContext } from "../../helpers/Contexts";


const End: React.FC = () => {
	const { score } = useContext(QuizContext);

	return (
		<>
			<div className='button-section'>
				<div className='score-section'>
					<p>You scored {score} points!</p>
				</div>
			</div>

			<div className='gameover-buttons'>
				<div className='score-section'>
					<button onClick={() => window.location.reload()}>{"🔄"}</button>
				</div>
			</div>
		</>
	);
}

export default End;