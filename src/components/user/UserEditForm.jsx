import axios from "axios";
import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";

function UserEditForm({ user }) {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <>
      <Form method="post">
        <p>내 정보 수정하기</p>
        <p>
          <label htmlFor="">이름</label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={user.username || ""}
          />
        </p>
        <div>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default UserEditForm;

export async function action({ request, params }) {
  const id = JSON.parse(sessionStorage.getItem("user")).id;
  const data = await request.formData();

  const userData = {
    username: data.get("username"),
  };
  let url = `/api/user/${id}`;

  const response = await axios.put(url, userData, { withCredentials: true });

  console.log(response);

  return redirect("..");
}
