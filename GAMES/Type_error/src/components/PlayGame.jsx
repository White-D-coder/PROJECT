import { useEffect, useState } from "react";
const PlayGame = ({ onChangeScore}) => {
  const [defaultData] = useState('In the cold abyss of space, where stars flicker like dying embers, the devil waits in the shadows of the unknown. Time twists, reality fractures, and whispers of forgotten souls echo through the void. Out here, beyond the reach of light, even the bravest must face the darkness within. Will you dare to confront the horrors that lurk in the depths of the cosmos? The universe is a cruel mistress, and in her embrace, the line between sanity and madness blurs. As you drift through the endless night, remember: the devil is not just a figure of legend; he is the embodiment of your deepest fears, lurking just beyond the edge of reason. Embrace the chaos, for in this cosmic dance of shadows, only the strongest will survive. The game begins...');
  const [dataTyping, setDataTyping] = useState([]);
  const [textTyping, setTextTyping] = useState({
    value: '',
    position: 0
  });
    useEffect(() => {
      const addWord = (quantityAdd = 20) => {
        const arrayDefaultData = defaultData.split(' ');
        const gamingText = [];
        for (let index = 0; index < quantityAdd; index++) {
          const positionRandom = Math.floor(Math.random() * arrayDefaultData.length); 
          gamingText.push({
            value: arrayDefaultData[positionRandom],
            status: null
          });
        }
        setDataTyping(gamingText);
      }
      if(dataTyping.length === 0 || textTyping.position > (dataTyping.length - 1)){
        addWord();
        setTextTyping({...textTyping, position: 0});
      }
      const inputElement = document.querySelector('.inputForm input');
      if (inputElement) {
        inputElement.setAttribute('placeholder', 'Type your note');
      }
    }, [textTyping.position, dataTyping.length, defaultData, textTyping])
    const handleChangeTyping = e => {
        const valueInput = e.target.value;
        if(!valueInput.includes(' ')){
          setTextTyping({...textTyping, value: valueInput});
        }else if(textTyping.value !== ''){
          checkResult();
        }
    } 
    const checkResult = () => {
      const dataCheck = dataTyping;
      if(textTyping.value === dataCheck[textTyping.position].value){
        dataCheck[textTyping.position].status = true;
        onChangeScore(1);
      }else{
        dataCheck[textTyping.position].status = false;
        onChangeScore(-1);
      }
      setDataTyping(dataCheck);
      setTextTyping({value: '', position: textTyping.position + 1});
    }
  return (
    <div className="playing">
        <ul className="list">
        {
          (dataTyping).map((word, index) => 
            <li key={index} className={
              word.status === true 
              ? 'true' 
              : word.status === false 
              ? 'false'
              : ''
          }>
              {word.value}
          </li>
          )
        }
        </ul>
    <div className="inputForm">
      <input type="text" autoFocus value={textTyping.value} onChange={handleChangeTyping}/>
    </div>
  </div>
  )
}
export default PlayGame;