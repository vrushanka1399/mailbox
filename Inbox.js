import React, { useEffect, useState } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const [mails, setMails] = useState([]);
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

        setMails(loaded.reverse());
      });
  }, []);

  return (
    <Container className="mt-4">

      <Button className="mb-3" onClick={() => navigate("/compose")}>
        Compose
      </Button>

      <ListGroup>
        {mails.map((mail) => (
          <ListGroup.Item key={mail.id}>
            <strong>{mail.from}</strong> — {mail.subject}
          </ListGroup.Item>
        ))}
      </ListGroup>

    </Container>
  );
};

export default Inbox;
