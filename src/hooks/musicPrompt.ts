const PROMPT_KEY = 'moneytykes-music-prompt-choice'

export type MusicPromptChoice = 'play' | 'skip'

export function getMusicPromptChoice(): MusicPromptChoice | null {
  try {
    const value = localStorage.getItem(PROMPT_KEY)
    if (value === 'play' || value === 'skip') return value
  } catch {
    /* ignore */
  }
  return null
}

export function hasAnsweredMusicPrompt(): boolean {
  return getMusicPromptChoice() !== null
}

export function markMusicPromptChoice(choice: MusicPromptChoice) {
  try {
    localStorage.setItem(PROMPT_KEY, choice)
  } catch {
    /* ignore */
  }
}

export function shouldAutoPlayThemeSong(): boolean {
  return getMusicPromptChoice() === 'play'
}
