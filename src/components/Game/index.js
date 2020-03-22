import React from "react"
import Card from "react-bootstrap/Card"
import { CodenamesProvider } from "../../context/Codenames"

const Game = props => {
  return (
    <CodenamesProvider>
      <Game />
    </CodenamesProvider>
  );
}

export default React.memo(Game)