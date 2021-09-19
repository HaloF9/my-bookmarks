import React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import "./App.sass"

import { Bookmark } from "./components/Bookmark"
import { AddBookmark } from "./components/AddBookmark"
import { addBookmark, removeBookmark } from "./store/actionCreators"
import { Dispatch } from "redux"

const App: React.FC = () => {
  const bookmarks: readonly IBookmark[] = useSelector(
    (state: BookmarkState) => state.bookmarks,
    shallowEqual
  )

  const dispatch: Dispatch<any> = useDispatch()

  const saveBookmark = React.useCallback(
    (payload: any) => dispatch(addBookmark(payload.url)),
    [dispatch]
  )

  return (
    <main>
      <h1>My Bookmarks</h1>
      <AddBookmark saveBookmark={saveBookmark} />
      {bookmarks.map((bookmark: IBookmark) => (
        <Bookmark
          key={bookmark.id}
          bookmark={bookmark}
          removeBookmark={removeBookmark}
        />
      ))}
    </main>
  )
}

export default App