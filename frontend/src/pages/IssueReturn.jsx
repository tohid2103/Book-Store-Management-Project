import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IssueReturn.css";

function IssueReturn() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [message, setMessage] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([]);

  // Fetch all users and books from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, booksRes, issuedRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users"),
          axios.get("http://localhost:5000/api/books"),
          axios.get("http://localhost:5000/api/issue"),
        ]);
        setUsers(usersRes.data);
        setBooks(booksRes.data);
        setIssuedBooks(issuedRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Handle issue book
  const handleIssue = async () => {
    if (!selectedUser || !selectedBook) {
      setMessage("⚠️ Please select both user and book");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/issue", {
        userId: selectedUser,
        bookId: selectedBook,
      });

      setMessage("✅ Book issued successfully!");
      setIssuedBooks([...issuedBooks, res.data]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to issue book");
    }
  };

  // Handle return book
  const handleReturn = async (issueId) => {
    try {
      await axios.delete(`http://localhost:5000/api/issue/return/${issueId}`);
      setIssuedBooks(issuedBooks.filter((item) => item._id !== issueId));
      setMessage("📘 Book returned successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to return book");
    }
  };

  return (
    <div className="issue-container">
      <h2>📚 Book Issue & Return</h2>

      <div className="issue-form">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>

        <button onClick={handleIssue}>Issue Book</button>
      </div>

      {message && <p className="message">{message}</p>}

      <h3>📖 Issued Books</h3>
      <table className="issued-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Issue Date</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.length > 0 ? (
            issuedBooks.map((item) => (
              <tr key={item._id}>
                <td>{item.user?.name}</td>
                <td>{item.book?.title}</td>
                <td>{new Date(item.issueDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="return-btn"
                    onClick={() => handleReturn(item._id)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No books issued yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default IssueReturn;
