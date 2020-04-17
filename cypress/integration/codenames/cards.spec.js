/// <reference types="cypress" />

context('Cards', () => {
  let words, generatedWords
  beforeEach(() => {
    words = ["Death", "Dog", "Pit", "Ball", "IceCream", "Lead", "Gold", "Bed", "Princess", "Press", "War" ,"Kid", "Beijing", "Engine", "Stadium", "Disease" ,"Skyscraper", "Superhero", "Antarctica", "Club", "Dragon" ,"Rock", "Pirate", "Bermuda", "Hotel"]
    generatedWords = words.map(word => {
      return {
        label: word.match(/[A-Z][a-z]+/g).join(" "),
        name: word, 
        isFlipped: false
      }
    })
    cy.visit('/games/codenames?name=test&number=1')
  })

  it('Has all of the expected cards', () => {
    generatedWords.forEach(word => {
      const { label, name, } = word
      cy.get(`#codenames-card-${name}-not-flipped`).should("have.text", label)
      cy.get(`#codenames-card-${name}-flipped`).should("not.be.visible")
    })
  })

  it('blue team can win in three turns', () => {
    const firstSetOfGuesses = ["blue", "blue", "blue"];
    const secondSetOfGuesses = ["blue", "blue", "blue"];
    const thirdSetOfGuesses = ["blue", "blue", "blue"];
    cy.clickTeamCards({ teams: firstSetOfGuesses });
    cy.endTurn()
    cy.skipNextTurn();
    cy.clickTeamCards({ teams: secondSetOfGuesses });
    cy.endTurn()
    cy.skipNextTurn();
    cy.clickTeamCards({ teams: thirdSetOfGuesses });
    cy.get("#codenames-title").should("have.text", "WAY TO GO BLUE TEAM!")
  })
})
