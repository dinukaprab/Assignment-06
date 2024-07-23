import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ClickCard from "/src/components/ClickCard/ClickCard";
import DetailsCard from "/src/components/DetailsCard/DetailsCard";
import "src/App.css";

function App() {
  const [showDetailsCard, setShowDetailsCard] = useState(false);

  const handleCardNicClick = () => {
    setShowDetailsCard(true);
  };

  const handleDetailsCardClose = () => {
    setShowDetailsCard(false);
  };

  return (
    <div className="app">
      <TransitionGroup>
        <CSSTransition
          key={showDetailsCard ? "details" : "click"}
          timeout={300}
          classNames="fade"
        >
          {showDetailsCard ? (
            <DetailsCard handleClose={handleDetailsCardClose} />
          ) : (
            <ClickCard handleClick={handleCardNicClick} />
          )}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
