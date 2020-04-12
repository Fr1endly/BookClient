import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchChapters } from "../../actions/ruleBook";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  userTablePaper: {
    overflowX: "auto",
  },
}));

const UserTable = ({ chapters, fetchChapters }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <Fragment>
      <Typography component="h2" variant="h6" color="primary">
        Rulebook chapters
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Chapter title</TableCell>
            <TableCell align="right">Chapter index</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chapters.map((chapter) => (
            <TableRow key={chapter._id} onClick={(e) => getUserById(user._id)}>
              <TableCell>{chapter.title}</TableCell>
              <TableCell align="right">{chapter.index}</TableCell>
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

export default connect(mapStateToProps, { fetchChapters })(UserTable);
