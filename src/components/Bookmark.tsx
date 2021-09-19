import React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

type BookmarkProps = {
  bookmark: IBookmark
  removeBookmark: (bookmark: IBookmark) => void
}

export const Bookmark: React.FC<BookmarkProps> = ({ bookmark, removeBookmark }: BookmarkProps) => {
  const dispatch: Dispatch<any> = useDispatch()

  const deleteBookmark = React.useCallback(
    (bookmark: IBookmark) => dispatch(removeBookmark(bookmark)),
    [dispatch, removeBookmark]
  )

  return (
    <div className="Bookmark">
      <div>
        <h1>{bookmark.title}</h1>
        <p>{bookmark.author}</p>
      </div>
      <button onClick={() => deleteBookmark(bookmark)}>Delete</button>
    </div>
  )
}