import { wordsToCards, pickStartingTeam } from "../utils/Game";
import { pickWords, pickVersion } from "../assets/words";
import { determineNextTurnInfo, capitalize } from "../utils/CodenameUtils";
import { types } from "../context/Codenames"

export const createGame = (props) => {
  let gameName = "";
  let gameNumber = "";
  let gameVersion = "";
  let unusedWords = [];
  let words = []
  let simulateGames = false
  let gamesToSimulate = 0
  let usedWords = [];

  if (props) {
    gameName = props.gameName;
    gameNumber = props.gameNumber;
    gameVersion = props.gameVersion
    words = props.unusedWords
    gamesToSimulate = props.gamesToSimulate - 1
    simulateGames = gameNumber > 1;
    usedWords = props.usedWords;
  } else {
    const params = new URLSearchParams(window.location.search);
    gameName = params.get("name");
    gameVersion = params.get("version") || 'normal';
    gameNumber = parseInt(params.get("number"), 10);
    words = pickVersion(gameVersion);
    simulateGames = gameNumber > 1
    gamesToSimulate = gameNumber - 1
    gameNumber = 1
  }
  if (words.length < 25) {
    words = words.concat(usedWords);
  }

  const shuffledWords = pickWords({ gameName, gameNumber, words });
  const gameWords = shuffledWords.slice(0, 25);
  unusedWords = shuffledWords.slice(25, shuffledWords.length);
  const startingTeam = pickStartingTeam({ gameName, gameNumber });
  const startingCards = wordsToCards({
    words: gameWords,
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
    unusedWords, 
    usedWords: usedWords.concat(shuffledWords),
    gamesToSimulate,
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

  if (gamesToSimulate > 0 && simulateGames) {
    return createGame({
      gameName: initialState.gameInfo.name,
      gameNumber: initialState.gameInfo.number + 1,
      gameVersion: initialState.gameInfo.version,
      unusedWords: initialState.unusedWords,
      usedWords: initialState.usedWords,
      gamesToSimulate,
    });
  } else {
    return initialState;
  }
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
        gameVersion: state.gameInfo.version,
        unusedWords: state.unusedWords,
        usedWords: state.usedWords,
        gamesToSimulate: state.gamesToSimulate,
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
      const nextStateCluePassed = {
        ...state,
        turnTeam,
        clues: {
          ...state.clues,
          guesses: 0,
        },
      };

      return {
        ...nextStateCluePassed,
        ...determineNextTurnInfo({
          ...nextStateCluePassed,
          dispatch: action.dispatch,
        }),
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
