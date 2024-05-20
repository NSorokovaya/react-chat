import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store.ts";

// pages
import HomePage from "./pages/home/HomePage.tsx";
import { ChatPage } from "./pages/chat/ChatPage.tsx";

import "./index.css";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/chats/:chatId",
    element: <ChatPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
