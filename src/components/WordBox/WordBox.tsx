import { useEffect, useState } from 'react'
import { type IWord, type IWordboxProp } from '../../types/types'
import "./WordBox.css"
import "../../index.css"

const Wordbox  = ({ word, active, isPlaying, onFinish, onMistake, onLetterTyped,
 }: IWordboxProp) => {
  
  const [letters, setLetters] = useState<IWord>({
    id: word.id,
    left: word.left, 
    typed: word.typed,
  })
  const [mistake, setMistake] = useState(false)  

    useEffect(() => {
      setLetters({
        id: word.id,
        left: [...word.left],
        typed: [...word.typed],
      });
      setMistake(false)
    }, [word])
  
    useEffect(() => {
    if (!active || !isPlaying) return;

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!active) return
      const key = e.key

      if (key === letters.left[0]) {
        setLetters(prev => ({
          id: prev.id,
          typed: [...prev.typed, prev.left[0]],
          left: prev.left.slice(1)
        }))
        setMistake(false)
        onLetterTyped()

        if (letters.left.length === 1) {
          onFinish()
        }
      } else if (key.length === 1 && key.match(/[a-z]/i) && key !== letters.left[0] && !mistake) {
        setMistake(true)
        onMistake()
      }
    }

  document.addEventListener('keyup', handleKeyUp)
  return () => document.removeEventListener('keyup', handleKeyUp)

}, [active, isPlaying, letters.left, mistake])


  return (
    <div className={`wordbox ${active ? "word--active" : ""}`}>
      {letters.typed.map((l, i) => <span key={`${l}-${i}`} className="letter---typed">{l}</span>)}
      {letters.left.map((l, i) => 
        <span 
          key={`${l}-${i}`} 
          className={`
            ${i === 0 && active ? "letter---current" : "letter---left"}
            ${active && mistake && i === 0  ? "letter---mistake" : ""}`
          }>
            {l}
        </span>)}
    </div>
  );
};

export default Wordbox;
