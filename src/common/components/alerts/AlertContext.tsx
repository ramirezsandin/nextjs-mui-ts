// External dependencies
import { createContext, memo, ReactNode, useContext, useState } from 'react'
import { AlertColor } from '@mui/material'

/**
 *  We'll have the context split in 2 so we can minimize the re-rendering of the inner
 *  components.
 *
 *  1. useAlertCaller: For sendings the Alerts from any part of the component's tree
 *  2. useAlertState: For getting the actual value of the aler from the alert container
 */

// The State of the whole context.
interface AlertState {
  type: AlertColor
  message: string
}

// Alert Caller Context Type.
interface AlertCallerContextType {
  send: (type: AlertColor, message: string) => void
}

// Alert Caller Context.
const AlertCallerContext = createContext<AlertCallerContextType>(
  {} as AlertCallerContextType
)

// Alert Caller Hook: To be use anywhere in the app.
const useAlertCaller = () => useContext(AlertCallerContext)

// Alert Caller Provider
interface AlertUpdateProviderProps {
  children: ReactNode
  setState: (newState: AlertState) => void
}
const AlertCallerProvider = memo<AlertUpdateProviderProps>(
  ({ children, setState }) => {
    return (
      <AlertCallerContext.Provider
        value={{
          send: (type, message) => setState({ type, message }),
        }}
      >
        {children}
      </AlertCallerContext.Provider>
    )
  }
)
AlertCallerProvider.displayName = 'AlertUpdateProvider'

// Alert State Context Type
interface AlertStateContextType {
  state: AlertState | undefined
  clearState: () => void
}

// Alert State Context
const AlertStateContext = createContext<AlertStateContextType>(
  {} as AlertStateContextType
)

// Alert State Hook: To be used in the Alert Container
const useAlertState = () => useContext(AlertStateContext)

// Alert Provider: The component that will render the alert. To be placed somewhere in the layout.
interface AlertProviderProps {
  children: ReactNode
}
const AlertProvider = ({ children }: AlertProviderProps) => {
  const [state, setState] = useState<AlertState | undefined>(undefined)
  return (
    <AlertStateContext.Provider
      value={{ state, clearState: () => setState(undefined) }}
    >
      <AlertCallerProvider setState={setState}>{children}</AlertCallerProvider>
    </AlertStateContext.Provider>
  )
}

export { AlertProvider, useAlertCaller, useAlertState }
