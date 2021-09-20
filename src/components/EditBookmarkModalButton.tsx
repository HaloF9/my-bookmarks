import React from 'react'

import { Box, Button, Modal, TextField } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { editBookmark } from '../store/actionCreators'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
}

type EditBookmarkModalButtonProps = {
  bookmark: IBookmark
}

export const EditBookmarkModalButton: React.FC<EditBookmarkModalButtonProps> = ({ bookmark }: EditBookmarkModalButtonProps) => {

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dispatch: Dispatch<any> = useDispatch()

  const { handleSubmit, control } = useForm()

  const onSubmit = (data: any) => {
    editAndSaveBookmark(bookmark, data.url)
    handleClose()
  }

  const editAndSaveBookmark = React.useCallback(
    (bookmark: IBookmark, url: string) => {
      try {
        dispatch(editBookmark(bookmark, url))
      } catch (error) {
        // TODO catch and display error
        console.log(error)
      }
    },
    [dispatch]
  )

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <form>
            <Controller
              name={'url'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} defaultValue={bookmark.url} value={value} label={'Url'} />
              )}
            />
            <Button variant='contained' onClick={handleSubmit(onSubmit)}>Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}