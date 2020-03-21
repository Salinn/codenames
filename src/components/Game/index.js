import React from "react"
import Card from "react-bootstrap/Card"

const Game = props => {
  const {
    words = [
      {
        id: 1,
        label: "Dog",
        flipped: false,
        team: "red"
      },
      {
        id: 2,
        label: "Pillow",
        flipped: false,
        team: "red"
      },
      {
        id: 3,
        label: "Baby",
        flipped: false,
        team: "blue"
      },
      {
        id: 4,
        label: "Pole",
        flipped: false,
        team: "none"
      },
      {
        id: 5,
        label: "Chess",
        flipped: false,
        team: "none"
      },
      {
        id: 6,
        label: "Airport",
        flipped: false,
        team: "none"
      },
      {
        id: 7,
        label: "Cheese",
        flipped: false,
        team: "red"
      },
      {
        id: 8,
        label: "Boston",
        flipped: false,
        team: "red"
      },
      {
        id: 9,
        label: "Monopoly",
        flipped: false,
        team: "red"
      },
      {
        id: 10,
        label: "White Collar",
        flipped: false,
        team: "blue"
      },
      {
        id: 11,
        label: "Laptop",
        flipped: false,
        team: "blue"
      },
      {
        id: 12,
        label: "Picture",
        flipped: false,
        team: "red"
      },
      {
        id: 13,
        label: "Nut",
        flipped: false,
        team: "blue"
      },
      {
        id: 14,
        label: "Tree",
        flipped: false,
        team: "red"
      },
      {
        id: 15,
        label: "Elephant",
        flipped: false,
        team: "none"
      },
      {
        id: 16,
        label: "Beer",
        flipped: false,
        team: "blue"
      },
      {
        id: 17,
        label: "Lighting",
        flipped: false,
        team: "blue"
      },
      {
        id: 18,
        label: "Rain",
        flipped: false,
        team: "none"
      },
      {
        id: 19,
        label: "Stage",
        flipped: false,
        team: "red"
      },
      {
        id: 20,
        label: "Wine",
        flipped: false,
        team: "red"
      },
      {
        id: 21,
        label: "Remote",
        flipped: false,
        team: "blue"
      },
      {
        id: 22,
        label: "Sea",
        flipped: false,
        team: "blue"
      },
      {
        id: 23,
        label: "Socks",
        flipped: false,
        team: "assassin"
      },
      {
        id: 24,
        label: "Bench",
        flipped: false,
        team: "none"
      },
      {
        id: 25,
        label: "Milk",
        flipped: false,
        team: "none"
      }
    ]
  } = props;
  const [cards, setState] = React.useState(words)
  const flipCard = card => {
    const nextState = cards.map(currentCard => {
      const SAME_CARD = card.label === currentCard.label
      if(SAME_CARD) {
        return { ...currentCard, flipped: true }
      }
      return currentCard
    })
    setState(nextState)
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
        <div className="col-12 text-center">
          <h1>Game</h1>
          <h2>Clue word: Animal</h2>
          <h2>Remaining Guesses: 1</h2>
        </div>
        {gameCards}
      </div>
    </div>
  );
}

export default React.memo(Game)