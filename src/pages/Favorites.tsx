import * as React from "react";
import { useState, useEffect } from "react";
import PostList from "../components/PostList";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favoritesPosts: any = localStorage.getItem("favoritesPosts");
  const [posts, setPosts] = useState([]);

  const removeFromFavorites = (newPosts: any) => setPosts(newPosts);

  useEffect(() => {
    if (JSON.parse(favoritesPosts)) {
      setPosts(JSON.parse(favoritesPosts));
    } else {
      setPosts([]);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      {posts.length ? (
        <PostList posts={posts} title="" remove={removeFromFavorites} />
      ) : (
        <Link to="/">
          <Button size="large" href="/" fullWidth>
            Add favorites
          </Button>
        </Link>
      )}
    </motion.div>
  );
};

export default Favorites;
