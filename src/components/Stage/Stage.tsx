import { useEffect, useState, useRef } from 'react'
import { type IGameResult, type IStageProp, type IWord } from '../../types/types'
import Wordbox from '../WordBox/WordBox'
import { generateWord } from '../../func/func'
import { RotateCcw } from 'lucide-react'
import "./Stage.css"

const Stage = ({ onGameFinished }: IStageProp) => {
  const initialTime = 30
  const iconColor = "#b9b9b9"

  const [words, setWords] = useState<IWord[]>([])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(initialTime)
  const [showOverlay, setShowOverlay] = useState<boolean>(true)

  const mistakesRef = useRef(0)
  const lettersTypedRef = useRef(0)
  const [_, forceRender] = useState(0)

  const startGame = () => {
    setIsPlaying(true)
    mistakesRef.current = 0
    lettersTypedRef.current = 0
    setTimeLeft(initialTime)
    setShowOverlay(false)
    resetWords()
  }

  const resetWords = () => {
    const newWords: IWord[] = Array.from({ length: 3 }, () => {
      const word = generateWord(6) ?? "aaaaaa"
      return { id: crypto.randomUUID(), left: word.split(''), typed: [] }
    })
    setWords(newWords)
  }

  const endGame = () => {
    if (!isPlaying) return
    setIsPlaying(false)
    setShowOverlay(true)

    const totalTyped = lettersTypedRef.current
    const totalMistakes = mistakesRef.current
    const totalChars = totalTyped + totalMistakes
    const accuracy = totalChars > 0 ? Math.round((totalTyped / totalChars) * 100) : 100
    const durationMinutes = (initialTime - timeLeft) / 60
    const zpm = durationMinutes > 0 ? Math.round(totalTyped / durationMinutes) : totalTyped
    const wpm = durationMinutes > 0 ? Math.round((totalTyped / 5) / durationMinutes) : totalTyped / 5

    const newResult: IGameResult = {
      date: new Date().toISOString(),
      mistakes: totalMistakes,
      lettersTyped: totalTyped,
      accuracy,
      zpm,
      wpm
    }

    onGameFinished(newResult)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setTimeLeft(initialTime)
    mistakesRef.current = 0
    lettersTypedRef.current = 0
    resetWords()
    setShowOverlay(true)
  }

  useEffect(() => {
    const handleStart = (e: KeyboardEvent) => {
      if (!isPlaying && e.code === "Enter") {
        e.preventDefault()
        startGame()
      }
    }
    document.addEventListener("keyup", handleStart)
    return () => document.removeEventListener("keyup", handleStart)
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying) return
    const intervalId = setInterval(() => {
      setTimeLeft(prev => Math.max(prev - 1, 0))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      endGame()
    }
  }, [timeLeft, isPlaying])

  const handleFinish = () => {
    const newWord = generateWord(6)
    if (newWord !== null) {
      setWords(prev => [
        ...prev.slice(1),
        { id: crypto.randomUUID(), left: newWord.split(''), typed: [] }
      ])
    }
  }

  return (
    <div className="stage">
      <div className="stage__header">
        <div className="stage__mistakes">{mistakesRef.current}</div>
        <div className="stage__time">{timeLeft}</div>
        <RotateCcw onClick={resetGame} color={iconColor} size={32} />
      </div>

      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            key={word.id}
            word={word}
            active={index === 0}
            isPlaying={isPlaying}
            onFinish={handleFinish}
            onMistake={() => {
              mistakesRef.current += 1
              forceRender(prev => prev + 1)
            }}
            onLetterTyped={() => {
              lettersTypedRef.current += 1
              forceRender(prev => prev + 1)
            }}
          />
        ))}
      </div>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay__content">
            <p>Stiskni <strong>enter</strong> pro spuštění hry</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stage
