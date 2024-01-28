import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const Home = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    setId(uuid().slice(0, 10));
  }, []);
  function copyId() {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        swal("Link Copied", "Link copied to clipboard!", "success");
      })
      .catch((error) => {
        console.error("Error copying link to clipboard:", error);
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (url == "") {
      navigate(`/${id}`);
    } else {
      navigate(`/${url}`);
    }
  }
  return (
    <div className="parent">
      <h1>Chat App</h1>
      <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>{id}</span>
        <span
          style={{ cursor: "pointer" }}
          class="material-symbols-outlined"
          onClick={copyId}
        >
          content_copy
        </span>
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          placeholder="Write a unique id or paste the above code"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">
          <span class="material-symbols-outlined">open_in_new</span>
        </button>
      </form>
    </div>
  );
};

export default Home;
