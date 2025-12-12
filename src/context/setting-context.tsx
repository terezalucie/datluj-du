import { createContext, useContext } from "react";

export const speedMode = ["cpm", "wpm"] as const
export const theme = ["light", "dark"] as const

export type SpeedMode = (typeof speedMode)[number]
export type Theme = (typeof theme)[number]


export type SettingsStructure = {
    theme: Theme,
    speedMode: SpeedMode,
    setTheme: () => void,
    setSpeedMode: () => void,
}

export const SettingsContext = createContext<SettingsStructure>(null!)

export const useSettings = () => useContext(SettingsContext)