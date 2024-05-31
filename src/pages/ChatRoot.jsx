import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Header from "../components/Header";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

const socket = io(process.env.REACT_APP_SOCKET_PROXY);

// 채팅방 상대방 단방향 매칭
function ChatRoot() {
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [me, setMe] = useState(0);
  const [room, setRoom] = useState(0);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const enterChatRoom = (roomId, id) => {
    socket.emit("joinRoom", { roomId, id });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/chat/", {
          withCredentials: true,
        });
        const userResponse = await axios.get("/api/auth", {
          withCredentials: true,
        });
        setMe(userResponse.data.user.id);
        const data = response.data;
        setChatData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSend = (e) => {
    e.preventDefault();

    // 메시지 보내기
    const roomId = room;
    const id = me;

    socket.emit("sendMessage", {
      roomId: roomId,
      writer: id,
      message: input,
    });

    setInput("");
  };

  useEffect(() => {
    if (room !== 0 && me !== 0) {
      const handleMessages = (messages) => {
        setMessages(messages);
      };

      const handleMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      socket.on("messages", handleMessages);
      socket.on("message", handleMessage);
      enterChatRoom(room, me);

      return () => {
        // 채팅방 나가기
        socket.emit("leaveRoom", { roomId: room, id: me });
        socket.off("messages", handleMessages);
        socket.off("message", handleMessage);
      };
    }
  }, [room, me]);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={8} className="mx-auto">
            <h2 className="text-center my-4">Chat</h2>
            <Row>
              <Col md={4}>
                <ListGroup>
                  {chatData.map((chat) => (
                    <ListGroup.Item
                      key={chat.room_id}
                      action
                      onClick={() => {
                        setSelectedUser(chat.user2.username);
                        setRoom(chat.room_id);
                      }}
                      active={room === chat.room_id}
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
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`message ${
                            parseInt(message.writer) === parseInt(me)
                              ? "sent"
                              : "received"
                          }`}
                        >
                          <div className="message-bubble">
                            <span>{message.message}</span>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
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
          </Col>
        </Row>
      </Container>
      <style>
        {`
          .chat-box {
            height: 400px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
          }

          .message {
            margin-bottom: 10px;
          }

          .message-bubble {
            padding: 8px 12px;
            border-radius: 20px;
            display: inline-block;
            max-width: 80%;
            background-color: #f4f4f4;
          }

          .sent {
            text-align: right;
            margin-left: auto;
          }

          .input-box {
            margin-top: 20px;
          }

          .list-group-item.active {
            background-color: #007bff;
            color: #fff;
            border-color: #007bff;
          }
        `}
      </style>
    </>
  );
}

export default ChatRoot;