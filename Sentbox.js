import React, { useEffect, useReducer } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  if (action.type === "SET") return action.payload;
  return state;
};

const Sentbox = () => {
  const [mails, dispatch] = useReducer(reducer, []);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const emailKey = email.replace(".", ",");

  useEffect(() => {
    fetch(
      `https://YOUR_PROJECT_ID.firebaseio.com/mails/sent/${emailKey}.json`
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

  return (
    <Container className="mt-3">

      <Button onClick={() => navigate("/compose")}>Compose</Button>

      <h5 className="mt-2">Sent</h5>

      <ListGroup className="mt-3">

        {mails.map((mail) => (
          <ListGroup.Item
            key={mail.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/sent/${mail.id}`)}
          >
            <strong>To:</strong> {mail.to} — {mail.subject}
          </ListGroup.Item>
        ))}

      </ListGroup>

    </Container>
  );
};

export default Sentbox;
