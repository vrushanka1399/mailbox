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

  const deleteHandler = async (e, id) => {
    e.stopPropagation();

    await fetch(
      `https://YOUR_PROJECT_ID.firebaseio.com/mails/inbox/${emailKey}/${id}.json`,
      {
        method: "DELETE",
      }
    );

    dispatch({
      type: "SET",
      payload: mails.filter((m) => m.id !== id),
    });
  };

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
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/mail/${mail.id}`)}
          >

            <div>

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

            </div>

            <Button
              variant="danger"
              size="sm"
              onClick={(e) => deleteHandler(e, mail.id)}
            >
              Delete
            </Button>

          </ListGroup.Item>
        ))}

      </ListGroup>

    </Container>
  );
};

export default Inbox;
