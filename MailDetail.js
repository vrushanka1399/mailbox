import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const MailDetail = () => {
  const { id } = useParams();
  const [mail, setMail] = useState(null);

  const email = localStorage.getItem("email");
  const emailKey = email.replace(".", ",");

  useEffect(() => {
    fetch(
      `https://YOUR_PROJECT_ID.firebaseio.com/mails/inbox/${emailKey}/${id}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setMail(data);

        // mark as read
        fetch(
          `https://YOUR_PROJECT_ID.firebaseio.com/mails/inbox/${emailKey}/${id}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({ read: true }),
          }
        );
      });
  }, []);

  if (!mail) return null;

  return (
    <Container>
      <h4>{mail.subject}</h4>
      <p>From: {mail.from}</p>

      <div dangerouslySetInnerHTML={{ __html: mail.body }} />
    </Container>
  );
};

export default MailDetail;
