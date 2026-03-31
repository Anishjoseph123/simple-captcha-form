// import React, { useEffect, useState } from "react";
// const GithubUsersData = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("https://api.github.com/users")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUsers(data);
//         console.log("API Response Data:", data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   return (
//     <>
//       <table
//         border="1"
//         cellPadding="10"
//         style={{ borderCollapse: "collapse", margin: "0 auto" }}
//       >
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Avatar</th>
//             <th>Username</th>
//             <th>Profile</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>
//                 <img
//                   src={user.avatar_url}
//                   alt={user.login}
//                   width="50"
//                   height="50"
//                   style={{ borderRadius: "30px" }}
//                 />
//               </td>
//               <td>{user.login}</td>
//               <td>
//                 <a href={user.html_url} target="_blank" rel="noreferrer">
//                   View Profile
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };
// export default GithubUsersData;

import React, { useEffect, useState } from "react";

const GithubUsersData = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users?per_page=100")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Search filter
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.login.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // reset page on search
  }, [search, users]);

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>GitHub Users</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
      />

      {/* Table */}
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <img src={user.avatar_url} alt="" width="50" />
                </td>
                <td>{user.login}</td>
                <td>
                  <a href={user.html_url} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GithubUsersData;
