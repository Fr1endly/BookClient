import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { createOrEditUser } from "../../actions/admin";

const AdminCreateUser = ({ createOrEditUser, setAlert }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    isAdmin: false,
    isActive: false
  });

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
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
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
              placeholder="password"
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

export default connect(null, { createOrEditUser, setAlert })(AdminCreateUser);
