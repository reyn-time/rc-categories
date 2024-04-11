import { useEffect } from "react";
import { listVideo } from "./videoSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { convertHTMLToText } from "../../util/encoding";

export const VideoList = () => {
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector((state) => state.videos.status);
  const videos = useAppSelector((state) => state.videos.videos);

  const navigate = useNavigate();
  useEffect(() => {
    if (postStatus === "idle") {
      void dispatch(listVideo());
    }
  }, [postStatus, dispatch]);

  return (
    <Grid container>
      <Grid item xs={0} sm={1} md={2}></Grid>
      <Grid item xs={12} sm={10} md={8}>
        <TableContainer component={Paper} sx={{ my: 3 }}>
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
                  onClick={() => {
                    navigate(`/video/${row.youtubeId}`);
                  }}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {convertHTMLToText(row.name)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
