import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [sentence, setSentence] = useState("");

  const updateSentence = () => {
    let now = new Date();
    if (now.getDay() !== 5) {
      setSentence("Pas vraiment, non.");
    } else {
      if (now.getHours() < 15) {
        setSentence("T'as encore le temps de travailler, t'inquiète.");
      } else if (now.getHours() < 17) {
        setSentence("Ne commence rien, attends patiemment le close-off.");
      } else if (now.getHours() < 18 && now.getMinutes() < 25) {
        let difference = 30 - now.getMinutes();
        setSentence(`Normalement dans ${difference} minutes (crois-y).`);
      } else if (now.getHours() < 18) {
        setSentence(`Close-off dans 5'.`);
      } else {
        setSentence("Là c'est bizarre quand même...");
      }
    }
  };

  useEffect(() => {
    updateSentence();
    const interval = setInterval(updateSentence, 60 * 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <header className="App-header">
        <p className="sentence">{sentence}</p>
      </header>
    </div>
  );
}

export default App;
