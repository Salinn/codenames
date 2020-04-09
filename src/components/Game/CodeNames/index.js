import React from "react"

import Header from "./Header"
import Rules from "./Rules"
import ClueModal from "./ClueModal"
import Cards from "./Cards"

const CodeNames = props => {

  return (
    <div className="container-fluid">
      <div className="row no-gutters">
        <Header />
        <Cards/>
        <Rules />
      </div>
      <ClueModal />
    </div>
  );
}

export default React.memo(CodeNames)