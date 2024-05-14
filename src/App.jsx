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
import CommentRoot from "./pages/CommentRoot";
import CommentDetail, {
  action as deleteCommentAction,
} from "./pages/CommentDetail";
import { action as commentFormAction } from "./components/CommentForm";
import EditComment from "./pages/EditComment";
import NewComment from "./pages/NewComment";
import MyPage from "./pages/MyPage";
import { action as profileAction } from "./components/AuthForm";

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
                path: ":commentId",
                id: "comment-detail",
                element: <CommentRoot />,
                children: [
                  {
                    index: true,
                    element: <CommentDetail />,
                    action: deleteCommentAction,
                  },
                  {
                    path: "edit",
                    element: <EditComment />,
                    action: commentFormAction,
                  },
                ],
              },
              {
                path: "edit",
                element: <EditBoard />,
                action: boardFormAction,
              },
              {
                path: "new",
                element: <NewComment />,
                action: commentFormAction,
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
    action: profileAction,
  },
  {
    path: "mypage",
    element: <MyPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
