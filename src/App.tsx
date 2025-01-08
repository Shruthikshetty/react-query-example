import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./utils/api";
import { UerData } from "./utils/types";
/**
 * 1.react query is like a wrapper that wraps your api request and it manages that
 * state
 * 2. it retry's multile times if failed can check  failureCount
 */

/**
 * 1.useQuery is used for fetch req
 * 2.mutation is used for post / patch etc since
 *    its modification of data hence named mutation
 */
function App() {
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
  } = useQuery<UerData[]>({
    /* used to internally cache the data mapped by the query key, refetch etc */
    queryKey: ["hetUsers"],
    /* a warpper to query call function */
    queryFn: getUsers,
  });

  console.log();

  if (usersError && !usersLoading)
    return <p>Error occured while fetchingdetails</p>;
  if (usersLoading) return <p>Loading data</p>;
  return (
    <div>
      {usersData?.map((detail) => (
        <div>
          <p style={{ fontWeight: "bold" }}>{detail.username}</p>
          <p>{detail.email}</p>
          <p>{detail.address.city}</p>
          <p>----------------------------</p>
        </div>
      ))}
    </div>
  );
}

export default App;
