import React from "react"

import { useGameState } from "../../../context/Codenames";

const SidePanel = (props) => {
  const [state] = useGameState();
  const { gameStillPlaying, turnTeam, spyToggled, totals } = state;
  const redsTurn = turnTeam === "red";
  const bluesTurn = turnTeam === "blue";
  const gameIsOver = !gameStillPlaying;

  const teams = [
    {
      previousClues: "redTeamPreviousClues",
      showClues: redsTurn || gameIsOver,
      teamName: "Red's",
      simpleName: "red",
      headerColor: "danger",
    },
    {
      previousClues: "blueTeamPreviousClues",
      showClues: bluesTurn || gameIsOver,
      teamName: "Blue's",
      simpleName: "blue",
      headerColor: "primary",
    },
  ];
  const teamsTableInfo = teams.reduce((tableInfo, team) => {
    const rows =
      state.clues[team.previousClues]
      .slice()
      .reverse()
      .map((clue, index) => {
        const { word, number } = clue;
        return (
          <tr key={`${word}-${number}-${index}`}>
            <td>{word}</td>
            <td>{number}</td>
          </tr>
        );
      })
    return tableInfo.concat({ ...team, rows })
  }, []);

  const cluesTable = teamsTableInfo.map(team => {
    const { teamName, rows, headerColor, showClues, simpleName } = team;
    return showClues && (
      <table id={`codenames-${simpleName}Table`} key={`${teamName}`} className="table">
        <thead>
          <tr className={`table-${headerColor}`}>
            <th scope="col">{teamName} Clues</th>
            <th scope="col">Number</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
    } );

  const spyMasterMessage = spyToggled && (
    <p>
      Tiles that are lighter than the others have already been guessed by the
      players
    </p>
  );

  return (
    <div className="order-1 order-md-2 col-12 col-md-2">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-12">
            <h5>Remaining Cards</h5>
            <p className="text-primary">Blue: {totals.blue}</p>
            <p className="text-danger">Red: {totals.red}</p>
            <p className="text-dark">Assassin: {totals.assassin}</p>
            <p className="text-muted">Neutral: {totals.none}</p>
          </div>
          <div>
            <p>To make a guess just click the card!</p>
          </div>
          {spyMasterMessage}
          <div className="col-12 pb-3">
            {cluesTable}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SidePanel)