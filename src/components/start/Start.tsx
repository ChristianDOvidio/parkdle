import { useContext } from "react";
import { QuizContext } from "../../helpers/Contexts";


const Start: React.FC = () => {

    const { setGameState } = useContext(QuizContext);

	return (
		<>
			<div className='title-text'>
				PARKDLE
			</div>
			<div className='title-text-small'>
				The Parking Logic Game
			</div>
			<div className='button-section'>
				<button title="play game" onClick={() => setGameState("quiz")}>{"➡️"}</button>
			</div>
		</>
	);
}

export default Start;