/// <reference types="cypress" />

context('Create New Game', () => {
  beforeEach(() => {
    cy.visit('/games/codenames?name=test&number=1')
    cy.get("#codenames-newGameButton").click()
  })

  it('Upticks url to next game number', () => {
    cy.url().should("eq", "http://localhost:3000/games/codenames?name=test&number=2")
  })

  it('Has correct set of new expected cards', () => {
    const words = ["Concert", "Antarctica", "Tokyo", "Charge", "Watch", "Light", "Bugle", "Button", "Laser", "Washer", "Cook" ,"Helicopter", "Slug", "Screen", "Olympus", "Theater" ,"Berry", "Phoenix", "Pupil", "Mail", "Chocolate" ,"Wave", "Server", "Tie", "Time"]
    words.forEach(word => {
      const label = word.match(/[A-Z][a-z]+/g).join(" ")
      cy.get(`#codenames-card-${word}-not-flipped`).should("have.text", label)
      cy.get(`#codenames-card-${word}-flipped`).should("not.be.visible")
    })
  })

  it("Has the correct title", () => {
    cy.get("#codenames-title").should("have.text", "Blue's Spy Master Enter New Clue")
  })

  it("Has the correct number of cards for each team", () => {
    cy.get("#codenames-blueTotalCardsLeft").should("have.text", "Blue: 9")
    cy.get("#codenames-redTotalCardsLeft").should("have.text", "Red: 8")
    cy.get("#codenames-assassinTotalCardsLeft").should("have.text", "Assassin: 1")
    cy.get("#codenames-neutralTotalCardsLeft").should("have.text", "Neutral: 7")
  })
})
