import Header from "../components/Header";
import axios from "axios";
import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import UsersList from "../components/UsersList";

function SearchPage() {
  const { users } = useRouteLoaderData("users");

  return (
    <>
      <Header />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={users}>
          {(usersData) => <UsersList users={usersData} />}
        </Await>
      </Suspense>
    </>
  );
}

export default SearchPage;

async function loadUsers() {
  const response = await axios.get("/api/user", {
    withCredentials: true,
  });

  if (response.status !== 200) {
    return new Error("failed to users");
  }

  const resData = await response.data;

  return resData;
}

export function loader() {
  // params는 추후 구현
  return defer({
    users: loadUsers(),
  });
}
