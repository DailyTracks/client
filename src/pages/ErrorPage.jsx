import Header from "../components/Header";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <Header />
      <main>
        <p>{error.message}</p>
      </main>
    </>
  );
}

export default ErrorPage;
