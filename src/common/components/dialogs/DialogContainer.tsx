import { ReactNode } from 'react'

interface DialogContainerProps {
  children?: ReactNode
}
export const DialogContainer = ({ children }: DialogContainerProps) => {
  return <>{children}</>
}
