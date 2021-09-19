import React from 'react'

import { Box, Button, Modal, TextField, List, ListItem } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'

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

type AddBookmarkModalButtonProps = {
  saveBookmark: (bookmark: IBookmark | any) => void
}

export const AddBookmarkModalButton: React.FC<AddBookmarkModalButtonProps> = ({ saveBookmark }: AddBookmarkModalButtonProps) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [tags, setTags] = React.useState<string[]>([])

  const { handleSubmit, control } = useForm()

  const onSubmit = (data: any) => {
    handleClose()
    data.tags = tags
    saveBookmark(data)
  }

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Add bookmark</Button>
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
                <TextField onChange={onChange} value={value} label={'Url'} />
              )}
            />
            <Controller
              name={'tag'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <span>
                  <TextField onChange={onChange} value={value} label={'tag'} />
                  {value && <Button variant='contained' onClick={() => setTags([...tags, value])}>Add</Button>}
                  <List >
                    {tags.map((tag) =>
                      <ListItem>
                        {tag}
                      </ListItem>
                    )}
                  </List>
                </span>
              )}
            />
            <Button variant='contained' onClick={handleSubmit(onSubmit)}>Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}