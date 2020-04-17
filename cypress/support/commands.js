// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const enterClue = props => {
  const { 
    word = "Animal", 
    number = "2"
  } = props
  cy.get("#codenames-enterClueButton").click();
  cy.get("#codenames-clueWordInput").type(word);
  cy.get("#codenames-clueNumberInput").type(number);
  cy.get("#codenames-submitClueButton").click();
}

const endTurn = () => {
  cy.get("#codenames-endTurnButton").click();
}

const clickTeamCards = props => {
  const { teams=[] } = props

  enterClue({ number: teams.length, word: "Movies" })

  teams.forEach(team => {
    cy.get("#codenames-cardsSection").find(`[data-team=${team}]`).then(cards=> {
      const [firstCard] = cards
      firstCard.click()
    })
  })
}

const skipNextTurn = () => {
  enterClue({})
  endTurn()
}

Cypress.Commands.add("enterClue", enterClue)
Cypress.Commands.add("endTurn", endTurn)
Cypress.Commands.add("clickTeamCards", clickTeamCards)
Cypress.Commands.add("skipNextTurn", skipNextTurn)
