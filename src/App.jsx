import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import BoardsRoot from "./pages/BoardsRoot";
import BoardDetail, {
  loader as boardDetailLoader,
  action as deleteBoardAction,
} from "./pages/BoardDetail";
import Boards, { loader as boardsLoader } from "./pages/Boards";
import NewBoard from "./pages/NewBoard";
import EditBoard from "./pages/EditBoard";
import { action as boardFormAction } from "./components/BoardForm";
import Authentication from "./pages/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "board",
        element: <BoardsRoot />,
        id: "boards",
        loader: boardsLoader,
        children: [
          { index: true, element: <Boards /> },
          {
            path: ":boardId",
            id: "board-detail",
            loader: boardDetailLoader,
            children: [
              {
                index: true,
                element: <BoardDetail />,
                action: deleteBoardAction,
              },
              {
                path: "edit",
                element: <EditBoard />,
                action: boardFormAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewBoard />,
            action: boardFormAction,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
