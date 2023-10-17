import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostsToStore } from "../store/reducers/postsReducer/postsReducer";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Stack,
} from "@chakra-ui/react";

export const PostsPage = () => {
  // const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const { isLoading, posts } = useSelector((state) => state.posts);
  useEffect(() => {
    getPostsData();
  }, []);

  const getPostsData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      // .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.status == 200 && res?.data && Array.isArray(res.data)) {
          dispatch(addPostsToStore({ loaded: true, posts: res.data }));
        }
      })
      .catch((error) => {
        // if (Array.isArray(res)) {
        dispatch(addPostsToStore({ loaded: true, posts: [] }));
        // }
      });

    // ...
  };
  return (
    <>
      <p>Posts:</p>
      <Stack direction={"row"} wrap={"wrap"}>
        {posts.map((post) => (
          <Card border={"1px"} m={2} width={200}>
            <CardHeader>{post.title}</CardHeader>
            <CardBody>{post.body}</CardBody>
            <CardFooter>its footer</CardFooter>
          </Card>
        ))}
      </Stack>
      <Button>12</Button>
    </>
  );
};
