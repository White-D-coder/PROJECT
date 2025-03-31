import { useState } from 'react'
import Home from './components/Home';
import PlayGame from './components/PlayGame';
import EndGame from './components/EndGame';
import './App.css'
import React, { useEffect} from 'react';
import spooky from './spooky.mp3';
function App() {
  const audio = new Audio(spooky);
  audio.loop = true;
  audio.volume = 0.3;
  audio.play();
  const [statusGame, setStatusGame] = useState(null);
  const [score, setScore] = useState(null);
  
  useEffect(() => {
    if(statusGame === 'playing'){
      setScore({
        right: 0,
        wrong: 0
      });
      const timeOutGame = setTimeout(() => {
        setStatusGame('endGame');
      }, 60000);
      return () => clearTimeout(timeOutGame);
    }
  }, [statusGame])


  const handleChangeStatusGame = (status = 'playing') => {
    setStatusGame(status);
  } 
  const handleChangeScore = (type = 1) => {
    if(type === 1){
      setScore({...score, 
        right: score.right + 1
      });
    }else{
      setScore({...score, 
        wrong: score.wrong + 1
      });
    }
  }
  

  let showMain;
  switch (statusGame) {
    case 'playing':
      showMain = <PlayGame onGame={ handleChangeStatusGame } onChangeScore = { handleChangeScore }/>
      break;
    case 'endGame':
      showMain = <EndGame onGame={ handleChangeStatusGame } score = { score }/>
      break;
    default:
      showMain =  <Home onGame={ handleChangeStatusGame } />
      break;
  }
  
  return (
    <>
      <div className="App">
        
        {  showMain }
      </div>
    </>
  )
}
export default App
