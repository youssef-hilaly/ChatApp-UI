import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap';

function SendMessageForm({sendMessage}) {
    const [message, setMessage] = useState('');
  return (
    <Form onSubmit={e => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }}>
        <InputGroup>
            <InputGroup.Text> Chat </InputGroup.Text>
            <Form.Control placeholder='Message' onChange={e => setMessage(e.target.value)} value={message} />
            <Button type='submit' variant='primary' disabled={!message}>Send Message</Button>
        </InputGroup>
    </Form>
  )
}

export default SendMessageForm