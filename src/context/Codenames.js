import React, { createContext, useReducer, useContext } from "react";
import { wordsToCards, pickStartingTeam } from "../utils/Game";
import { pickWords } from "../assets/words";

const createGame = props => {
  let gameName = ""
  let gameNumber = ""

  if(props) {
    gameName = props.gameName
    gameNumber = props.gameNumber
  } else {
    const params = new URLSearchParams(window.location.search);
    gameName = params.get("name");
    gameNumber = parseInt(params.get("number"), 10);
  }

  const words = pickWords({ gameName, gameNumber });
  const startingTeam = pickStartingTeam({ gameName, gameNumber });
  const startingCards = wordsToCards({
    words,
    startingTeam,
    gameName,
    gameNumber
  });
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
    gameInfo: { 
      name: gameName,
      number: gameNumber,
    },
    clues: {
      showModal: false,
      guesses: 0,
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
      return {
        ...state,
        turnTeam: action.turnTeam,
        clues: {
          ...state.clues,
          guesses: action.guesses
        }
      };
    case types.NEW_CARDS:
      return { ...state, cards: action.nextCards };
    case types.GAME_OVER:
      return { ...state, gameStillPlaying: false };
    case types.CLOSED_MODAL:
      return {
        ...state,
        clues: {
          ...state.clues,
          showModal: false
        }
      };
    case types.START_NEW_GAME:
      const { gameInfo } = state
      const newGameState = createGame({
        gameName: gameInfo.name,
        gameNumber: gameInfo.number + 1
      });
      return { ...newGameState };
    case types.FORM_VALUE_UPDATED:
      const { name, value } = action;
      return { ...state, clues: { ...state.clues, [name]: value } };
    case types.CLUE_SUBMITTED:
      const listToAddClueTo =
        state.turnTeam === "red"
          ? "redTeamPreviousClues"
          : "blueTeamPreviousClues";
      const { word, number } = state.clues;
      return {
        ...state,
        clues: {
          ...state.clues,
          showModal: false,
          guesses: parseInt(number) + 1,
          word: "",
          number: "",
          [listToAddClueTo]: state.clues[listToAddClueTo].concat({
            word,
            number
          })
        }
      };
    case types.REMOVE_FROM_TOTAL:
      const { currentCard, totals } = action;
      return {
        ...state,
        totals: {
          ...totals,
          [currentCard.team]: totals[currentCard.team] - 1
        }
      };
    case types.PASS_ON_TURN:
      const turnTeam = state.turnTeam === "red" ? "blue" : "red";
      return {
        ...state,
        turnTeam,
        clues: {
          ...state.clues,
          guesses: 0
        }
      };
    case types.ENTER_NEW_CLUE: {
      return {
        ...state,
        clues: {
          ...state.clues,
          showModal: true
        }
      };
    }
    default:
      return state;
  }
}

const updateStoredState = async state => {
  
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
  CLUE_SUBMITTED: "CLUE_SUBMITTED",
  PASS_ON_TURN: "PASS_ON_TURN",
  ENTER_NEW_CLUE: "ENTER_NEW_CLUE",
  CLOSED_MODAL: "CLOSED_MODAL"
};

export { CodenamesProvider, useGameState, types };