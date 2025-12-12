import { useEffect, useState } from 'react';
import { type IGameResult } from './types/types';
import Stage from './components/Stage/Stage';
import Result from './components/Result/Result';
import { SunMedium } from 'lucide-react'
import { Moon } from 'lucide-react'
import { SettingsContext, type SettingsStructure } from './context/setting-context';

import "./App.css"

type Settings = Pick<SettingsStructure, "theme" | "speedMode">

const App = () => {
  const [results, setResults] = useState<IGameResult[]>([])
  const [isVisibleResults, setIsVisibleResults] = useState(true)
  const [settings, setSettings] = useState<Settings>({theme: "dark", speedMode: "cpm"})

  useEffect(() => {
    document.body.setAttribute("data-theme", settings.theme)
  }, [settings.theme])


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
            <button className="speed-toggle" onClick={setSpeedMode}>
              {settings.speedMode}
            </button>
            <button className="theme-toggle" onClick={setTheme}>
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
