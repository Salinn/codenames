import React from "react"
import Card from "react-bootstrap/Card"

import { useGameState, types } from "../../context/Codenames"

const CodeNames = props => {
  const gameName = new URLSearchParams(window.location.search).get("name");
  const [state, dispatch] = useGameState({ gameName });

  const {
    cards,
    spyToggled,
    gameStillPlaying,
    turnTeam,
    totals
  } = state
  const redsTurn = turnTeam === "red";
  const bluesTurn = turnTeam === "blue";
  
  const toggleSpy = () => dispatch({ type: types.TOGGLE_SPY })
  const updateTeam = props => {
    const { card } = props
    if (card.team === turnTeam || card.team === "assassin") {
      dispatch({ type: types.UPDATE_GAME_TURN, turnTeam });
    } else {
      const newTeam = turnTeam === "red" ? "blue" : "red";
      dispatch({ type: types.UPDATE_GAME_TURN, turnTeam: newTeam });
    }
  }
  const newGame = () => {
    dispatch({ type: types.START_NEW_GAME });
  }

  const flipCard = card => {
    const nextCards = cards.map(currentCard => {
      const SAME_CARD = card.label === currentCard.label
      if(SAME_CARD) {
        updateTeam({ card: currentCard });
        dispatch({
          type: types.REMOVE_FROM_TOTAL,
          totals,
          currentCard
        });
        return { ...currentCard, flipped: true }
      }
      return currentCard
    })
    dispatch({ type: types.NEW_CARDS, nextCards });
  }

  const determineBackgroundColor = (card, spyToggled) => {
    const { flipped, team } = card
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
  }
  const determineTextColor = (card, spyToggled) => {
    const IS_FLIPPED = card.flipped || spyToggled;
    if(IS_FLIPPED) {
      return "text-light"
    }
    return "text-dark"
  }

  const gameCards = cards.map((word, index) => {
    const { id, label, flipped } = word;
    const FLIPPED_AND_SPY_MASTER = flipped && spyToggled
    const opacity = FLIPPED_AND_SPY_MASTER ? {opacity: 0.5} : {}
    const className =
      index % 5 === 0
        ? "col-6 col-md-4 col-lg-2 offset-lg-1"
        : "col-6 col-md-4 col-lg-2";
    const onClick = () => {
      const NOT_FLIPPED = !flipped && !spyToggled && gameStillPlaying;
      if(NOT_FLIPPED) {
        flipCard(word);
      }
    }
    const backgroundColor = determineBackgroundColor(word, spyToggled);
    const textColor = determineTextColor(word, spyToggled);


    return (
      <div key={id} className={className} style={opacity}>
        <Card onClick={onClick} className={`m-2 py-5 ${backgroundColor}`}>
          <h5 className={`text-center ${textColor}`}>{label}</h5>
        </Card>
      </div>
    );
  });

  const spyMasterMessage = spyToggled && (
    <p>
      Tiles that are lighter than the others have already been guessed by the
      players
    </p>
  );

  let winningMessage, turnMessaging;
  const blueWon = totals.blue === 0; 
  const redWon = totals.red === 0 
  const gameWon = blueWon || redWon;
  const assassinFound = totals.assassin === 0
  const anotherTurn = !gameWon && !assassinFound
  if (gameWon) {
    winningMessage = redWon ? "CONGRATS RED TEAM!" : "WAY TO GO BLUE TEAM!";
    if (gameStillPlaying) {
      dispatch({ type: types.GAME_OVER });
    }
  } else if (assassinFound) {
    winningMessage = bluesTurn
      ? "RED TEAM IS VICTORIOUS!"
      : "BLUE TEAM IS OUR VICTOR!";
    if (gameStillPlaying) { 
      dispatch({ type: types.GAME_OVER });
    }
  } else if (anotherTurn && gameStillPlaying) {
    turnMessaging = redsTurn ? "Red's turn" : "Blue's turn";
  }
  const spyToggleLabel = spyToggled ? "See Guesser View" : "See Spymaster View";
  const formInputChanged = event => {
    event.preventDefault()
    const { name, value } = event.target
    dispatch({ type: types.FORM_VALUE_UPDATED, name, value})
  }

  return (
    <div className="container-fluid">
      <h2 className="text-center">
        {turnMessaging}
        {winningMessage}
      </h2>
      <div className="row pb-5">
        <div className="order-2 order-md-1 col-12 col-md-10 ">
          <div className="row">{gameCards}</div>
        </div>
        <div className="order-1 order-m-2d col-12 col-md-2 p-2">
          <h5>Remaining Cards</h5>
          <p className="text-primary">Blue: {totals.blue}</p>
          <p className="text-danger">Red: {totals.red}</p>
          <p className="text-dark">Assassin: {totals.assassin}</p>
          <p className="text-muted">Neither: {totals.none}</p>
          <div className="row pb-3">
            <button onClick={toggleSpy} className="btn btn-primary mb-3">
              {spyToggleLabel}
            </button>
            <div>
              <p>To make a guess just click the card!</p>
            </div>
            {spyMasterMessage}
            <button onClick={newGame} className="btn btn-success mb-3">
              New Game
            </button>
            <form>
              <p>Submit New Clue</p>
              <label>
                Word:
                <input
                  name="word"
                  value={state.clues.word}
                  onChange={formInputChanged}
                />
              </label>
              <label>
                Number:
                <input
                  name="number"
                  value={state.clues.number}
                  onChange={formInputChanged}
                />
              </label>
              <button
                onClick={(event) =>  {
                  event.preventDefault()
                  dispatch({ type: types.CLUE_SUBMITTED })}
                }
                className="btn btn-primary"
              >
                Submit Clue
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <h5>Rules</h5>
            <p>
              Codenames is a game of guessing which code names (words) in a set
              are related to a hint-word given by another player.
            </p>
            <p>
              Players split into two teams: red and blue. One player of each
              team is selected as the team's spymaster; the others are field
              operatives.
            </p>
            <p>
              Twenty-five Codename cards, each bearing a picture, are laid out
              in a 5×5 rectangular grid, in random order. A number of these
              words represent red agents, a number represent blue agents, one
              represents an assassin, and the others represent innocent
              bystanders.
            </p>
            <p>
              The teams' spymasters are given a randomly-dealt map card showing
              a 5×5 grid of 25 squares of various colors, each corresponding to
              one of the code name cards on the table. Teams take turns. On each
              turn, the appropriate spymaster gives a verbal hint about the
              words on the respective cards. Each hint may only consist of one
              single word and a number. The spymaster gives a hint that is
              related to as many of the words on his/her own agents' cards as
              possible, but not to any others – lest they accidentally lead
              their team to choose a card representing an innocent bystander, an
              opposing agent, or the assassin.
            </p>
            <p>
              The hint's word can be chosen freely, as long as it is not (and
              does not contain) any of the words on the code name cards still
              showing at that time. Code name cards are covered as guesses are
              made.
            </p>
            <p>
              The hint's number tells the field operatives how many words in the
              grid are related to the word of the clue. It also determines the
              maximum number of guesses the field operatives may make on that
              turn, which is the hint's number plus one. Field operatives must
              make at least one guess per turn, risking a wrong guess and its
              consequences. They may also end their turn voluntarily at any
              point thereafter.
            </p>
            <p>
              After a spymaster gives the hint with its word and number, their
              field operatives make guesses about which code name cards bear
              words related to the hint and point them out, one at a time. When
              a code name card is pointed out, the spymaster covers that card
              with an appropriate identity card – a blue agent card, a red agent
              card, an innocent bystander card, or the assassin card – as
              indicated on the spymasters' map of the grid. If the assassin is
              pointed out, the game ends immediately, with the team who
              identified him losing. If an agent of the other team is pointed
              out, the turn ends immediately, and that other team is also one
              agent closer to winning. If an innocent bystander is pointed out,
              the turn simply ends.
            </p>
            <p>
              The game ends when all of one team's agents are identified
              (winning the game for that team), or when one team has identified
              the assassin (losing the game).
            </p>
            <p>
              To see the complete pdf{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://czechgames.com/files/rules/codenames-rules-en.pdf"
              >
                click here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CodeNames)