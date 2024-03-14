import React, { useEffect, useState } from "react";
import { Button, Col, Row, Alert } from "react-bootstrap"; // Import Alert component
import Comment from "../Comment";
import ajax from "../Services/fetchService";
import { useUser } from "../UserProvider";

const CommentContainer = (props) => {
  const { assignmentId } = props;
  const user = useUser();

  const emptyComment = {
    id: null,
    text: "",
    assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
    user: user.jwt,
    createdDate: null,
  };

  const [comment, setComment] = useState(emptyComment);
  const [comments, setComments] = useState([]);
  const [showEmptyCommentAlert, setShowEmptyCommentAlert] = useState(false); // State to track empty comment alert

  function handleEditComment(commentId) {
    const i = comments.findIndex((comment) => comment.id === commentId);
    const commentCopy = {
      id: comments[i].id,
      text: comments[i].text,
      assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
      user: user.jwt,
      createdDate: comments[i].createdDate,
    };
    setComment(commentCopy);
  }

  function handleDeleteComment(commentId) {
    // Send DELETE request to server
    ajax(`/api/comments/${commentId}`, "delete", user.jwt).then((msg) => {
      // After successfully deleting from the server, update the local state
      const commentsCopy = [...comments];
      const i = commentsCopy.findIndex((comment) => comment.id === commentId);
      if (i !== -1) {
        commentsCopy.splice(i, 1);
        setComments(commentsCopy); // Directly update the state
      }
    });
  }

  function formatComments(commentsData) {
    setComments(commentsData); // Update comments state directly
  }

  useEffect(() => {
    ajax(
      `/api/comments?assignmentId=${assignmentId}`,
      "get",
      user.jwt,
      null
    ).then((commentsData) => {
      formatComments(commentsData);
    });
  }, []);

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }

  function submitComment() {
    if (comment.text.trim() === "") {
      setShowEmptyCommentAlert(true); // Show alert if comment is empty
      return;
    }

    setShowEmptyCommentAlert(false); // Hide the alert if comment is not empty

    if (comment.id) {
      const updatedComment = { ...comment, isEdited: true }; // Mark the comment as edited
      ajax(`/api/comments/${comment.id}`, "put", user.jwt, updatedComment).then(
        (d) => {
          const commentsCopy = [...comments];
          const i = commentsCopy.findIndex((comment) => comment.id === d.id);
          commentsCopy[i] = d;
          formatComments(commentsCopy);

          setComment(emptyComment);
        }
      );
    } else {
      ajax("/api/comments", "post", user.jwt, comment).then((d) => {
        const commentsCopy = [...comments];
        commentsCopy.push(d);
        formatComments(commentsCopy);
        setComment(emptyComment);
      });
    }
  }

  return (
    <>
      <div className="mt-5">
        <h4>Comments</h4>
      </div>
      <Row>
        <Col lg="8" md="10" sm="12">
          <textarea
            style={{ width: "100%", borderRadius: "0.25em" }}
            onChange={(e) => updateComment(e.target.value)}
            value={comment.text}
          ></textarea>
          {showEmptyCommentAlert && ( // Render alert if showEmptyCommentAlert is true
            <Alert variant="danger" className="mt-2">
              Please enter a comment before posting.
            </Alert>
          )}
        </Col>
      </Row>
      <Button onClick={() => submitComment()}>Post Comment</Button>
      <div className="mt-5">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            emitDeleteComment={handleDeleteComment}
            emitEditComment={handleEditComment}
          />
        ))}
      </div>
    </>
  );
};

export default CommentContainer;
