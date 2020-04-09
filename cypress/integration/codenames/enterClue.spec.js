/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/games/codenames?name=test&number=1')
  })

  // https://on.cypress.io/interacting-with-elements

  it('Can Enter Clue', () => {
    cy.get("#codenames-enterClueButton").click()
    cy.get("#codenames-clueWordInput").type("Starwars")
    cy.get("#codenames-clueNumberInput").type("2")
    cy.get("#codenames-submitClueButton").click()
    cy.get('#codenames-blueTable').contains('td', 'Starwars').should('be.visible');
    cy.get('#codenames-blueTable').contains('td', '2').should('be.visible');
  })

  it('Can Enter Clue', () => {
    cy.get("#codenames-enterClueButton").click()
    cy.get("#codenames-clueWordInput").type("Starwars")
    cy.get("#codenames-submitClueButton").click()
    cy.get("#codenames-clueNumberError").should("have.text", "Please fill in a number greater than 0")
  })

  it('Can Enter Clue', () => {
    cy.get("#codenames-enterClueButton").click()
    cy.get("#codenames-clueNumberInput").type("2")
    cy.get("#codenames-submitClueButton").click()
    cy.get("#codenames-clueWordError").should("have.text", "Please fill in a word")
  })
})
