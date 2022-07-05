// External dependencies
import { useRef } from 'react'
import { Button, Stack, TextField } from '@mui/material'

// Shared dependencies
import { useAlertCaller } from '@/common/components'

/**
 * Component just for demostration.
 */
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
