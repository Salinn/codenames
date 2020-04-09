import React from "react"
import Modal from "react-bootstrap/Modal";
import { useGameState, types } from "../../../context/Codenames";
import { capitalize } from "../../../utils/CodenameUtils"

const ClueModal = props => {
  const [state, dispatch] = useGameState();
  const [showError, setShowError] = React.useState(false)

  const validWord = state.clues.word > 0 && state.clues.word !== ""; ;
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
    <p className="text-danger">Please fill in a valid word</p>
  );
  const errorMessageNumber = showError && !validNumber && (
    <p className="text-danger">Please fill in a valid number greater than 0</p>
  );

  return (
    <Modal
      show={state.clues.showModal}
      onHide={() => dispatch({ type: types.CLOSED_MODAL })}
    >
      <Modal.Header closeButton>
        {capitalize(state.turnTeam)} Team Spy Master Enter Your Guess
      </Modal.Header>
      <Modal.Body>
        <form autoComplete="off">
          <p>Submit New Clue</p>
          <div className="form-group">
            {errorMessageWord}
            <input
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
              placeholder="Number of Guesses"
              className="form-control"
              name="number"
              value={state.clues.number}
              onChange={formInputChanged}
            />
          </div>
          <div className="form-group">
            <button onClick={submitClue} className="btn btn-primary">
              Submit Clue
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(ClueModal)