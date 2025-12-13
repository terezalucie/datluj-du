import { useEffect, useRef, useState } from 'react';
import { type IGameResult } from './types/types';
import Stage from './components/Stage/Stage';
import Result from './components/Result/Result';
import { SunMedium } from 'lucide-react'
import { Moon, Pause, Play } from 'lucide-react'
import { SettingsContext, type SettingsStructure } from './context/setting-context';

import "./App.css"

type Settings = Pick<SettingsStructure, "theme" | "speedMode">

const App = () => {
  const [results, setResults] = useState<IGameResult[]>([])
  const [isVisibleResults, setIsVisibleResults] = useState(true)
  const [settings, setSettings] = useState<Settings>({theme: "dark", speedMode: "cpm"})
  const [playing, setPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null!)

  useEffect(() => {
    document.body.setAttribute("data-theme", settings.theme)
  }, [settings.theme])

  useEffect(() => {
    if(playing){
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [playing])


  const setTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light"
    }));
  }

  const setSpeedMode = () => {
      setSettings(prev => ({
        ...prev,
        speedMode: prev.speedMode === "cpm" ? "wpm" : "cpm",
    }))
  }

  useEffect(() => {
    const stored = localStorage.getItem("typingResults")
    if (stored) {
      setResults(JSON.parse(stored))
    }
  }, [])

  const addResult = (result: IGameResult) => {
    setResults(prev => {
      const updated = [result, ...prev]
      localStorage.setItem("typingResults", JSON.stringify(updated))
      return updated
    })
  }

  const clearResults = () => {
    localStorage.removeItem("typingResults")
    setResults([])
  }

  return (
    <SettingsContext.Provider value={{...settings, setTheme, setSpeedMode}}>
      <div className="container">
        <div className="header">
          <h1>Datlování</h1>
         <div className="toogle-buttons">
            <div className="audio-toggle">
              <audio
                src="/peaceful-852-hz-392669.mp3"
                ref={audioRef}
              />
              <button
                onClick={() => setPlaying(prev => !prev)}
                className="toggle-btn audio-toggle-btn"
                aria-pressed={playing}
              >
                {playing ? <Pause /> : <Play />}
              </button>
            </div>
            <button
              className="toggle-btn speed-toggle"
              onClick={setSpeedMode}
            >
              {settings.speedMode}
            </button>
            <button
              className="toggle-btn theme-toggle"
              onClick={setTheme}
            >
              {settings.theme === "light" ? <Moon /> : <SunMedium />}
            </button>
          </div>
        </div>

        <Stage onGameFinished={addResult} />
      
        {results.length !== 0 && 
        <div className="results__toggle-container">
          <button 
            className='results__toggle' 
            onClick={() => setIsVisibleResults(prev => !prev)}>{isVisibleResults ? "Skrýt výsledky" : "Zobrazit výsledky"}
          </button>
        </div>
        }
        
        {isVisibleResults && <Result results={results} onClearResults={clearResults}  />}
      </div>
    </SettingsContext.Provider>
  );
};

export default App;
