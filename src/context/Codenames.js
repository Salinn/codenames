import React, { createContext, useReducer, useContext } from "react";

import { wordsToCards, pickStartingTeam } from "../utils/Game";
import { pickWords } from "../assets/words";

const words = pickWords();
const startingTeam = pickStartingTeam();
const startingCards = wordsToCards({ words, startingTeam });
const redStarts = startingTeam === "red";
const blueStarts = startingTeam === "blue";
const startingTotals = {
  assassin: 1,
  red: redStarts ? 9 : 8,
  blue: blueStarts ? 9 : 8,
  none: 7
};

const initialState = {
  cards: startingCards,
  spyToggled: false,
  gameStillPlaying: true,
  turnTeam: startingTeam,
  totals: startingTotals
};
const reducer = (state, action) => {
  switch(action.type) {
    default:
      return state
  }
}

const CodenamesContext = createContext();

const CodenamesProvider = props => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState) 
  return (
    <CodenamesContext.Provider value={[state, dispatch]}>
      {children}
    </CodenamesContext.Provider>
  )
}

const getGameState = useContext(CodenamesContext);

const types = {

}

export { CodenamesProvider, getGameState, types }