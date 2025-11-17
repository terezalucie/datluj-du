export interface IGameResult {
  date: string,
  mistakes: number,
  lettersTyped: number,
  accuracy: number,
  zpm: number,
  wpm: number
}

export interface IWordboxProp {
  word: IWord,
  active: boolean,
  isPlaying: boolean,
  onFinish: () => void,
  onMistake: () => void,
  onLetterTyped: () => void,
}

export interface IWord {
    id: string,
    left: string[],
    typed: string[],
}

export interface IResultsProp {
  results: IGameResult[],
  onClearResults: () => void
}

export interface IStageProp {
  onGameFinished: (result: IGameResult) => void
}