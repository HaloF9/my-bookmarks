import { ADD_BOOKMARK, EDIT_BOOKMARK, REMOVE_BOOKMARK } from "./actionTypes";

const initialState: BookmarkState = {
  bookmarks: [],
};

const reducer = (
  state: BookmarkState = initialState,
  action: BookmarkAction
): BookmarkState => {
  const newBookmark = action.bookmark;
  let updatedBookmarks: IBookmark[];
  switch (action.type) {
    case ADD_BOOKMARK:
      // Do not add an existing bookmark (based on randomly generated id's : not the best way)
      const idAlreadyExist = state.bookmarks.find(
        (bookmark) => bookmark.id === newBookmark.id
      );

      if (newBookmark && !idAlreadyExist)
        return {
          ...state,
          bookmarks: [newBookmark, ...state.bookmarks],
        };

      // Return state if no newest bookmark created
      return state;

    case EDIT_BOOKMARK:
      // Update Bookmark list
      updatedBookmarks = state.bookmarks.map((bookmark) => {
        if (bookmark.id === newBookmark.id) return newBookmark;
        return bookmark;
      });
      return {
        ...state,
        bookmarks: updatedBookmarks,
      };

    case REMOVE_BOOKMARK:
      updatedBookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.bookmark.id
      );
      return {
        ...state,
        bookmarks: updatedBookmarks,
      };
  }
  return state;
};

export default reducer;
