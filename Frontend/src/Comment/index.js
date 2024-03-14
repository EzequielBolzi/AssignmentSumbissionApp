import React from "react";
import { useUser } from "../UserProvider";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from "jwt-decode";

const Comment = (props) => {
 const user = useUser();
 const decodedJwt = jwtDecode(user.jwt);
 const { id, createdBy, text, createDate } = props.commentData;
 const { emitEditComment, emitDeleteComment } = props;

 const formatDate = (date) => {
  const commentDate = new Date(date);
  const now = new Date();
  const diffMs = now - commentDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffYears = Math.floor(diffDays / 365);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

  if (diffYears >= 54) {
    return `${now.toLocaleDateString(undefined, options)}`;
  } else {
    return `${commentDate.toLocaleDateString(undefined, options)}`;
  } 
}

 return (
    <>
      <div className="comment-bubble">
        <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
          <div>{`${createdBy.name}`}</div>
          
          {decodedJwt.sub === createdBy.username ? (
            <>
              <div
                onClick={() => emitEditComment(id)}
                className="edit-button"
              >
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div
                onClick={() => emitDeleteComment(id)}
                className="delete-button"
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>{text}</div>
        <div className="posted-date">
           <span >Posted: {formatDate(createDate)}</span>
        </div>
      </div>

    </>
 );
};

export default Comment;
