import './Style.scss';
import { calculateWinner } from './Winner';
import { useState } from 'react';
import Bord from './components/Bord';
import History from './components/History';
import StatusManagment from './components/StatusManagment';

const New_Game = [{ squares: Array(9).fill(null), isXNext: false }];

const App = () => {
  const [history, sethistory] = useState(New_Game);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBord = history[currentMove];

  const { winner, winningSquare } = calculateWinner(gamingBord.squares);

  const handleSquareClick = clickedPosition => {
    if (gamingBord.squares[clickedPosition] || winner) {
      return;
    }

    sethistory(currentHistory => {
      const isTravarsing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTravarsing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextGamingState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? `X` : `O`;
          }
          return squareValue;
        }
      );

      const base = isTravarsing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextGamingState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    // setIsXNext((clicking)=>!clicking)
    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGameStart = () => {
    sethistory(New_Game);
    setCurrentMove(0);
  };
  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <StatusManagment winner={winner} gamingBord={gamingBord} />
      <Bord
        winningSquare={winningSquare}
        handleSquareClick={handleSquareClick}
        squares={gamingBord.squares}
      />

      <button
        className={`btn-reset ${winner ? 'active' : ''}`}
        type="button"
        onClick={onNewGameStart}
      >
        Start new game
      </button>
      <h2>Current history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
};

export default App;
