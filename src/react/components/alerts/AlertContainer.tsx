import { Alert, Slide, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'

import { useAlertState } from '@/react/components/alerts/AlertContext'

const AlertContainer = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { state } = useAlertState()

    useEffect(() => {
        if (!!state) {
            setOpen(true)
        }
    }, [state])

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            TransitionComponent={Slide}
        >
            <Alert
                onClose={handleClose}
                severity={state?.type}
                variant='filled'
                elevation={4}
                sx={{ width: '75vw' }}
            >
                {state?.message}
            </Alert>
        </Snackbar>
    )
}
export default AlertContainer