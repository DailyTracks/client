import { json, defer, useRouteLoaderData } from "react-router-dom";
import BoardsList from "../../components/board/BoardsList";
import { useEffect, useState } from "react";

function Boards() {
  const [loadedBoards, setLoadedBoards] = useState(null);
  const { events } = useRouteLoaderData("boards");

  useEffect(() => {
    events
      .then((result) => {
        setLoadedBoards(result);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, [events]);

  return (
    <>
      <div>
        {loadedBoards ? (
          <BoardsList boards={loadedBoards} />
        ) : (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Boards;

async function loadBoards(region, type) {
  let url = "/api/board";

  if (region) {
    url += "?region=" + region;
  }

  if (type) {
    url += "&type=" + type;
  }

  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${response.statusText}`);
    throw json(
      { message: "Could not fetch boards." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export function loader({ request }) {
  const region = new URL(request.url).searchParams.get("region");
  const type = new URL(request.url).searchParams.get("type");
  return defer({
    events: loadBoards(region, type),
  });
}
