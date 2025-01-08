import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPosts, postUser } from "./utils/api";
import { postResponseData } from "./utils/types";
import { useEffect, useState } from "react";
/**
 * 1.react query is like a wrapper that wraps your api request and it manages that
 * state
 * 2. it retry's multile times if failed can check  failureCount
 */

/**
 * 1.useQuery is used for fetch req
 * 2.useMutation is used for post / patch etc since
 *    its modification of data hence named mutation
 */

/**
 * methods to refetch data 
 * 1. to use the refetch fn 
 * 2. by invalidating the query key 
 */

// assume its comming from the logged in user
const USER_ID = "964364";

// main app component
function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showposts, setShowPosts] = useState(false);
  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
    //can be used to  fetch the data again
    refetch: refetchGetPosts,
  } = useQuery<postResponseData[]>({
    /* used to internally cache the data mapped by the query key, refetch etc */
    queryKey: ["getPosts"],
    /* a warpper to query call function */
    queryFn: getPosts,
  });

  const { mutate: createPostMutation, isSuccess: isCreatePostSuccess } =
    useMutation({
      mutationKey: ["postUsers"],
      mutationFn: postUser,
    });

  useEffect(() => {
    // fetching the data if a post req is success full
    if (isCreatePostSuccess) {
      refetchGetPosts();
    }
  }, [isCreatePostSuccess, refetchGetPosts]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent the default behavior
    e.preventDefault();
    // make the api call
    createPostMutation({
      title,
      body,
      userId: USER_ID,
    });
  };

  if (postError && !postLoading)
    return <p>Error occured while fetchingdetails</p>;
  if (postLoading) return <p>Loading data</p>;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="body">Body</label>
        <input
          type="text"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <button>create user</button>
      </form>
      <br />
      <button onClick={() => setShowPosts((s) => !s)}>
        {!showposts ? "show post" : "hide post"}
      </button>
      <br />
      {!!showposts &&
        postData?.map((post) => (
          <div key={post.id}>
            <p>{post.userId}</p>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>--------------------------------------------</p>
          </div>
        ))}
    </>
  );
}

export default App;
