import { useEffect, useState } from "react";
import { User, signInWithPopup } from "firebase/auth";

import { auth, provider } from "./firebase";
import { createChat } from "./api/chats-api";

const Header = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  const onCreateChatClick = async () => {
    if (currentUser && currentUser.uid) {
      const newChatId = await createChat(currentUser.uid);
      window.location.href = `/chats/${newChatId}`;
    }
  };

  const onSignInClick = () => {
    signInWithPopup(auth, provider);
  };

  const onSignOutClick = () => {
    auth.signOut();
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
