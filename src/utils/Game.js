export const wordsToCards = props => {
  const { words, startingTeam } = props
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

  const shuffledCards = cards.sort((a, b) => 0.5 - Math.random());
  return shuffledCards
}

/// I need to track the clue and number for each team

const pickTeam = props => {
  const { totals } = props

  const totalValidCategories = Object.keys(totals).length || 0
  const randomInt = getRandomInt(totalValidCategories)

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

export const pickStartingTeam = () => {
  const randomInt = getRandomInt(2)
  const RED_TEAM_STARTS = randomInt===1

  if(RED_TEAM_STARTS) {
    return "red"
  }
  return "blue"
}

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
}
