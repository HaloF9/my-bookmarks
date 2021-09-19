import { AxiosResponse } from "axios";
import { DataService } from "../services/Data";
import { ADD_BOOKMARK, EDIT_BOOKMARK, REMOVE_BOOKMARK } from "./actionTypes";

export const addBookmark = (url: string) => {
  const action: BookmarkAction = {
    type: ADD_BOOKMARK
  }
  return addBookmarkHttpRequest(action, url);
}

export const removeBookmark = (bookmark: IBookmark) => {
  const action: BookmarkAction = {
    type: REMOVE_BOOKMARK,
    bookmark,
  }
  return (dispatch: DispatchType) => dispatch(action)
}

export const editBookmark = (bookmark: IBookmark) => {
  const action: BookmarkAction = {
    type: EDIT_BOOKMARK,
    bookmark,
  }
  return (dispatch: DispatchType) => dispatch(action)
}

export const addBookmarkHttpRequest = (action: BookmarkAction, url: string) => {
  return (dispatch: DispatchType) => {
    DataService.getMetadata(url).then((response: AxiosResponse) => dispatch({ responseData: response.data, ...action }))
  };
}