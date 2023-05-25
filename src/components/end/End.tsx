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

			<div className='button-section'>
				<button title="play again" onClick={() => window.location.reload()}>{"🔄"}</button>
			</div>
		</>
	);
}

export default End;