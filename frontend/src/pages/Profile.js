import React, { useEffect, useState } from "react";
import loadFeedbacks from "../api/feedback";

const Profile = () => {
  const textAreaRef = React.createRef();
  const [newFeedback, setNewFeedback] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const newVal = textAreaRef.current.value;
    let tempNewFeedback = [...newFeedback];
    // change this to a server side call
    tempNewFeedback.unshift({
      content: newVal,
      id: 12313,
    });
    setNewFeedback(tempNewFeedback);
    textAreaRef.current.value = "";
  };
  return (
    <div className>
      <div className="col-12 mb-3">
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textAreaRef}
            required={true}
            className="form-control"
            name="feedback"
          ></textarea>
          <button type="submit" className="btn btn-primary my-3">
            Feedback
          </button>
        </form>
      </div>
      <FeedbacksList newFeedback={newFeedback} />
    </div>
  );
};

export const FeedbacksList = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacksInit, setFeedbacksInit] = useState([]);
  const [feedbacksDidSet, setFeedbacksDidSet] = useState(false);

  const myCallback = (response, status) => {
    if (status === 200) {
      setFeedbacksInit(response);
      setFeedbacksDidSet(true);
    } else {
      alert("There was an error");
    }
  };

  useEffect(()=>{
    const final = [...props.newFeedback].concat(feedbacksInit)
    if (final.length !== feedbacks.length) {
      setFeedbacks(final)
    }
  }, [props.newFeedback, feedbacks, feedbacksInit])
  
  useEffect(() => {
    if (feedbacksDidSet === false) {
      loadFeedbacks(myCallback);
    }
  }, [feedbacksInit, feedbacksDidSet, setFeedbacksDidSet]);

  return feedbacks.map((item, index) => {
    return (
      <FeedbackShowBox
        feedback={item}
        className="my-5 py-5 border bg-white text-dark"
        key={`${index}-{item.id}`}
      />
    );
  });
};

export const FeedbackShowBox = (props) => {
  const { feedback } = props;
  const className = props.className
    ? props.className
    : "col-10 mx-auto col-md-6";
  return (
    <div className={className}>
      <p>
        {feedback.id} - {feedback.content}
      </p>
    </div>
  );
};

export default Profile;
