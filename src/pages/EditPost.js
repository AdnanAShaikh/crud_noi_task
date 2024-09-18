import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditPost.css";

const EditPost = () => {
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({});

  const navigate = useNavigate();

  const { id } = useParams();

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/posts/${id}`);
      if (res.status === 200) {
        setData(res.data);
        console.log("data", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    if (data?.title && data?.description) {
      setNewData({
        title: data.title,
        description: data.description,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setNewData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newData.title || !newData.description) {
        alert("Fill all fields");
      } else {
        const res = await axios.put(`http://localhost:3000/posts/${id}`, {
          title: newData.title,
          description: newData.description,
        });
        if (res.status === 200) {
          navigate(`/view/${id}`);
          alert("Successfully updated !");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container1">
      <div className="box1">
        <h1>Edit Post</h1>
        <div className="heading1">
          <form onSubmit={handleSubmit} className="new-form1">
            {" "}
            <h2>title</h2>
            <input
              name="title"
              className="input-new1"
              value={newData.title}
              onChange={handleChange}
            />
            <br></br>
            <h2> description:</h2>
            <textarea
              className="des-new1"
              name="description"
              value={newData.description}
              onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
