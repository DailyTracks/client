import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Header from "../components/Header";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import axios from "axios";

const socket = io("http://localhost:8080");

function ChatRoot() {
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [target, setTarget] = useState(0);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const enterChatRoom = (roomId, id) => {
    socket.emit("joinRoom", { roomId, id });

    // 메시지 수신
    socket.on("messages", (messages) => {
      console.log(messages);
      setMessages(messages);
    });

    socket.on("message", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // 채팅방 나가기
      socket.emit("leaveRoom", { roomId, id });

      // 소켓 연결 해제
      socket.disconnect();
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/chat/", {
          withCredentials: true,
        });

        const data = response.data;
        console.log(data);
        setChatData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMessageSend = (e) => {
    e.preventDefault();

    // 메시지 보내기
    const roomId = 1;
    const id = 1;

    socket.emit("sendMessage", {
      roomId: roomId,
      writer: id,
      message: input,
    });

    setInput("");
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={4}>
            <ListGroup>
              {chatData.map((chat, index) => (
                <ListGroup.Item
                  key={chat.room_id}
                  action
                  onClick={() => {
                    setSelectedUser(chat.user2.username);
                    setTarget(parseInt(chat.user2_id));
                    enterChatRoom(chat.room_id, chat.user1.id);
                  }}
                >
                  {chat.user2.username}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={8}>
            {selectedUser && (
              <>
                <div className="chat-box">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`${
                        parseInt(message.writer) !== parseInt(target)
                          ? "text-left"
                          : "text-right"
                      }`}
                    >
                      <div className="message-bubble">
                        <strong>
                          {parseInt(message.writer) !== parseInt(target)
                            ? "나"
                            : "상대방"}
                          :{" "}
                        </strong>
                        <span>{message.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Form className="input-box" onSubmit={handleMessageSend}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Enter your message"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ChatRoot;
