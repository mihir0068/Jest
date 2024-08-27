import React, { useState } from "react";
import "./just.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
const App: React.FC = () => {
  const [changeString, setChangeString] = useState<Boolean>(false);
  const [err, setError] = useState<string | null>(null);

  const [user, setUsers] = useState<User[]>([]);
  const handleBtnClick = () => {
    setChangeString((prevState) => !prevState);
  };

  const handleUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
      setError("");
      console.log(data);
    } catch (error) {
      console.log(error);
      setError("Fail to Fetch User Data");
      throw new Error("Fail To Fetch User Data");
    }
  };
  return (
    <>
      <div className="App">
        <p>learn react</p>
        <p>I am In The Document</p>
      </div>
      <div className="toggle-container">
        <p className="toggle-text">
          {changeString ? "Hello I am In jest" : "No I am not in jest"}
        </p>
        <button
          type="button"
          onClick={handleBtnClick}
          className="toggle-button"
          data-testid="btn"
        >
          Click Me
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={handleUsers}
          className="get-user-btn"
          data-testid="get-users"
          test-align="center"
        >
          Get Users
        </button>
        {err && <div data-testid="api-error">{err}</div>}
        <table border={1} data-testid="user-data">
          <tr>
            <th>Id</th>
            <th>First-Name</th>
            <th>Last-Name</th>
            <th>Email</th>
          </tr>
          {user.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default App;
