import React from "react"
import Modal from "react-bootstrap/Modal";
import { useGameState, types } from "../../../context/Codenames";
import { capitalize } from "../../../utils/CodenameUtils"

const ClueModal = props => {
  const [state, dispatch] = useGameState();
  const [showError, setShowError] = React.useState(false)

  const validWord = state.clues.word.length > 0 && state.clues.word !== ""; ;
  const validNumber = state.clues.number > 0 && state.clues.number !== "" ;
  const validateState = validNumber && validWord

  const formInputChanged = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch({ type: types.FORM_VALUE_UPDATED, name, value });
  };

  const submitClue = (event) => {
    event.preventDefault();
    if(validateState) {
      dispatch({ type: types.CLUE_SUBMITTED, dispatch });
      setShowError(false);
    }
    setShowError(true)
  };

  const errorMessageWord = showError && !validWord && (
    <p 
      id="codenames-clueWordError"
      className="text-danger">
        Please fill in a word
    </p>
  );
  const errorMessageNumber = showError && !validNumber && (
    <p 
      id="codenames-clueNumberError"
      className="text-danger">
        Please fill in a number greater than 0
    </p>
  );

  return (
    <Modal
      id="codenames-clueModal"
      show={state.clues.showModal}
      onHide={() => dispatch({ type: types.CLOSED_MODAL })}
    >
      <Modal.Header closeButton>
        <h3 id="codenames-enterClueTitle">{capitalize(state.turnTeam)} Team Spy Master Enter Your Guess</h3>
      </Modal.Header>
      <Modal.Body>
        <form autoComplete="off">
          <p>Submit New Clue</p>
          <div className="form-group">
            {errorMessageWord}
            <input
              id="codenames-clueWordInput"
              placeholder="Clue"
              className="form-control"
              name="word"
              value={state.clues.word}
              onChange={formInputChanged}
            />
          </div>
          <div className="form-group">
            {errorMessageNumber}
            <input
              id="codenames-clueNumberInput"
              placeholder="Number of Guesses"
              className="form-control"
              name="number"
              value={state.clues.number}
              onChange={formInputChanged}
            />
          </div>
          <div className="form-group">
            <button 
              id="codenames-submitClueButton"
              onClick={submitClue} 
              className="btn btn-primary">
              Submit Clue
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(ClueModal)