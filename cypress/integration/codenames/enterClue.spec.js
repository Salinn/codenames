/// <reference types="cypress" />

context('Enter Clue', () => {
  beforeEach(() => {
    cy.visit('/games/codenames?name=test&number=1')
    cy.get("#codenames-enterClueButton").click()
  })

  it("Has the correct title", () => {
    cy.get("#codenames-enterClueTitle").should("have.text", "Blue Team Spy Master Enter Your Guess")
  })

  it('Can enter a clue and a number', () => {
    cy.get("#codenames-clueWordInput").type("Starwars")
    cy.get("#codenames-clueNumberInput").type("2")
    cy.get("#codenames-submitClueButton").click()
    cy.get("#codenames-clueModal").should("not.be.visible")
    cy.get('#codenames-blueTable').contains('td', 'Starwars').should('be.visible');
    cy.get('#codenames-blueTable').contains('td', '2').should('be.visible');
  })

  it('Shows an error when only entering a clue', () => {
    cy.get("#codenames-clueWordInput").type("Starwars")
    cy.get("#codenames-submitClueButton").click()
    cy.get("#codenames-clueNumberError").should("have.text", "Please fill in a number greater than 0")
    cy.get("#codenames-clueModal").should("be.visible")
  })

  it('Shows an error when only entering a number', () => {
    cy.get("#codenames-clueNumberInput").type("2")
    cy.get("#codenames-submitClueButton").click()
    cy.get("#codenames-clueWordError").should("have.text", "Please fill in a word")
    cy.get("#codenames-clueModal").should("be.visible")
  })
})
