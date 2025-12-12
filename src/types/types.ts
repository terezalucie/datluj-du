export type IGameResult = {
  date: string,
  mistakes: number,
  lettersTyped: number,
  accuracy: number,
  zpm: number,
  wpm: number
}

export type IWordboxProp = {
  word: IWord,
  active: boolean,
  isPlaying: boolean,
  onFinish: () => void,
  onMistake: () => void,
  onLetterTyped: () => void,
}

export type IWord = {
    id: string,
    left: string[],
    typed: string[],
}

export type IResultsProp = {
  results: IGameResult[],
  onClearResults: () => void
}

export type IStageProp = {
  onGameFinished: (result: IGameResult) => void
}