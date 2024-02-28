import React from "react";
import { useState } from "react";
import Card from "./Github";
function GithubUser() {
  const [usernameInput, setUsernameInput] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${usernameInput}`
      );
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1 className="flex flex-auto justify-center bg-black text-white">
        Find any Github User
      </h1>
      <div className="flex justify-center">
        <input
          className="py-4 "
          type="text"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchUser}
        >
          Fetch User
        </button>
      </div>
      <div className="flex justify-center items-center mb-4 py-10">
        {error && <p className="text-red-500">{error}</p>}
        {user && (
          <Card username={user.name} avatar={user.avatar_url} bio={user.bio} />
        )}
      </div>
    </>
  );
}

export default GithubUser;
