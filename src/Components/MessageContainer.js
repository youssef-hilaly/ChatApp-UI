import React from 'react'

function MessageContainer({messages}) {
  return (
    <div>
        {console.log(messages)}
        {messages.map((msg, index) => {
            return (
                <table striped bordered>
                    <tr ket={index}>
                        <td>{msg.username} - {msg.mgs}</td>
                    </tr>
                </table>
            )
        }
    )}
    </div>
  )
}

export default MessageContainer