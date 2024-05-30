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
import Authentication from "./pages/Authentication";
import CommentRoot from "./pages/comment/CommentRoot";
import CommentDetail, {
  action as deleteCommentAction,
} from "./pages/comment/CommentDetail";
import { action as commentFormAction } from "./components/comment/CommentForm";
import EditComment from "./pages/comment/EditComment";
import NewComment from "./pages/comment/NewComment";
import MyPageRoot from "./pages/mypage/MyPageRoot";
import { action as profileAction } from "./components/AuthForm";
import UserDetailPage from "./pages/mypage/UserDetailPage";
import UserFollowingPage from "./pages/mypage/UserFollowingPage";
import UserEditPage from "./pages/mypage/UserEditPage";
import ChatRoot from "./pages/ChatRoot";
import { loader as userLoader } from "./pages/mypage/UserDetailPage";
import { action as userFormAction } from "./components/user/UserEditForm";
import SearchPage from "./pages/SearchPage";
import { loader as searchLoader } from "./pages/SearchPage";
import UserFollowerPage from "./pages/mypage/UserFollowerPage";
import UserWrite from "./pages/mypage/UserWrite";

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
      { path: "following", element: <UserFollowingPage /> },
      { path: "follower", element: <UserFollowerPage /> },
      { path: "edit", element: <UserEditPage />, action: userFormAction },
      { path: "written", element: <UserWrite /> },
    ],
  },
  {
    path: "chat",
    element: <ChatRoot />,
    children: [],
  },
  {
    path: "search",
    element: <SearchPage />,
    id: "users",
    loader: searchLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
