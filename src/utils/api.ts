import { createUserRequestBody } from "./types";

// fun tion to make a get req for users api
export const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

// fun to make a post req for users api

export const postUser = async (body: createUserRequestBody) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset-UTF-8",
    },
  });

  return res.json()
};

// function for get posts
export const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};
