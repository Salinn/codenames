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

  it('When a clue is flipped over ', () => {
    cy.get('#codenames-card-Death-not-flipped').click()
  })
})
