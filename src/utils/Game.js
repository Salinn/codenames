export const shuffle = (array, seed) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    seed = seed || 1;
    let random = function() {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

export const wordsToCards = props => {
  const { words, startingTeam, gameName, gameNumber } = props;
  const redStarts = startingTeam === "red"
  const blueStarts = startingTeam === "blue";
  let totals = {
    assassin: 1,
    red: redStarts ? 9 : 8,
    blue: blueStarts ? 9 : 8,
    none: 7
  };

  const cards = words.map((word, index) => {
    const response = pickTeam({totals})
    const { team, newTotals } = response
    totals = newTotals

    return {
      id: index + 1,
      label: word,
      flipped: false,
      team
    }
  })

  return shuffle(cards, nameToSeed({ name: gameName, number: gameNumber }));
}

/// I need to track the clue and number for each team

const pickTeam = props => {
  const { totals } = props
  const randomInt = 0

  return Object.keys(totals).reduce(
    (updatedInfo, key, index) => {
      const CORRECT_CATEGORY = index === randomInt;
      const WILL_EQUAL_ZERO = totals[key] - 1 === 0
      if (CORRECT_CATEGORY && WILL_EQUAL_ZERO) {
        const { [key]: useLessValue, ...newTotalsMinusOne } = totals;
        return { newTotals: newTotalsMinusOne, team: key };
      } else if (CORRECT_CATEGORY) {
        const newTotals = { ...totals, [key]: totals[key] - 1 };
        return { newTotals, team: key };
      } 
      return updatedInfo;
    },
    { }
  );
}

export const pickStartingTeam = props => {
  const { gameName, gameNumber } = props
  const randomOrder = shuffle([1,2], nameToSeed({name: gameName, number: gameNumber}))

  const RED_TEAM_STARTS = randomOrder[0] === 1;

  if(RED_TEAM_STARTS) {
    return "red"
  }
  return "blue"
}

export const nameToSeed = ({ name="abc", number=1}) => {
  const wordTotal = name.split('').reduce((sum, letter, index) => {
    return sum + name.charCodeAt(index);
  }, 0)

  return number + wordTotal
}