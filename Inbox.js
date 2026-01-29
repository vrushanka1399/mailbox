import React, { useEffect, useReducer, useRef } from "react";
import { Container, Button, ListGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useMailApi from "../hooks/useMailApi";

const reducer = (state, action) => {
  if (action.type === "SET") return action.payload;
  return state;
};

const Inbox = () => {
  const [mails, dispatch] = useReducer(reducer, []);
  const prevCount = useRef(0);

  const navigate = useNavigate();
  const { getInbox, deleteInboxMail } = useMailApi();

  const fetchMails = async () => {
    const data = await getInbox();

    const loaded = [];

    for (let key in data) {
      loaded.push({ id: key, ...data[key] });
    }

    if (loaded.length !== prevCount.current) {
      prevCount.current = loaded.length;
      dispatch({ type: "SET", payload: loaded.reverse() });
    }
  };

  useEffect(() => {
    fetchMails();

    const timer = setInterval(fetchMails, 2000);

    return () => clearInterval(timer);
  }, []);

  const unreadCount = mails.filter((m) => !m.read).length;

  const deleteHandler = async (e, id) => {
    e.stopPropagation();

    await deleteInboxMail(id);

    dispatch({
      type: "SET",
      payload: mails.filter((m) => m.id !== id),
    });
  };

  return (
    <Container className="mt-3">

      <Button variant="secondary" onClick={() => navigate("/sent")}>
        Sent
      </Button>{" "}

      <Button onClick={() => navigate("/compose")}>
        Compose
      </Button>

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
