import { useRef, useState } from 'react';
import './App.css';
import heartLoveMain from './assets/gifs/heartLoveMain.gif';
import heartLoveSecond from './assets/gifs/heartLoveSecond.gif';
import pop from './assets/sounds/Pop-Sound.mp3';
import wedding from './assets/sounds/Wedding-Sound.mp3';
import Confetti from 'react-confetti';

function App() {
  const [size, setSize] = useState(32); // Valor a incrementar para el botón
  const [position, setPosition] = useState({ x: 0, y: -40 }); 
  const [showConfetti, setShowConfetti] = useState(false); // Estado para controlar la animación de confeti
  const gifRef = useRef(null);  // Referencia al gif para cambiarlo
  const h1Ref = useRef(null);   // Referencia al h1 para cambiarlo

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  }

  // Función para mover el botón "No" a una posición aleatoria
  const translateButton = () => {
    const x = Math.random() * 200;
    const y = Math.random() * 200;

    setPosition({ x, y });

    // Aumentar el tamaño del botón "Sí"
    setSize(prevSize => prevSize + 5);

    // Reproducir sonido
    playSound(pop);
  };

  // Función para cambiar el gif y el texto del h1
  const changeGif = () => {
    if (gifRef.current){
      gifRef.current.src = heartLoveSecond;
      h1Ref.current.innerHTML = '¡Sabía que dirías que sí! 🥰';
      setShowConfetti(true);
      playSound(wedding);
    }
  }

  return (
    <div className='container'>
      <h1 ref={h1Ref}>¿Quieres ser mi valentín?</h1>

      <div className="buttons-container">
        <button 
          id='btn-si' 
          style={{ fontSize: `${size}px`, position: 'absolute', left: '-80px', top: '-40px' }}
          onClick={changeGif}>Sí</button>
        <button
          id='btn-no'
          onClick={translateButton}
          style={{ fontSize: `32px`, position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
        >
          No
        </button>

        <div className='gifs-container'>
          <img ref={gifRef} src={heartLoveMain} alt="gif" />
        </div>
      </div>

      {showConfetti && <Confetti />}
    </div>
  );
}

export default App;