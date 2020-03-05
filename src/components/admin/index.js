import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions/admin";

const AdminPanel = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div>
        <Link to="/admin/users/new">Create new user</Link>
      </div>
      <table className="admin-table">
        <tbody>
          <tr>
            <td key="name">User name</td>
            <td key="email">Email</td>
            <td key="Reg-date">Register. date</td>
            <td key="log-date">Last logged in</td>
            <td key="admin">Admin</td>
            <td key="status">Status</td>
            <td key="actions">Actions</td>
          </tr>
          {users.map(user => (
            <tr key={user.email}>
              <td>
                <Link to={`/admin/users/${user._id}`}>{user.name}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.date}</td>
              <td>{user.lastLoginDate}</td>
              <td>{user.isAdmin ? "Admin" : "User"}</td>
              <td>{user.isActive ? "Active" : "Unactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.admin.users
});

export default connect(mapStateToProps, { getUsers })(AdminPanel);
