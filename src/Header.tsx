import { createChat } from "./api/chats-api";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/actions";
import { RootState } from "@reduxjs/toolkit/query";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth, provider } from "./firebase";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const onCreateChatClick = async () => {
    if (currentUser && currentUser.uid) {
      const newChatId = await createChat(currentUser.uid);
      window.location.href = `/chats/${newChatId}`;
    }
  };

  const onSignInClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(login(user));
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  const onSignOutClick = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <header className="px-5 flex gap-5 justify-end">
      {currentUser ? (
        <button
          className="cursor-pointer hover:underline"
          onClick={onCreateChatClick}
        >
          Create Chat
        </button>
      ) : null}

      {currentUser ? (
        <button
          className="cursor-pointer hover:underline"
          onClick={onSignOutClick}
        >
          {currentUser.displayName}
        </button>
      ) : (
        <button
          className="cursor-pointer hover:underline"
          onClick={onSignInClick}
        >
          Sign In
        </button>
      )}
    </header>
  );
};

export default Header;
