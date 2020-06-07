import React, { useState } from "react";

import apiFeedbackCreate from "../../api/feedback/apiFeedbackCreate";
import { FeedbacksList } from "./FeedbackList";

const Feedback = (props) => {
  const textAreaRef = React.createRef();
  const [newFeedback, setNewFeedback] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newVal = textAreaRef.current.value;
    let tempNewFeedback = [...newFeedback];
    apiFeedbackCreate(newVal, (response, status) => {
      if (status === 201) {
        tempNewFeedback.unshift(response);
        setNewFeedback(tempNewFeedback);
      } else {
        alert("An error occur. Try again.");
      }
    });
    // change this to a server side call
    textAreaRef.current.value = "";
  };
  return (
    <div>
      <div className="col-12 mb-3">
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textAreaRef}
            required={true}
            className="form-control"
            name="feedback"
          ></textarea>
          <button type="submit" className="btn btn-primary my-3">
            Save
          </button>
        </form>
      </div>
      <FeedbacksList newFeedback={newFeedback} user={props.user} />
    </div>
  );
};

export default Feedback;
