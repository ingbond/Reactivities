import React from "react";
import { AxiosResponse } from "axios";
import {
  Message,
  MessageHeader,
  MessageList,
  MessageItem,
} from "semantic-ui-react";

interface IProps {
  error: AxiosResponse;
  text?: string;
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
    console.log('ErrorMessage',error);
    
  return (
    <Message error>
      <MessageHeader>{error.statusText}</MessageHeader>
      {error.data && Object.keys(error.data.errors).length > 0 && (
        <MessageList>
          {Object.values(error.data.errors)
            .flat()
            .map((err, i) => (
              <MessageItem key={i}>{err}</MessageItem>
            ))}
        </MessageList>
      )}
      {text && <Message content={text}></Message>}
    </Message>
  );
};

export default ErrorMessage;
