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
  endTurn()
  cy.get("#codenames-enterClueButton").click();
  cy.get("#codenames-clueWordInput").type(word);
  cy.get("#codenames-clueNumberInput").type(number);
  cy.get("#codenames-submitClueButton").click();
}
const endTurn = () => {
  cy.get("#codenames-buttons").then((div) => {
    console.log("div", div)
    if (div.find("#codenames-endTurnButton").length) {
      cy.get("codenames-endTurnButton").click();
    }
  })
}

Cypress.Commands.add("enterClue", enterClue)
Cypress.Commands.add("clickCards", props => { 
  const { cards } = props
  
  cards.forEach(word => {
    enterClue({});
    const { id, label, flipped } = word;
    const labelId = label.split(" ").join("");
    if(!flipped) {
      cy.get(`#codenames-card-${labelId}-not-flipped`).click();
    }
  })
})


Cypress.Commands.add("clickTeamCards", props => {
  const { teams=[], cards=[] } = props

  enterClue({ number: teams.length, word: "Movies" })

  teams.map(team => {
    cy.get("#codenames-cardsSection").find(`[data-team=${team}]`).then(cards=> {
      const [firstCard] = cards
      console.log("cards",cards)
      console.log("firstCard", firstCard);
      firstCard.click()
    })
  })
})

Cypress.Commands.add("getSessionStorage", (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key));
});

Cypress.Commands.add("setSessionStorage", (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value);
  });
});

Cypress.Commands.add('endTurn', endTurn)