/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import Button from '../Button';
import './index.css';

const btns = [
  { text: 'Unread', variant: 'text', color: 'textPrimary' },
  { text: 'Read', variant: 'text', color: 'textPrimary' },
  { text: 'Favorites', variant: 'text', color: 'textPrimary' },
];

const MailHeader = ({ handleMailFilter }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleSelectedType = (type) => {
    setSelectedType(type);
    handleMailFilter(type);
  };
  const memoizedHandleSelectedType = useCallback((args) => handleSelectedType(args), []);

  return (
    <header className="MailFilter__root">
      <h3>Filter By</h3>
      {btns.map((btn, idx) => (
        <Button
          key={idx}
          variant={btn.variant}
          color={btn.color}
          handleSelectedType={memoizedHandleSelectedType}
          selected={selectedType === btn.text.toLowerCase()}
        >
          {btn.text}
        </Button>
      ))}
    </header>
  );
};

export default MailHeader;
