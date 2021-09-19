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
        BookmarkService.getNewBookmark(action)

      // Dont add an existing bookmark
      const idAlreadyExist = state.bookmarks.find((bookmark) => bookmark.id === newBookmark?.id)

      if (newBookmark && !idAlreadyExist) return {
        ...state,
        bookmarks: state.bookmarks.concat(newBookmark),
      }

      // Return state if no newest bookmark created
      return state

    case EDIT_BOOKMARK:
      const editedBookmark =
        BookmarkService.getNewBookmark(action)

      if (!editedBookmark) return state

      // Update Bookmark list
      const oldBookmarkIndex = state.bookmarks.findIndex((bookmark) => bookmark.id === editedBookmark?.id)
      const updatedEditBookmarks = state.bookmarks

      updatedEditBookmarks[oldBookmarkIndex] = editedBookmark

      return {
        ...state,
        bookmarks: updatedEditBookmarks,
      }

    case REMOVE_BOOKMARK:
      const updatedBookmarks: IBookmark[] = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.bookmark?.id
      )
      return {
        ...state,
        bookmarks: updatedBookmarks,
      }
  }
  return state;
};

export default reducer;
