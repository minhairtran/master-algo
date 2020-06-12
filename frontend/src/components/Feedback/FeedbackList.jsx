import React, { useState, useEffect } from "react";
import apiFeedbacksList from "../../api/feedback/apiFeedbacksList";

export const FeedbacksList = (props) => {
    const {loginedUser} = props
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbacksInit, setFeedbacksInit] = useState([]);
    const [feedbacksDidSet, setFeedbacksDidSet] = useState(false);
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("username"))
  
    const myCallback = (response, status) => {
      if (status === 200) {
        setFeedbacksInit(response);
        setFeedbacksDidSet(true);
      } else {
        alert("There was an error");
      }
    };
  
    useEffect(() => {
      const final = [...props.newFeedback].concat(feedbacksInit);
      if (final.length !== feedbacks.length) {
        setFeedbacks(final);
      }
    }, [props.newFeedback, feedbacks, feedbacksInit, currentUser]);
  
    useEffect(() => {
      if (feedbacksDidSet === false) {
        apiFeedbacksList(currentUser, myCallback);
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
  