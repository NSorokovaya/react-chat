import { useMessagesList } from "./useMessagesList";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { messagesList } = useMessagesList(chatId);
  const messagesScrollRef = useRef<HTMLLIElement | null>(null);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    messagesScrollRef.current?.lastElementChild?.scrollIntoView();
  }, [messagesList]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date;
  };
  return (
    <div className="flex flex-col h-[900px] w-[600px] border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 bg-white">
        <ul className="space-y-2">
          <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            {messagesList.map((message) => (
              <li
                ref={messagesScrollRef}
                key={message.id}
                className={`flex relative ${
                  message.creator === currentUser?.uid
                    ? "justify-end"
                    : "justify-start "
                }`}
              >
                <Popover.Trigger
                  onMouseEnter={() => setIsPopoverOpen(true)}
                  onMouseLeave={() => setIsPopoverOpen(false)}
                >
                  <div className=" mb-4 relative ">
                    <p className="text-gray-400 text-end">
                      {formatDate(message.createdAt).toLocaleString()}
                    </p>
                    <div className="flex items-center bg-gray-100 rounded-lg p-4">
                      <div className=" mr-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-gray-600">
                          {message.creator === currentUser?.uid
                            ? currentUser.displayName
                            : "Other Users"}
                        </p>
                        <div className="text-black">{message.text}</div>
                      </div>
                    </div>
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    className="z-50 absolute "
                    sideOffset={-130}
                    onOpenAutoFocus={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <div className="bg-white w-[50px]"> ... </div>
                  </Popover.Content>
                </Popover.Portal>
              </li>
            ))}
          </Popover.Root>
        </ul>
      </div>
      <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
        <ChatInput chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatWindow;
