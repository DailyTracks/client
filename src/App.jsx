import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import BoardsRoot from "./pages/board/BoardsRoot";
import BoardDetail, {
  loader as boardDetailLoader,
  action as deleteBoardAction,
} from "./pages/board/BoardDetail";
import Boards, { loader as boardsLoader } from "./pages/board/Boards";
import NewBoard from "./pages/board/NewBoard";
import EditBoard from "./pages/board/EditBoard";
import { action as boardFormAction } from "./components/BoardForm";
import Authentication from "./pages/Authentication";
import CommentRoot from "./pages/comment/CommentRoot";
import CommentDetail, {
  action as deleteCommentAction,
} from "./pages/comment/CommentDetail";
import { action as commentFormAction } from "./components/CommentForm";
import EditComment from "./pages/comment/EditComment";
import NewComment from "./pages/comment/NewComment";
import MyPageRoot from "./pages/MyPageRoot";
import { action as profileAction } from "./components/AuthForm";
import UserDetailPage from "./pages/UserDetailPage";
import UserFollowPage from "./pages/UserFollowPage";
import UserEditPage from "./pages/UserEditPage";
import ChatRoot from "./pages/ChatRoot";
import { loader as userLoader } from "./pages/UserDetailPage";
import { action as userFormAction } from "./components/UserEditForm";

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
    path: "user/mypage",
    element: <MyPageRoot />,
    id: "user",
    loader: userLoader,
    children: [
      { index: true, element: <UserDetailPage /> },
      { path: "follow", element: <UserFollowPage /> },
      { path: "edit", element: <UserEditPage />, action: userFormAction },
    ],
  },
  {
    path: "chat",
    element: <ChatRoot />,
    children: [],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
