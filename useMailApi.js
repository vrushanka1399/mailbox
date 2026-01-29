import { useCallback } from "react";

const PROJECT_ID = "YOUR_PROJECT_ID"; // CHANGE THIS

const useMailApi = () => {
  const email = localStorage.getItem("email");
  const emailKey = email.replace(".", ",");

  const getInbox = useCallback(async () => {
    const res = await fetch(
      `https://${PROJECT_ID}.firebaseio.com/mails/inbox/${emailKey}.json`
    );

    return await res.json();
  }, []);

  const deleteInboxMail = async (id) => {
    await fetch(
      `https://${PROJECT_ID}.firebaseio.com/mails/inbox/${emailKey}/${id}.json`,
      {
        method: "DELETE",
      }
    );
  };

  const markAsRead = async (id) => {
    await fetch(
      `https://${PROJECT_ID}.firebaseio.com/mails/inbox/${emailKey}/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ read: true }),
      }
    );
  };

  return {
    getInbox,
    deleteInboxMail,
    markAsRead,
  };
};

export default useMailApi;
