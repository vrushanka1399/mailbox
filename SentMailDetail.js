import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const SentMailDetail = () => {
  const { id } = useParams();
  const [mail, setMail] = useState(null);

  const email = localStorage.getItem("email");
  const emailKey = email.replace(".", ",");

  useEffect(() => {
    fetch(
      `https://YOUR_PROJECT_ID.firebaseio.com/mails/sent/${emailKey}/${id}.json`
    )
      .then((res) => res.json())
      .then((data) => setMail(data));
  }, []);

  if (!mail) return null;

  return (
    <Container>
      <h4>{mail.subject}</h4>
      <p>To: {mail.to}</p>

      <div dangerouslySetInnerHTML={{ __html: mail.body }} />
    </Container>
  );
};

export default SentMailDetail;
