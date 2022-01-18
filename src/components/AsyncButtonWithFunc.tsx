import React from 'react';

interface IProps {
  label: string;
  isPending: boolean;
  handler: Function;
}

const AsyncButtonWithFunc: React.FC<IProps> = ({
  label,
  isPending,
  handler,
}) => {
  return (
    <>
      {!isPending && (
        <button
          onClick={() => handler()}
          className='btn-outlined-secondary bg-hover-secondary text-hover-white'
        >
          {label}
        </button>
      )}
      {isPending && (
        <button
          disabled
          className='btn-outlined-secondary bg-hover-secondary text-hover-white'
        >
          Loading...
        </button>
      )}
    </>
  );
};

export default AsyncButtonWithFunc;
