import React from "react"
import Modal from "react-bootstrap/Modal";
import { useGameState, types } from "../../../context/Codenames";
import { capitalize } from "../../../utils/CodenameUtils"

const ClueModal = props => {
  const [state, dispatch] = useGameState();

  const formInputChanged = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch({ type: types.FORM_VALUE_UPDATED, name, value });
  };

  const submitClue = (event) => {
    event.preventDefault();
    dispatch({ type: types.CLUE_SUBMITTED, dispatch });
  };

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
            <input
              placeholder="Clue"
              className="form-control"
              name="word"
              value={state.clues.word}
              onChange={formInputChanged}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Number of Guesses"
              className="form-control"
              name="number"
              value={state.clues.number}
              onChange={formInputChanged}
            />
          </div>
          <div className="form-group">
            <button
              onClick={submitClue}
              className="btn btn-primary"
            >
              Submit Clue
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(ClueModal)