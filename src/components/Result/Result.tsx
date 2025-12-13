
import { useSettings } from "../../context/setting-context";
import { Award } from 'lucide-react';
import { type IResultsProp } from "../../types/types";
import "./Result.css";

const Result = ({results, onClearResults}: IResultsProp) => {

  const { speedMode } = useSettings()

  if (results.length === 0) return null

  const getBestResult = () => {
    if (!results.length) return null

    return results.reduce((best, current) => {
      const bestScore = (speedMode === "cpm" ? best.zpm : best.wpm) * (best.accuracy / 100)
      const currentScore = (speedMode === "cpm" ? current.zpm : current.wpm) * (current.accuracy / 100)
      return currentScore > bestScore ? current : best
    })
  }

  const bestResult = getBestResult()


  return (
    <div className="results">

      {bestResult && (
          <div className="best-result">
            <div className="best-icon">
              <Award size={90} style={{ color: "#FFD700" }} />
            </div>
            <div className="best-stats">
              <span className="speed">
                {speedMode === "cpm" ? bestResult.zpm : bestResult.wpm} {speedMode === "cpm" ? "CPM" : "WPM"}
              </span>
              <span className="accuracy">
                {bestResult.accuracy} %
              </span>
            </div>
            <div className="best-date">
              {new Date(bestResult.date).toLocaleDateString()}
            </div>
          </div>
      )}

      <div className="results-header">
        <h4>Rychlost</h4>
        <h4>Přesnost</h4>
        <h4>Chyby</h4>
        <h4>Datum</h4>
      </div>
          {results.map((res, inx) => (
            <ul className="results-table" key={inx} >
              <li>{speedMode === "cpm" ? res.zpm : res.wpm} {`${speedMode === "cpm" ? "CPM" : "WPM"}`}</li>
              <li>{res.accuracy} %</li>
              <li>{res.mistakes}</li>
              <li>{new Date(res.date).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</li>
            </ul>
          ))}
      <button className="results__clear" onClick={onClearResults}>Vymazat výsledky</button>
    </div>
  );
};

export default Result;

