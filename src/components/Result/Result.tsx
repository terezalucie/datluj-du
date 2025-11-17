import { type IResultsProp } from "../../types/types";
import "./Result.css";

const Result = ({results, onClearResults}: IResultsProp) => {

  if (results.length === 0) return null

  return (
    <div className="results">
      <h3>Výsledky:</h3>
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Chyby</th>
            <th>Úhozy/min</th>
            <th>Slova/min</th>
            <th>Přesnost</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, idx) => (
            <tr key={idx}>
              <td>{new Date(res.date).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
              <td>{res.mistakes}</td>
              <td>{res.zpm}</td>
              <td>{res.wpm}</td>
              <td>{res.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="results__clear" onClick={onClearResults}>Vymazat výsledky</button>
    </div>
  );
};

export default Result;
