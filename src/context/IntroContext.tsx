import { createContext, useContext } from 'react'

// Default `true` (unblocked) so any component reading this outside of the
// root <Preloader> — tests, storybook-style usage, etc. — behaves exactly as
// it did before the preloader existed. Only the real root wiring in
// main.tsx starts this at `false` and flips it once the intro completes.
export const IntroContext = createContext(true)

export function useIntroComplete() {
  return useContext(IntroContext)
}
