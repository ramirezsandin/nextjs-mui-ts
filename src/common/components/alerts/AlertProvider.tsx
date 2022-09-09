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
  message: string
  type: AlertColor
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
interface AlertCallerProviderProps {
  children: ReactNode
  setState: (newState: AlertState) => void
}
const AlertCallerProvider = memo<AlertCallerProviderProps>(
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
interface AlertContextType {
  type?: AlertColor
  message?: string
  clear: () => void
}

// Alert State Context
const AlertContext = createContext<AlertContextType>({} as AlertContextType)

// Alert State Hook: To be used in the Alert Container
const useAlertState = () => useContext(AlertContext)

// Alert Provider: The component that will render the alert. To be placed somewhere in the layout.
interface AlertProviderProps {
  children: ReactNode
}
const AlertProvider = ({ children }: AlertProviderProps) => {
  const [state, setState] = useState<AlertState | null>(null)
  return (
    <AlertContext.Provider
      value={{
        ...state,
        clear: () => setState(null),
      }}
    >
      <AlertCallerProvider setState={setState}>{children}</AlertCallerProvider>
    </AlertContext.Provider>
  )
}

export { AlertProvider, useAlertCaller, useAlertState }
