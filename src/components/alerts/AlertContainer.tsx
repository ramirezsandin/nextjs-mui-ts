import { Alert, Slide, Snackbar } from '@mui/material'
import { SyntheticEvent, useEffect, useState } from 'react'

import { useAlertState } from 'components/alerts/AlertContext'

const AlertContainer = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [key, setKey] = useState<number | undefined>(undefined)
  const { state, clearState } = useAlertState()

  useEffect(() => {
    if (!!state) {
      // key trick to make the component rerender.
      setKey(new Date().getTime())
      setOpen(true)
    }
  }, [state])

  const handleClose = (_: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
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
        onExited: clearState,
      }}
    >
      <Alert
        onClose={handleClose}
        severity={state?.type}
        variant="filled"
        elevation={4}
        sx={{
          width: { xs: '80vw', sm: '70vw', md: '60vw', lg: '50vw', xl: '35vw' },
        }}
      >
        {state?.message}
      </Alert>
    </Snackbar>
  )
}
export default AlertContainer
