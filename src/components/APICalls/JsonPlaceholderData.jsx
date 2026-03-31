import React, { useEffect, useState } from "react";
const JsonPlaceholderData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        console.log("API Response Data:", data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          margin: "0 auto",
          marginTop: "150px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Username</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address.city}</td>
              <td>{user.username}</td>
              <td>
                <a href={user.website} target="_blank" rel="noreferrer">
                  View Website
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default JsonPlaceholderData;
