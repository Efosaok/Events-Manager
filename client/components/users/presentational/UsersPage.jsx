import React from 'react';
import PropTypes from 'prop-types';

const UsersPage = props => (
  <div className="users-page">
    <table className="table text-center table-striped table-dark">
      <thead className="justify-content-center">
        <tr>
          <th scope="col">Full Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.allUsers.map(user => (
          <tr key={user.id}>
            <td>
              {user.firstname} {user.lastname}
            </td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              {user.role === 'User' ? (
                <button
                  className="btn btn-upgrade"
                  id={user.id}
                  onClick={props.changeRole}
                >
                  UPGRADE
                </button>
              ) : (
                <button
                  className="btn btn-downgrade btn-warning"
                  id={user.id}
                  onClick={props.changeRole}
                >
                  DOWNGRADE
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UsersPage;

UsersPage.propTypes = {
  allUsers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  changeRole: PropTypes.func.isRequired
};
