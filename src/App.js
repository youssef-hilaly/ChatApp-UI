import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Container, Row, Col } from 'react-bootstrap';
import WaitingRoom from './Components/WaitingRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './Components/ChatRoom';

function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    try {
      await conn.invoke('SendMessage', message);
    }
    catch (err) {
      console.log(err);
    }
  }

  const joinChatRoom = async (username, chatRoom) => {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7274/chat')
        .configureLogging(LogLevel.Information)
        .build();

      newConnection.on("JoinSpecificChatRoom", (username, mgs) => {
        setMessages(messages => [...messages, {username, mgs}]);
      });

      newConnection.on("ReceiveSpecificMessage", (username, mgs) => {
        setMessages(messages => [...messages, {username, mgs}]);
      });

      await newConnection.start();
      await newConnection.invoke('JoinSpecificChatRoom', {username, chatRoom});

      setConnection(newConnection);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className='text-center'>Welcome to Chat App</h1>
            </Col>
          </Row>
          {!conn?
           <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>:
           <ChatRoom messages={messages} sendMessage={sendMessage} /> }      
        </Container>
      </main>

    </div>
  );
}

export default App;
