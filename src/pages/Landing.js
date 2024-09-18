import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [data, setData] = useState([]);

  let isLogin = !!localStorage.getItem("isLogin");

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts");
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //
  //
  //   functions crud

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setData((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <>
      {isLogin ? (
        <div className="container">
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/">Logout</Link>
          </nav>

          <section className="add">
            <Link to={"/create"}>
              <button className="create">Create A Post</button>
            </Link>
          </section>

          <section className="posts">
            {data.map((item) => (
              <div key={item.id} className="each-post">
                <Link
                  to={`/view/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <p>{item.title}</p>
                </Link>
                <div className="post-btns">
                  <Link to={`/view/${item.id}`}> View</Link>

                  <Link to={`/edit/${item.id}`}>
                    <button className="edit">Edit</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => deletePost(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <>
          <div className="logout">
            <div className="logout-2">
              <p> Login First ! ! ! ! </p>
              <Link to="/" className="login-again">
                Login
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Landing;
