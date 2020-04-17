import { wordsToCards, pickStartingTeam } from "../utils/Game";
import { pickWords } from "../assets/words";
import { determineNextTurnInfo, capitalize } from "../utils/CodenameUtils";
import { types } from "../context/Codenames"

export const createGame = (props) => {
  let gameName = "";
  let gameNumber = "";
  let gameVersion = "";

  if (props) {
    gameName = props.gameName;
    gameNumber = props.gameNumber;
    gameVersion = props.gameVersion
  } else {
    const params = new URLSearchParams(window.location.search);
    gameName = params.get("name");
    gameVersion = params.get("version") || 'normal';
    gameNumber = parseInt(params.get("number"), 10);
  }

  const words = pickWords({ gameName, gameNumber, gameVersion });
  const startingTeam = pickStartingTeam({ gameName, gameNumber });
  const startingCards = wordsToCards({
    words,
    startingTeam,
    gameName,
    gameNumber,
  });
  const redStarts = startingTeam === "red";
  const blueStarts = startingTeam === "blue";
  const startingTotals = {
    assassin: 1,
    red: redStarts ? 9 : 8,
    blue: blueStarts ? 9 : 8,
    none: 7,
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
      version: gameVersion
    },
    turnMessaging: `${capitalize(startingTeam)}'s Spy Master Enter New Clue`,
    winningMessage: "",
    clues: {
      showModal: false,
      guesses: 0,
      word: "",
      number: "",
      redTeamPreviousClues: [],
      blueTeamPreviousClues: [],
    },
  };
  return initialState;
};

export default (state, action) => {
  switch (action.type) {
    case types.TOGGLE_SPY:
      return { ...state, spyToggled: !state.spyToggled };
    case types.UPDATE_GAME_TURN:
      return {
        ...state,
        turnTeam: action.turnTeam,
        clues: {
          ...state.clues,
          guesses: action.guesses,
        },
      };
    case types.NEW_CARDS:
      return { 
        ...state, 
        cards: action.nextCards, 
        ...determineNextTurnInfo({
          ...state,
          dispatch: action.dispatch,
        })
      };
    case types.GAME_OVER:
      return { ...state, gameStillPlaying: false };
    case types.CLOSED_MODAL:
      return {
        ...state,
        clues: {
          ...state.clues,
          showModal: false,
        },
      };
    case types.START_NEW_GAME:
      return createGame({
        gameName: state.gameInfo.name,
        gameNumber: state.gameInfo.number + 1,
        gameVersion: state.gameInfo.version
      });
    case types.FORM_VALUE_UPDATED:
      return {
        ...state,
        clues: { ...state.clues, [action.name]: action.value },
      };
    case types.CLUE_SUBMITTED:
      const listToAddClueTo =
        state.turnTeam === "red"
          ? "redTeamPreviousClues"
          : "blueTeamPreviousClues";
    
      const nextStateClueSubmitted = {
        ...state,
        clues: {
          ...state.clues,
          showModal: false,
          guesses: parseInt(state.clues.number) + 1,
          word: "",
          number: "",
          [listToAddClueTo]: state.clues[listToAddClueTo].concat({
            word: state.clues.word,
            number: state.clues.number,
          }),
        },
      };
  
      return {
        ...nextStateClueSubmitted,
        ...determineNextTurnInfo({
          ...nextStateClueSubmitted,
          dispatch: action.dispatch,
        }),
      };
    case types.REMOVE_FROM_TOTAL:
      const { currentCard, totals } = action;
      return {
        ...state,
        totals: {
          ...totals,
          [currentCard.team]: totals[currentCard.team] - 1,
        },
      };
    case types.PASS_ON_TURN:
      const turnTeam = state.turnTeam === "red" ? "blue" : "red";
      return {
        ...state,
        turnTeam,
        clues: {
          ...state.clues,
          guesses: 0,
        },
      };
    case types.ENTER_NEW_CLUE: {
      return {
        ...state,
        clues: {
          ...state.clues,
          showModal: true,
        },
      };
    }
    default:
      return state;
  }
};
