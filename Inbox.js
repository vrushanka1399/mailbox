import React, { useEffect, useReducer } from "react";
import { Container, Button, ListGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  if (action.type === "SET") {
    return action.payload;
  }
  return state;
};

const Inbox = () => {
  const [mails, dispatch] = useReducer(reducer, []);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const emailKey = email.replace(".", ",");

  useEffect(() => {
    fetch(
      `https://YOUR_PROJECT_ID.firebaseio.com/mails/inbox/${emailKey}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const loaded = [];

        for (let key in data) {
          loaded.push({ id: key, ...data[key] });
        }

        dispatch({ type: "SET", payload: loaded.reverse() });
      });
  }, []);

  const unreadCount = mails.filter((m) => !m.read).length;

  return (
    <Container className="mt-3">

      <Button onClick={() => navigate("/compose")}>Compose</Button>

      <h5 className="mt-2">
        Inbox <Badge bg="primary">{unreadCount}</Badge>
      </h5>

      <ListGroup className="mt-3">

        {mails.map((mail) => (
          <ListGroup.Item
            key={mail.id}
            onClick={() => navigate(`/mail/${mail.id}`)}
            style={{ cursor: "pointer" }}
          >

            {!mail.read && (
              <span
                style={{
                  height: 10,
                  width: 10,
                  background: "blue",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: 8,
                }}
              ></span>
            )}

            <strong>{mail.from}</strong> — {mail.subject}

          </ListGroup.Item>
        ))}

      </ListGroup>

    </Container>
  );
};

export default Inbox;
