import { useEffect, useMemo, useState } from "react";
import Divider from "@mui/joy/Divider";
import PostList from "../components/PostList";
import PostSelect from "../components/PostSelect";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PostService from "../API/PostService";
import { Box } from "@mui/material";

function Home() {
  interface IPost {
    id: number;
  }

  const [posts, setPosts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isloading, setIsloading] = useState(true);

  const options = [
    { value: "title", name: "Title" },
    { value: "body", name: "Description" },
  ];
  const sortedPosts = useMemo(() => {
    if (selectedSort) {
      return [...posts].sort((a: any, b: any) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return posts;
  }, [selectedSort, posts]);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post: any) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedPosts]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const posts = await PostService.getAll();

    setPosts(posts);

    setIsloading(false);
  }

  const sortPosts = (sort: string) => {
    setSelectedSort(sort);
  };

  return (
    <div className="App">
      {isloading ? (
        <LoadingButton
          loading
          fullWidth
          variant="outlined"
          size="large"
          loadingIndicator="Loading…"
          style={{ marginTop: "50px" }}
        >
          Submit
        </LoadingButton>
      ) : (
        <Box>
          <TextField
            className="input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Search"
            variant="outlined"
            inputProps={{ minLength: 1 }}
          />
          <Divider
            style={{ marginBottom: "10px", marginTop: "10px" }}
            component="div"
            role="presentation"
          />
          <PostSelect
            options={options}
            value={selectedSort}
            defaultValue="Sort"
            change={sortPosts}
          />
          <PostList posts={sortedAndSearchedPosts} title="Technology" />
        </Box>
      )}
    </div>
  );
}

export default Home;
