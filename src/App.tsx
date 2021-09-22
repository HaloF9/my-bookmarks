import React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { Paper, Typography } from "@material-ui/core"

import { addBookmark } from "./store/actionCreators"
import { Bookmarks } from "./components/Bookmarks"
import { AddBookmarkModalButton } from "./components/AddBookmarkModalButton"

import "./App.sass"

const App: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch()

  const saveBookmark = React.useCallback(
    (payload: any) => {
      try {
        dispatch(addBookmark(payload.url, payload.tags))
      } catch (error) {
        // TODO catch and display error
        console.log(error)
      }
    },
    [dispatch]
  )

  return (
    <Paper>
      <Typography variant='h1' align='center'>My Bookmarks</Typography>
      <AddBookmarkModalButton saveBookmark={saveBookmark} />
      <Bookmarks />
    </Paper>
  )
}

export default App