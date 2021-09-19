import React from "react"

type Props = {
  saveBookmark: (bookmark: IBookmark | any) => void
}

export const AddBookmark: React.FC<Props> = ({ saveBookmark }) => {
  const [bookmark, setBookmark] = React.useState<IBookmark | {}>()

  const handleBookmarkData = (e: React.FormEvent<HTMLInputElement>) => {
    setBookmark({
      ...bookmark,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const addNewBookmark = (e: React.FormEvent) => {
    e.preventDefault()
    saveBookmark(bookmark)
  }

  return (
    <form onSubmit={addNewBookmark} className="Add-bookmark">

      <input
        type="text"
        id="url"
        placeholder="url"
        onChange={handleBookmarkData}
      />
      <button disabled={bookmark === undefined ? true : false}>
        Add bookmark
      </button>
    </form>
  )
}