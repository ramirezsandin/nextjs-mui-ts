// External dependencies
import { SyntheticEvent, useEffect, useState } from 'react'
import { Alert, Slide, Snackbar } from '@mui/material'

// Private dependencies
import { useAlertState } from './AlertProvider'

interface AlertContainerState {
  open: boolean
  key?: number
}

export const AlertContainer = () => {
  const [{ open, key }, setState] = useState<AlertContainerState>({
    open: false,
  })
  const { message, type, clear } = useAlertState()

  useEffect(() => {
    if (!!message) {
      // Trick: set key to timestamp to make the component rerender next time.
      setState({ open: true, key: new Date().getTime() })
    }
  }, [message])

  const handleClose = (_: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setState((prev) => ({ ...prev, open: false }))
  }
  return (
    <Snackbar
      key={key}
      onClose={handleClose}
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      TransitionComponent={Slide}
      TransitionProps={{
        onExited: clear,
      }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        elevation={4}
        sx={{
          width: { xs: '80vw', sm: '70vw', md: '60vw', lg: '50vw', xl: '35vw' },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
