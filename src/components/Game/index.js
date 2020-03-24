import React from "react"
import Codenames from "./Codenames"
import { CodenamesProvider } from "../../context/Codenames"

const Game = props => {
  return (
    <CodenamesProvider>
      <Codenames />
    </CodenamesProvider>
  );
}

export default React.memo(Game)