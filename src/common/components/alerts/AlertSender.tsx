/**
 * Just for demostration.
 */

import { Button, Stack, TextField, AlertColor } from '@mui/material'
import { useRef } from 'react'
import { useAlertCaller } from './AlertContext'

export const AlertSender = () => {
  const { send } = useAlertCaller()
  const messageRef = useRef<HTMLInputElement>()
  const typeRef = useRef<HTMLInputElement>()

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        defaultValue="Write something"
        label="Message"
        inputRef={messageRef}
        sx={{
          flexGrow: 1,
        }}
      />
      <TextField
        defaultValue="info"
        inputRef={typeRef}
        select
        label="Type"
        SelectProps={{
          native: true,
        }}
      >
        {['info', 'success', 'warning', 'error'].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField>
      <Button
        variant="outlined"
        // @ts-ignore: Unreachable code error
        onClick={() => send(typeRef.current?.value, messageRef.current?.value)}
      >
        Send
      </Button>
    </Stack>
  )
}
