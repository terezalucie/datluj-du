import { useEffect, useState } from 'react';
import { type IGameResult } from './types/types';
import Stage from './components/Stage/Stage';
import Result from './components/Result/Result';
import "./components/Stage/Stage.css"


const App = () => {
  const [results, setResults] = useState<IGameResult[]>([])
  const [isVisibleResults, setIsVisibleResults] = useState(true)

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
    <div className="container">
      <h1>Datlování</h1>
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
  );
};

export default App;
