import React from 'react';
import { ImWarning } from 'react-icons/im';

const MessageWarning = (props) => {
  return (
    <p className="message">
      {' '}
      <span>
        <ImWarning />
      </span>
      {props.email && 'Please enter a valid email address.'}
      {props.password && (
        <p>
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special character. <br />{' '}
          Allowed special characters @$!%*?&.
        </p>
      )}
      {props.confirmPass && 'Must match the first password input field.'}
    </p>
  );
};

export default MessageWarning;
