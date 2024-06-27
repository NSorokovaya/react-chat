import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/selectors";
import {
  selectChatId,
  selectMessagesList,
} from "../../../redux/messaging/selectors";
import React, { useEffect, useRef, useState } from "react";
import {
  loadMoreMessages,
  subscribeToMessagesList,
} from "../../../redux/messaging/actions";
import { MemoizedChatMessage } from "./ChatMessage";
import EmptyStateMessage from "./EmptyStateMessage";
import { isDifferentDay, showDateAndTime } from "../../../utils/functions";

export default function ChatMessageList() {
  const dispatch = useDispatch();

  const chatId = useSelector(selectChatId);
  const currentUser = useSelector(selectCurrentUser);
  const messagesList = useSelector(selectMessagesList);

  const filteredMessagesList = messagesList.filter((m) => !!m.createdAt);

  useEffect(() => {
    if (chatId) {
      dispatch(subscribeToMessagesList({ chatId }));
    }
  }, [chatId, dispatch]);

  // const messagesScrollRef = useRef<HTMLLIElement | null>(null);

  // TODO: do with a CSS (flex-direction: column-reverse;)
  // useEffect(() => {
  //   messagesScrollRef.current?.lastElementChild?.scrollIntoView();
  // }, [messagesList]);

  // const handleScroll = () => {
  //   console.log("handle scroll");
  //   const container = containerRef.current;
  //   console.log("container");
  //   if (container) {
  //     if (container.scrollTop === 0) {
  //       console.log("loadmore");
  //       dispatch(loadMoreMessages({ chatId }));
  //     }
  //   }
  // };
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        dispatch(loadMoreMessages({ chatId }));
      }
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [dispatch, chatId]);

  return (
    <div className="flex-grow overflow-y-auto p-4  bg-white flex flex-col-reverse">
      <div className="space-y-2 ">
        {filteredMessagesList ? (
          filteredMessagesList.map((message, index) => {
            const showDate =
              index === 0 ||
              isDifferentDay(
                message.createdAt,
                filteredMessagesList[index - 1].createdAt
              );

            return (
              <React.Fragment key={message.id}>
                {showDate && (
                  <div className="date-time flex items-center  ">
                    <div className=" h-[1px] bg-blue-100 w-full"></div>
                    <div className="w-full flex justify-center text-gray-500 text-sm/[20px] ">
                      {showDateAndTime(message.createdAt)}
                    </div>
                    <div className="h-[1px] bg-blue-100 w-full"></div>
                  </div>
                )}
                <li
                  // ref={messagesScrollRef}
                  key={message.id}
                  className={`flex relative ${
                    message.creator === currentUser?.uid
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <MemoizedChatMessage message={message} chatId={chatId} />
                </li>
              </React.Fragment>
            );
          })
        ) : (
          <EmptyStateMessage chatId={chatId} />
        )}
      </div>

      <div ref={containerRef} />
    </div>
  );
}
