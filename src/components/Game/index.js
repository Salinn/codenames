import React from "react"
import Card from "react-bootstrap/Card"
import { wordsToCards, pickStartingTeam } from "../../utils/Game";

const Game = props => {
  const {
    words = ["Dog", "Baby", "Pole", "Chess", "Airport", "Cheese", "Boston", "Monopoly", "Bear", "White Collar", "Laptop", "Picture", "Nut", "Tree", "Elephant", "Beer", "Lighting", "Rain", "Stage", "Wine", "Remote", "Sea", "Socks", "Bench", "Milk" ]
  } = props;
  const startingTeam = pickStartingTeam()
  const initialState = wordsToCards({ words, startingTeam });
  const [cards, setCards] = React.useState(initialState);

  const redStarts = startingTeam === "red";
  const blueStarts = startingTeam === "blue";
  const startingTotals = {
    assassin: 1,
    red: redStarts ? 9 : 8,
    blue: blueStarts ? 9 : 8,
    none: 7
  };
  const [totals, setTotals] = React.useState(startingTotals)

  const flipCard = card => {
    const nextState = cards.map(currentCard => {
      const SAME_CARD = card.label === currentCard.label
      if(SAME_CARD) {
        setTotals({ ...totals, [currentCard.team]: totals[currentCard.team] - 1 });
        return { ...currentCard, flipped: true }
      }
      return currentCard
    })
    setCards(nextState)
  }

  const determineBackgroundColor = card => {
    const { flipped, team } = card
    const NOT_FLIPPED = !flipped
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
  }
  const determineTextColor = card => {
    const IS_FLIPPED = card.flipped
    if(IS_FLIPPED) {
      return "text-light"
    }
    return "text-dark"
  }

  const gameCards = cards.map((word, index) => {
    const { id, label, flipped } = word;
    const className = index % 5 === 0 ? "col-2 offset-1" : "col-2 ";
    const onClick = () => flipCard(word);
    const backgroundColor = determineBackgroundColor(word);
    const textColor = determineTextColor(word)
    const button = !flipped && (
      <button onClick={onClick} className="btn btn-secondary mx-2">
        Select
      </button>
    );
    return (
      <div className={className}>
        <Card className={`m-2 py-5 ${backgroundColor}`}>
          <h5 className={`text-center ${textColor}`}>{label}</h5>
          {button}
        </Card>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-10">
          <div className="row">{gameCards}</div>
        </div>
        <div className="col-2 p-2">
          <h5>Remaining Cards</h5>
          <p className="text-primary">Blue: {totals.blue}</p>
          <p className="text-danger">Red: {totals.red}</p>
          <p className="text-dark">Assassin: {totals.assassin}</p>
          <p className="text-muted">Neither: {totals.none}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Game)