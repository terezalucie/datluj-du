
import { useSettings } from "../../context/setting-context";
import { type IResultsProp } from "../../types/types";
import "./Result.css";

const Result = ({results, onClearResults}: IResultsProp) => {

  const { speedMode } = useSettings()
  if (results.length === 0) return null

  return (
    <div className="results">
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

