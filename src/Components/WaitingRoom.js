import React, { useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap';

function WaitingRoom({ joinChatRoom}) {
    const [username, setUsername] = useState('');
    const [chatRoom, setChatRoom] = useState('');

  return (
    <form onSubmit={e => {
        e.preventDefault();
        joinChatRoom(username, chatRoom);
    }}>

        <Row className="px-5 py-5">
            <Col sm={12}>
            <Form.Group>
                <Form.Control placeholder='Username' onChange={e => setUsername(e.target.value)} />
                <Form.Control placeholder='chatRoom' onChange={e => setChatRoom(e.target.value)} />
            </Form.Group>
            </Col>
            <Col sm = {12}>
                <Button type='submit' variant='primary' block>Join Chat Room</Button>
            </Col>
        </Row>
    </form>
  )
}
export default WaitingRoom