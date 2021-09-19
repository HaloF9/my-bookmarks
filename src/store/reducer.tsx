import { ADD_BOOKMARK, EDIT_BOOKMARK, REMOVE_BOOKMARK } from './actionTypes';

import { BookmarkService } from '../services/Bookmark'

const initialState: BookmarkState = {
  bookmarks: []
}

const reducer = (
  state: BookmarkState = initialState,
  action: BookmarkAction
): BookmarkState => {
  switch (action.type) {
    case ADD_BOOKMARK:
      const newBookmark =
        BookmarkService.getNewBookmark(action.responseData)

      if (newBookmark) return {
        ...state,
        bookmarks: state.bookmarks.concat(newBookmark),
      }

      // Return state if no newest bookmark created
      return state

    case EDIT_BOOKMARK:
      const updatedBookmarks: IBookmark[] = state.bookmarks.map(
        (bookmark) => {
          if (bookmark.id === action.bookmark?.id) return action.bookmark
          return bookmark
        }
      )
      return {
        ...state,
        bookmarks: updatedBookmarks,
      }

    case REMOVE_BOOKMARK:
      const updatedBookmarks2: IBookmark[] = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.bookmark?.id
      )
      return {
        ...state,
        bookmarks: updatedBookmarks2,
      }
  }
  return state;
};

export default reducer;
