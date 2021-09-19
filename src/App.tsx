import React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import "./App.sass"

import { Bookmarks } from "./components/Bookmarks"
import { addBookmark, removeBookmark } from "./store/actionCreators"
import { Dispatch } from "redux"
import { AddBookmarkModalButton } from "./components/AddBookmarkModalButton"
import { Paper, Typography } from "@material-ui/core"

const App: React.FC = () => {
  const bookmarks: IBookmark[] = useSelector(
    (state: BookmarkState) => state.bookmarks,
    shallowEqual
  )

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
      <Bookmarks
        bookmarks={bookmarks}
        removeBookmark={removeBookmark}
      />
    </Paper>
  )
}

export default App