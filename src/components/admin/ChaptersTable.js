import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { fetchChapters, deleteChapter } from "../../actions/ruleBook";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  userTablePaper: {
    overflowX: "auto",
  },
}));

const UserTable = ({ chapters, fetchChapters, deleteChapter }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <Fragment>
      <Typography component="h2" variant="h6" color="primary">
        Rulebook chapters
      </Typography>
      <div>
        <IconButton aria-label="Add new chapter" color="secondary">
          <Link component={RouterLink} to="/admin/editor" color="inherit">
            <AddIcon />
          </Link>
        </IconButton>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Chapter title</TableCell>
            <TableCell>Chapter index</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chapters.map((chapter) => (
            <TableRow key={chapter._id}>
              <TableCell>
                <Link
                  component={RouterLink}
                  to={`/admin/editChapter/${chapter._id}`}
                >
                  {chapter.title}
                </Link>
              </TableCell>
              <TableCell>{chapter.index}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="secondary"
                  onClick={(e) => deleteChapter(chapter._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  chapters: state.ruleBook.chapters,
});

export default connect(mapStateToProps, { fetchChapters, deleteChapter })(
  UserTable
);
