import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/auth/actions";

import { createChat } from "./api/chats-api";
import { RootState } from "./redux/reducers";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const onCreateChatClick = async () => {
    if (currentUser && currentUser.uid) {
      const newChatId = await createChat(currentUser.uid);
      window.location.href = `/chats/${newChatId}`;
    }
  };

  const onSignInClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(login(user));
    } catch (error) {
      console.error("Sign-in failed", error);
    }
  };

  const onSignOutClick = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error("Sign-out failed", error);
    }
  };

  return (
    <header className="px-5 flex gap-5 justify-end">
      {currentUser ? (
        <>
          <button
            className="cursor-pointer hover:underline"
            onClick={onCreateChatClick}
          >
            Create Chat
          </button>
          <button
            className="cursor-pointer hover:underline"
            onClick={onSignOutClick}
          >
            {currentUser.displayName}
          </button>
        </>
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
