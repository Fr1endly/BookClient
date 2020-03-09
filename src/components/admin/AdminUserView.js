import React, { Fragment, useEffect, useState } from "react";
import { getUserById, createOrEditUser, clearUser } from "../../actions/admin";
import { connect } from "react-redux";

//To-Do on submit handler

const initialState = {
  email: "",
  name: "",
  password: "",
  isAdmin: false,
  isActive: false,
  id: ""
};

const AdminUserView = ({
  match,
  user,
  loading,
  getUserById,
  createOrEditUser,
  clearUser
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!user || user.id !== match.params.id) getUserById(match.params.id);
    setFormData({ ...user });
  }, [user]);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    createOrEditUser(formData);
  };

  const { email, name, password, isAdmin, isActive } = formData;

  return (
    <Fragment>
      {" "}
      <form className="form" onSubmit={e => onSubmit(e)}>
        <h3>Create new user</h3>
        <div className="form-group">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="is-admin-checkbox" style={{ wordWrap: "break-word" }}>
            Admins rights
            <input
              type="checkbox"
              name="isAdmin"
              id="is-admin-checkbox"
              checked={isAdmin}
              onChange={e => onChange(e)}
            />
          </label>
          <label
            htmlFor="is-active-checkbox"
            style={{ wordWrap: "break-word" }}
          >
            Active
            <input
              type="checkbox"
              name="isActive"
              id="is-active-checkbox"
              checked={isActive}
              onChange={e => onChange(e)}
            />
          </label>
        </div>
        <hr />
        <div className="form-group">
          <input type="submit" value="Submit" style={{ marginTop: "15px" }} />
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.admin.user,
  loading: state.admin.loading
});

export default connect(mapStateToProps, {
  getUserById,
  createOrEditUser,
  clearUser
})(AdminUserView);
