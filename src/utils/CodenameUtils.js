import { types } from "../context/Codenames"

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const determineBackgroundColor = (card, spyToggled) => {
  const { flipped, team } = card;
  const NOT_FLIPPED = !flipped && !spyToggled;
  if (NOT_FLIPPED) {
    return "bg-light";
  }
  switch (team) {
    case "assassin":
      return "bg-dark";
    case "none":
      return "bg-warning";
    case "blue":
      return "bg-primary";
    case "red":
      return "bg-danger";
    default:
      return "bg-light";
  }
};

export const determineTextColor = (card, spyToggled) => {
  const IS_FLIPPED = card.flipped || spyToggled;
  if (IS_FLIPPED) {
    return "text-light";
  }
  return "text-dark";
};

export const determineNextTurnInfo = props => {
  const { totals, turnTeam, gameStillPlaying, dispatch, clues: { guesses } } = props;

  const redsTurn = turnTeam === "red";
  const bluesTurn = turnTeam === "blue";
  const blueWon = totals.blue === 0;
  const redWon = totals.red === 0;
  const gameWon = blueWon || redWon;
  const assassinFound = totals.assassin === 0;
  const anotherTurn = !gameWon && !assassinFound;
  if (gameWon) {
    dispatch({ type: types.GAME_OVER });
    return { winningMessage: redWon ? "CONGRATS RED TEAM!" : "WAY TO GO BLUE TEAM!" }
  } else if (assassinFound) {
    dispatch({ type: types.GAME_OVER });
    return { winningMessage: bluesTurn ? "RED TEAM IS VICTORIOUS!" : "BLUE TEAM IS OUR VICTOR!" }
  } else if (anotherTurn && gameStillPlaying) {
    return { turnMessaging: redsTurn
      ? guesses === 0
        ? "Red's Spy Master Enter New Clue"
        : `Red's turn - ${guesses} guesses remaining`
      : guesses === 0
      ? "Blue's Spy Master Enter New Clue"
      : `Blue's turn - ${guesses} guesses remaining`
    }
  }
}