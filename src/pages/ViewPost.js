import React, { useEffect, useState } from "react";
import "./ViewPost.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ViewPost = () => {
  const [data, setData] = useState("");
  const { id } = useParams();

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/posts/${id}`);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="box">
        <div className="heading">
          <h1>{data.title}</h1>
          <Link to={`/edit/${id}`}>
            <button className="edit-post">Edit</button>
          </Link>
        </div>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default ViewPost;
