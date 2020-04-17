import React, { useState } from "react"
import { useHistory } from "react-router-dom";

const Home = props => {
  const [gameName, setGameName] = useState("")
  const history = useHistory();

  const onChange = event => {
    event.preventDefault()
    const { value } = event.target
    setGameName(value);
  }

  const createGame = () => {
    history.push(`/games/codenames?name=${gameName}&version=normal&number=1`);
    window.location.reload();
  }

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
      </div>
    </div>
  );
}

export default React.memo(Home);