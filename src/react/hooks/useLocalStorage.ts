// edited from source: https://usehooks-ts.com/react-hook/use-local-storage
// to support ssr in Next.js
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import useEventListener from '@/react/hooks/useEventListener'

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Read local storage the parse stored json or return initialValue
  const readStorage = (): T => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }

  // Persists the new value to localStorage.
  const setStorage: SetValue<T> = (value) => {
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      )
    }
    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(state) : value

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue))

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  }

  // State to store the value
  const [state, setState] = useState<T>(initialValue)

  // Once the component is mounted, read from localStorage and update state.
  useEffect(() => {
    setState(readStorage())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setStorage(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const handleStorageChange = () => {
    setState(readStorage())
  }

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange)

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener('local-storage', handleStorageChange)

  return [state, setState]
}

export default useLocalStorage

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch (error) {
    console.log('parsing error on', { value })
    return undefined
  }
}
