import React, { useEffect } from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core"
import { EditBookmarkModalButton } from "./EditBookmarkModalButton"
import { editBookmark, removeBookmark } from "../store/actionCreators"


type BookmarkProps = {} // Add specifics props if needed

export const Bookmarks: React.FC<BookmarkProps> = (props: BookmarkProps) => {

  const dispatch: Dispatch<any> = useDispatch()
  const [page, setPage] = React.useState(0)

  const bookmarks: IBookmark[] = useSelector(
    (state: BookmarkState) => state.bookmarks,
    shallowEqual
  )

  // Delete cb
  const deleteBookmark = React.useCallback(
    (bookmark: IBookmark) => {
      try {
        dispatch(removeBookmark(bookmark))
      } catch (error) {
        // TODO catch and display error
        console.log(error)
      }
    },
    [dispatch]
  )

  // Edit cb
  const editAndSaveBookmark = React.useCallback(
    (bookmark: IBookmark, url: string) => {
      try {
        dispatch(editBookmark(bookmark, url))
      } catch (error) {
        // TODO catch and display error
        console.log(error)
      }
    },
    [dispatch]
  )

  // Pagination Management
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const ROWS_PER_PAGES = 3

  useEffect(() => {
    if (bookmarks.length <= page * ROWS_PER_PAGES && bookmarks.length !== 0) setPage(page - 1)
  }, [bookmarks, page])

  return (
    <>
      {!!bookmarks.length &&
        <>
          <TableContainer component={Paper}>
            <Table size="small" >
              <TableHead>
                <TableRow>
                  <TableCell>Titre</TableCell>
                  <TableCell align="right">Date de création</TableCell>
                  <TableCell align="right">Auteur</TableCell>
                  <TableCell align="right">Hauteur</TableCell>
                  <TableCell align="right">Largeur</TableCell>
                  <TableCell align="right">Url</TableCell>
                  <TableCell align="right">Durée en ms (Viméo)</TableCell>
                  <TableCell align="right">Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookmarks.slice(page * ROWS_PER_PAGES, page * ROWS_PER_PAGES + ROWS_PER_PAGES).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{row.title}</TableCell>
                    <TableCell align="right">{row.createdDate}</TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                    <TableCell align="right">{row.height}</TableCell>
                    <TableCell align="right">{row.width}</TableCell>
                    <TableCell align="right">
                      <Link href={row.url} >
                        {row.url}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{(row as IVimeoBookmark).duration}</TableCell>
                    <TableCell align="right">{row.tags?.map(tag => `${tag} `)}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <EditBookmarkModalButton bookmark={row} editAndSaveBookmark={editAndSaveBookmark} />
                        <Button onClick={() => deleteBookmark(row)}>Delete</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer >
          <TablePagination
            component="div"
            rowsPerPageOptions={[ROWS_PER_PAGES]}
            count={bookmarks.length}
            rowsPerPage={ROWS_PER_PAGES}
            page={page}
            onPageChange={handleChangePage}
          />
        </>
      }
    </>
  )
}