import { ReactNode } from 'react'

interface DialogProviderProps {
  children?: ReactNode
}
export const DialogProvider = ({ children }: DialogProviderProps) => {
  return <>{children}</>
}
