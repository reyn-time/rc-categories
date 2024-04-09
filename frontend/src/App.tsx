import { useEffect } from "react";
import { listVideo } from "./features/video/videoSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  AppBar,
  Toolbar,
  IconButton,
  Icon,
} from "@mui/material";
import { convertHTMLToText } from "./util/encoding";

export const App = () => {
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector((state) => state.videos.status);
  const videos = useAppSelector((state) => state.videos.videos);

  useEffect(() => {
    if (postStatus === "idle") {
      void dispatch(listVideo());
    }
  }, [postStatus, dispatch]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HollyHub
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table aria-label="video table">
          <TableHead>
            <TableRow>
              <TableCell>影片標題</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((row) => (
              <TableRow
                hover
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {convertHTMLToText(row.name)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
