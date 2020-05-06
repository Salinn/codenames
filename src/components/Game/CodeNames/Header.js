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
      gameInfo: { name, number, version },
    } = state;
    history.push(`/games/codenames?name=${name}&version=${version}&number=${number + 1}`);
    dispatch({ type: types.START_NEW_GAME })
  };

  const enterNewClueButton = state.clues.guesses === 0 && gameStillPlaying && (
    <button id="codenames-enterClueButton" onClick={spyMasterEnterNewClue} className="btn btn-primary">
      Enter New Clue
    </button>
  );

  const endTurnButton = state.clues.guesses !== 0 && gameStillPlaying && (
    <button id="codenames-endTurnButton" onClick={passOnTurn} className="btn btn-danger">
      End Turn
    </button>
  );

  const prompt = gameStillPlaying ? turnMessaging : winningMessage;
  
  return (
    <div id="codenames-buttons" className="col-12">
      <h2 id="codenames-title" className="text-center">
        {prompt}
      </h2>
      <div className="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div className="p-2">
          <button
            id="codenames-newGameButton"
            onClick={newGame}
            className="btn btn-success"
          >
            New Game
          </button>
          <button
            id="codenames-shareLink"
            className="btn btn-secondary mx-2"
            onClick={() => {
              navigator.clipboard.writeText(window.location);
              // window.open("about:blank", "_self");
              // window.close();
            }}
          >
            Share Game
          </button>
        </div>
        <div className="p-2">
          {enterNewClueButton}
          {endTurnButton}
        </div>
        <div className="p-2">
          <button
            id="codenames-toggleSpymasterButton"
            onClick={toggleSpy}
            className="btn btn-info"
          >
            {spyToggleLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Header)