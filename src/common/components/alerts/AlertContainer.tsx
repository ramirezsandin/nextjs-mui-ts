// External dependencies
import { SyntheticEvent, useEffect, useState } from 'react'
import { Alert, Slide, Snackbar } from '@mui/material'

<<<<<<< HEAD
// Private dependencies
import { useAlertState } from './AlertContext'
=======
import { useAlertState } from 'common/components/alerts/AlertContext'
>>>>>>> baf0b28597c2d8138dc83d1fcb971c885091cba1

export const AlertContainer = () => {
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
