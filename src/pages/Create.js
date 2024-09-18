import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditPost.css";

const Create = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!data.title || !data.description) {
        return alert("Fill all fields");
      }

      const res = await axios.post("http://localhost:3000/posts", {
        title: data.title,
        description: data.description,
      });
      console.log(res);
      if (res.status === 201) {
        alert("Successfully Created!");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container1">
      <div className="box1">
        <h1>Create Post</h1>
        <div className="heading1">
          <form onSubmit={handleSubmit} className="new-form1">
            <h2>Title</h2>
            <input
              name="title"
              className="input-new1"
              value={data.title}
              onChange={handleChange}
            />
            <br></br>
            <h2>Description</h2>
            <textarea
              className="des-new1"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
