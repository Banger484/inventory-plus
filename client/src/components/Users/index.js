import React from 'react';

const UserList = ({ users, title }) => {
  if (!users.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {users &&
          users.map((user) => (
            <div key={user._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {user.name} <br />
                </h4>
                {/* <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/users/${user._id}`}
                >
                  View and endorse their skills.
                </Link> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
