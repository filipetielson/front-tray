/* eslint-disable prettier/prettier */
import { createContext, useContext, useState } from 'react'

interface Props {
  children: React.ReactElement | string
}
interface PlatformContextType {
  value: boolean
  EditValue: () => void
}

const PlatformContext = createContext({} as PlatformContextType)

function PlatformProvider({ children }: Props): JSX.Element {
  const [value, setValue] = useState<boolean>(false)

  function EditValue() {
    setValue((prev) => !prev)
  }

  return (
    <PlatformContext.Provider value={{ value, EditValue }}>
      {children}
    </PlatformContext.Provider>
  )
}

function usePlatform() {
  const context = useContext(PlatformContext)
  return context
}

export { PlatformProvider, usePlatform }

