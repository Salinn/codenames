import React, { useState } from "react"
import { useHistory } from "react-router-dom";

const Home = props => {
  const {
    games = [
      {
        name: "Team MassMutual",
        createdBy: "Paul"
      },
      {
        name: "Team OTA",
        createdBy: "Michelle"
      }
    ]
  } = props;
  const [gameName, setGameName] = useState("")
  const history = useHistory();

  const onChange = event => {
    event.preventDefault()
    const { value } = event.target
    setGameName(value);
  }

  const createGame = () => {
    history.push(`/game?id=${gameName}`);
  }

  const currentGames = games.map(currentGame => {
    const { name } = currentGame
    return (
      <div>
        { name }
      </div>
    )
  })

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>New Game</h2>
          <input
            placeholder="Game Name..."
            onChange={onChange}
            value={gameName}
          />
          <button onClick={createGame}>Create New Game</button>
        </div>

        <div className="col-6">
          <h2>In Play Games</h2>
          {currentGames}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Home);