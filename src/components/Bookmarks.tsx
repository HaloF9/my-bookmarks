import React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
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
} from "@material-ui/core";
import { EditBookmarkModalButton } from "./EditBookmarkModalButton";


type BookmarkProps = {
  bookmarks: IBookmark[]
  removeBookmark: (bookmark: IBookmark) => void
}

export const Bookmarks: React.FC<BookmarkProps> = ({ bookmarks, removeBookmark }: BookmarkProps) => {
  const dispatch: Dispatch<any> = useDispatch()

  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const deleteBookmark = React.useCallback(
    (bookmark: IBookmark) => dispatch(removeBookmark(bookmark)),
    [dispatch, removeBookmark]
  )


  const ROWS_PER_PAGES = 10

  return (
    <>
      {bookmarks.length &&
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
                {bookmarks.slice(page * ROWS_PER_PAGES).map((row) => (
                  <TableRow key={row.id}>
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
                        <EditBookmarkModalButton bookmark={row} />
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