
import React from 'react';

interface Props {
  error: string | Error;
}
const FallBackUI: React.FC<Props> = ({ error }) => {
  return (
    <>
      <h1>Take me home</h1>
      <p>{error.toString()}</p>
    </>
  );
};

export default FallBackUI;
