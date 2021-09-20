import { AxiosResponse } from "axios";
import { BookmarkService } from "../services/Bookmark";
import { DataService } from "../services/Data";
import { ADD_BOOKMARK, EDIT_BOOKMARK, REMOVE_BOOKMARK } from "./actionTypes";

export const addBookmark = (url: string, tags: string[] = []) => {

  return (dispatch: DispatchType) => getBookmarkFromUrl(url, tags).then(
    (newBookmark) => {

      if (!newBookmark) return // TODO Dispatch error action 

      const action: BookmarkAction = {
        type: ADD_BOOKMARK,
        bookmark: newBookmark
      }
      dispatch(action)
    }
  )
}

export const removeBookmark = (bookmark: IBookmark) => {
  const action: BookmarkAction = {
    type: REMOVE_BOOKMARK,
    bookmark,
  }
  return (dispatch: DispatchType) => dispatch(action)
}

export const editBookmark = (previousBookmark: IBookmark, newUrl: string) => {
  return (dispatch: DispatchType) => getBookmarkFromUrl(newUrl, previousBookmark.tags).then(
    (newBookmark) => {

      if (!newBookmark) return // TODO Dispatch error action 

      newBookmark.id = previousBookmark.id

      const action: BookmarkAction = {
        type: EDIT_BOOKMARK,
        bookmark: newBookmark
      }
      dispatch(action)
    }
  )
}

export const getBookmarkFromUrl = (url: string, tags: string[] = []) => {
  return DataService.getMetadata(url).then((response: AxiosResponse) => BookmarkService.getNewBookmark(response, tags))
}
