import React from "react"

import { useHistory } from "react-router-dom";
import { useGameState, types } from "../../../context/Codenames"

const Header = props => {
  const [state, dispatch] = useGameState();
  const history = useHistory();
  const { turnMessaging, winningMessage, gameStillPlaying, spyToggled } = state;

  const toggleSpy = () => dispatch({ type: types.TOGGLE_SPY });
  const passOnTurn = () => dispatch({ type: types.PASS_ON_TURN });
  const spyMasterEnterNewClue = () => dispatch({ type: types.ENTER_NEW_CLUE });

  const spyToggleLabel = spyToggled ? "See Guesser View" : "See Spymaster View";

  const newGame = () => {
    const {
      gameInfo: { name, number },
    } = state;
    history.push(`/games/codenames?name=${name}&number=${number + 1}`);
    window.location.reload();
  };

  const enterNewClueButton = state.clues.guesses === 0 && gameStillPlaying && (
    <button onClick={spyMasterEnterNewClue} className="btn btn-primary">
      Enter New Clue
    </button>
  );

  const endTurnButton = state.clues.guesses !== 0 && gameStillPlaying && (
    <button onClick={passOnTurn} className="btn btn-danger">
      End Turn
    </button>
  );

  const prompt = gameStillPlaying ? turnMessaging : winningMessage;
  
  return (
    <div className="col-12">
      <h2 className="text-center">
        {prompt}
      </h2>
      <div className="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div className="p-2">
          <button onClick={newGame} className="btn btn-success">
            New Game
          </button>
        </div>
        <div className="p-2">
          {enterNewClueButton}
          {endTurnButton}
        </div>
        <div className="p-2">
          <button onClick={toggleSpy} className="btn btn-info">
            {spyToggleLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Header)