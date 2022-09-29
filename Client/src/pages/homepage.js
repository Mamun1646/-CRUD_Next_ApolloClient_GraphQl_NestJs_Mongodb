import React, { useState, useEffect } from "react";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";

import axios from "axios";

import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../components/graphql/index";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);


  const getAllUsers = useQuery(GET_USERS);
  useEffect(() => {
    if (!!getAllUsers.data) {
      setPosts(getAllUsers.data.getAllPerson);
    }
  }, [getAllUsers]);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">NextJs Paging System</h1>
      <Posts posts={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default HomePage;
