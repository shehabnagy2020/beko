import MainPageContainer from "@/components/MainPageContainer";
import React from "react";

const Chat = () => {
  return (
    <MainPageContainer className="" title="المحادثات" chat={true}>
      <div className="flex w-full h-full">
        <iframe
          src="https://dashboard.tawk.to/#/chat"
          className="w-full h-full"
        />
      </div>
    </MainPageContainer>
  );
};

export default Chat;
