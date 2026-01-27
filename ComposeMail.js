import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const ComposeMail = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const senderEmail = localStorage.getItem("email"); // store this on login

  const sendMailHandler = async () => {
    const htmlBody = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    const mail = {
      to,
      from: senderEmail,
      subject,
      body: htmlBody,
      date: new Date().toISOString(),
    };

    const receiverKey = to.replace(".", ",");
    const senderKey = senderEmail.replace(".", ",");

    // inbox
    await fetch(
      `https://YOUR_PROJECT_ID.firebaseio.com/mails/inbox/${receiverKey}.json`,
      {
        method: "POST",
        body: JSON.stringify(mail),
        headers: { "Content-Type": "application/json" },
      }
    );

    // sent box
    await fetch(
      `https://YOUR_PROJECT_ID.firebaseio.com/mails/sent/${senderKey}.json`,
      {
        method: "POST",
        body: JSON.stringify(mail),
        headers: { "Content-Type": "application/json" },
      }
    );

    alert("Mail sent!");
  };

  return (
    <Container>
      <Form.Control
        placeholder="To"
        className="mb-2"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <Form.Control
        placeholder="Subject"
        className="mb-2"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />

      <Button className="mt-3" onClick={sendMailHandler}>
        Send
      </Button>
    </Container>
  );
};

export default ComposeMail;
