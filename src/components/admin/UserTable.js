import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions/admin";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

const UserTable = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Users
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Register Date</TableCell>
            <TableCell>Last logged in</TableCell>
            <TableCell>Rights</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user._id}>
              <TableCell>
                <Link to={`/admin/users/${user._id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.date}</TableCell>
              <TableCell>{user.lastLoginDate}</TableCell>
              <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
              <TableCell align="right">
                {user.isActive ? "Active" : "Disabled"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  users: state.admin.users
});

export default connect(mapStateToProps, { getUsers })(UserTable);
