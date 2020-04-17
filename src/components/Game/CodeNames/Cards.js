import React from "react"
import Card from "react-bootstrap/Card"
import SidePanel from "./SidePanel";
import { useGameState, types } from "../../../context/Codenames";
import { determineBackgroundColor, determineTextColor } from "../../../utils/CodenameUtils";

const Cards = props => {
  const [state, dispatch] = useGameState();
  const { turnTeam, cards, totals, spyToggled, gameStillPlaying } = state;
  
  const updateTeam = (props) => {
    const { card } = props;
    if (
      (card.team === turnTeam && state.clues.guesses > 1) ||
      card.team === "assassin"
    ) {
      dispatch({
        type: types.UPDATE_GAME_TURN,
        turnTeam,
        guesses: state.clues.guesses - 1,
      });
    } else {
      const newTeam = turnTeam === "red" ? "blue" : "red";
      dispatch({ type: types.UPDATE_GAME_TURN, turnTeam: newTeam, guesses: 0 });
    }
  };

  const flipCard = (card) => {
    const nextCards = cards.map((currentCard) => {
      const SAME_CARD = card.label === currentCard.label;
      if (SAME_CARD) {
        updateTeam({ card: currentCard });
        dispatch({
          type: types.REMOVE_FROM_TOTAL,
          totals,
          currentCard,
        });
        return { ...currentCard, flipped: true };
      }
      return currentCard;
    });
    dispatch({ type: types.NEW_CARDS, nextCards, dispatch });
  };

  const gameCards = cards.map((word, index) => {
    const { id, label, flipped, team } = word;
    const labelId = label.split(" ").join("")
    const FLIPPED_AND_SPY_MASTER = flipped && spyToggled;
    const opacity = FLIPPED_AND_SPY_MASTER ? { opacity: 0.5 } : {};
    const className =
      index % 5 === 0
        ? "col-6 col-md-4 col-lg-2 offset-lg-1"
        : "col-6 col-md-4 col-lg-2";
    const onClick = () => {
      const NOT_FLIPPED =
        !flipped &&
        !spyToggled &&
        gameStillPlaying &&
        state.clues.guesses !== 0;
      if (NOT_FLIPPED) {
        flipCard(word);
      }
    };
    const backgroundColor = determineBackgroundColor(word, spyToggled);
    const textColor = determineTextColor(word, spyToggled);

    const cardLabel = FLIPPED_AND_SPY_MASTER ? (
      <h4
        id={`codenames-card-${labelId}-flipped`}
        className={`text-center text-break text-wrap ${textColor}`}
      >
        <strike>{label}</strike>
      </h4>
    ) : (
      <h4
        id={`codenames-card-${labelId}-not-flipped`}
        className={`text-center text-break text-wrap ${textColor}`}
      >
        {label}
      </h4>
    );
    const dataTeam = flipped ? "none" : team

    return (
      <div key={id} className={className} style={opacity}>
        <Card
          data-team={dataTeam}
          onClick={onClick}
          className={`m-2 py-5 ${backgroundColor}`}
        >
          {cardLabel}
        </Card>
      </div>
    );
  });
  return (
    <div className="12">
      <div className="row no-gutters pb-5">
        <div className="order-2 order-md-1 col-12 col-md-10 ">
          <div id="codenames-cardsSection" className="row no-gutters">{gameCards}</div>
        </div>
        <SidePanel />
      </div>
    </div>
  );
}

export default React.memo(Cards)