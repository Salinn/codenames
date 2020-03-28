import React, { createContext, useReducer, useContext } from "react";
import { wordsToCards, pickStartingTeam } from "../utils/Game";
import { pickWords } from "../assets/words";

const createGame = () => {
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
    totals: startingTotals,
    clues: {
      word: "",
      number: "",
      redTeamPreviousClues: [],
      blueTeamPreviousClues: []
    }
  };
  return initialState
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.TOGGLE_SPY:
      return { ...state, spyToggled: !state.spyToggled };
    case types.UPDATE_GAME_TURN:
      return { ...state, turnTeam: action.turnTeam };
    case types.NEW_CARDS:
      return { ...state, cards: action.nextCards };
    case types.GAME_OVER:
      return { ...state, gameStillPlaying: false };
    case types.START_NEW_GAME: 
      const newGameState = createGame()
      return { ...newGameState }
    case types.FORM_VALUE_UPDATED:
      const { name, value } = action
      return { ...state, clues: { ...state.clues, [name]: value } }
    case types.CLUE_SUBMITTED:
      const listToAddClueTo = state.turnTeam ? "redTeamPreviousClues" : "blueTeamPreviousClues"
      const { word, number } = state.clues
      return {
        ...state,
        clues: {
          ...state.clues,
          word: "",
          number: "",
          [listToAddClueTo]: state.clues[listToAddClueTo].concat({
            word,
            number
          })
        }
      };
    case types.REMOVE_FROM_TOTAL:
      const { currentCard, totals } = action
      return {
        ...state,
        totals: {
          ...totals,
          [currentCard.team]: totals[currentCard.team] - 1
        }
      };
    default:
      return state;
  }
}

const updateStoredState = state => {
}

const CodenamesContext = createContext();
const initialState = createGame()

const CodenamesProvider = props => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState) 
  updateStoredState(state)
  
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
  CLUE_SUBMITTED: "CLUE_SUBMITTED"
};

export { CodenamesProvider, useGameState, types };