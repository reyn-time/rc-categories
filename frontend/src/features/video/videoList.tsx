import { useListVideoQuery } from "./videoSlice";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Skeleton,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { convertHTMLToText } from "../../util/encoding";

export const VideoList = () => {
  const { data: videos = [], isLoading, error } = useListVideoQuery();

  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={0} sm={1} md={2}></Grid>
      <Grid item xs={12} sm={10} md={8} sx={{ mt: 3 }}>
        {isLoading ? (
          <Skeleton variant="rectangular" height={1000} />
        ) : error ? (
          <Alert severity="error">GG 出事了: {JSON.stringify(error)}</Alert>
        ) : (
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
                    onClick={() => {
                      navigate(`/video/${row.id}`);
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
        )}
      </Grid>
    </Grid>
  );
};
