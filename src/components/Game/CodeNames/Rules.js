import React from "react"
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const Rules = props => {
  return (
    <div className="col-12">
      <div className="row no-gutters">
        <div className="col-12 col-sm-10 offset-sm-1">
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Click Here To View The Rules
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <div>
                  <p>
                    Codenames is a game of guessing which code names (words) in
                    a set are related to a hint-word given by another player.
                  </p>
                  <p>
                    Players split into two teams: red and blue. One player of
                    each team is selected as the team's spymaster; the others
                    are field operatives.
                  </p>
                  <p>
                    Twenty-five Codename cards, each bearing a word, are laid
                    out in a 5×5 rectangular grid, in random order. A number of
                    these words represent red agents, a number represent blue
                    agents, one represents an assassin, and the others represent
                    innocent bystanders.
                  </p>
                  <p>
                    The teams' spymasters are given a randomly-dealt map card
                    showing a 5×5 grid of 25 squares of various colors, each
                    corresponding to one of the code name cards on the table.
                    Teams take turns. On each turn, the appropriate spymaster
                    gives a verbal hint about the words on the respective cards.
                    Each hint may only consist of one single word and a number.
                    The spymaster gives a hint that is related to as many of the
                    words on his/her own agents' cards as possible, but not to
                    any others – lest they accidentally lead their team to
                    choose a card representing an innocent bystander, an
                    opposing agent, or the assassin.
                  </p>
                  <p>
                    The hint's word can be chosen freely, as long as it is not
                    (and does not contain) any of the words on the code name
                    cards still showing at that time. Code name cards are
                    covered as guesses are made.
                  </p>
                  <p>
                    The hint's number tells the field operatives how many words
                    in the grid are related to the word of the clue. It also
                    determines the maximum number of guesses the field
                    operatives may make on that turn, which is the hint's number
                    plus one. Field operatives must make at least one guess per
                    turn, risking a wrong guess and its consequences. They may
                    also end their turn voluntarily at any point thereafter.
                  </p>
                  <p>
                    After a spymaster gives the hint with its word and number,
                    their field operatives make guesses about which code name
                    cards bear words related to the hint and point them out, one
                    at a time. When a code name card is pointed out, the
                    spymaster covers that card with an appropriate identity card
                    – a blue agent card, a red agent card, an innocent bystander
                    card, or the assassin card – as indicated on the spymasters'
                    map of the grid. If the assassin is pointed out, the game
                    ends immediately, with the team who identified him losing.
                    If an agent of the other team is pointed out, the turn ends
                    immediately, and that other team is also one agent closer to
                    winning. If an innocent bystander is pointed out, the turn
                    simply ends.
                  </p>
                  <p>
                    The game ends when all of one team's agents are identified
                    (winning the game for that team), or when one team has
                    identified the assassin (losing the game).
                  </p>
                  <p>
                    To see the complete pdf{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://czechgames.com/files/rules/codenames-rules-en.pdf"
                    >
                      click here
                    </a>
                  </p>
                </div>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Rules)