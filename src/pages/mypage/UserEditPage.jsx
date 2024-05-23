import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import UserEditForm from "../../components/user/UserEditForm";

function UserEditPage() {
  const { user } = useRouteLoaderData("user");

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={user}>
        {(userData) => <UserEditForm user={userData} />}
      </Await>
    </Suspense>
  );
}

export default UserEditPage;
