import Header from "../components/Header";
import axios from "axios";
import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import UsersList from "../components/user/UsersList";

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

async function loadUsers(name) {
  let url = "/api/user";

  if (name) {
    url += "?name=" + name;
  }

  console.log(url);
  const response = await axios.get(url, {
    withCredentials: true,
  });

  console.log(response);

  if (response.status !== 200) {
    return new Error("failed to users");
  }

  const resData = await response.data;

  return resData;
}

export function loader({ request }) {
  const name = new URL(request.url).searchParams.get("name");
  return defer({
    users: loadUsers(name),
  });
}
