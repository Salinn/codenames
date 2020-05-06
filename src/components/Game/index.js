import React from "react"
import Codenames from "./CodeNames"
import { CodenamesProvider } from "../../context/Codenames"

const Game = props => {
  const params = new URLSearchParams(window.location.search);
  const gameName = params.get("name");
  const SHOW_CODENAMES = gameName && gameName.length > 0 && gameName !== 'null'
  return SHOW_CODENAMES && (
    <CodenamesProvider>
      <Codenames />
    </CodenamesProvider>
  );
}

export default React.memo(Game)