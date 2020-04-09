import React, { createContext, useReducer, useContext } from "react";

import reducer, { createGame } from "../reducers/Codenames"

const CodenamesContext = createContext();
const initialState = createGame()

const CodenamesProvider = props => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState) 
  
  return (
    <CodenamesContext.Provider value={[state, dispatch]}>
      {children}
    </CodenamesContext.Provider>
  )
}

const useGameState = () => {
  return useContext(CodenamesContext)
}

const types = {
  TOGGLE_SPY: "TOGGLE_SPY",
  UPDATE_GAME_TURN: "UPDATE_GAME_TURN",
  NEW_CARDS: "NEW_CARDS",
  REMOVE_FROM_TOTAL: "REMOVE_FROM_TOTAL",
  GAME_OVER: "GAME_OVER",
  START_NEW_GAME: "START_NEW_GAME",
  FORM_VALUE_UPDATED: "FORM_VALUE_UPDATED",
  CLUE_SUBMITTED: "CLUE_SUBMITTED",
  PASS_ON_TURN: "PASS_ON_TURN",
  ENTER_NEW_CLUE: "ENTER_NEW_CLUE",
  CLOSED_MODAL: "CLOSED_MODAL"
};

export { CodenamesProvider, useGameState, types };