import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/actions";

import { createChat } from "./api/chats-api";
import { RootState } from "./redux/reducers";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const onCreateChatClick = async () => {
    if (currentUser && currentUser.uid) {
      const newChatId = await createChat(currentUser.uid);
      window.location.href = `/chats/${newChatId}`;
    }
  };

  const onSignInClick = () => {
    dispatch(login());
  };

  const onSignOutClick = () => {
    dispatch(logout());
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
