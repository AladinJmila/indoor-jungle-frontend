import React from 'react';

interface IProps {
  label: string;
  isPending: boolean;
}

const AsyncButton: React.FC<IProps> = ({ label, isPending }) => {
  return (
    <>
      {!isPending && (
        <button className='center-self btn-outlined-secondary bg-hover-secondary text-hover-white '>
          {label}
        </button>
      )}
      {isPending && (
        <button
          disabled
          className='center-self btn-outlined-secondary bg-hover-secondary text-hover-white '
        >
          Loading...
        </button>
      )}
    </>
  );
};

export default AsyncButton;
