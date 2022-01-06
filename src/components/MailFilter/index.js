import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import strings from '../../utils/strings';
import { toStartCase } from '../../utils';
import './index.css';

const btns = [
  { id: 1, text: strings.storageKeys.unread, variant: 'text', color: 'textPrimary' },
  { id: 2, text: strings.storageKeys.read, variant: 'text', color: 'textPrimary' },
  { id: 3, text: strings.storageKeys.favorite, variant: 'text', color: 'textPrimary' },
];

const MailHeader = ({ handleMailFilter }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleSelectedType = (type) => {
    setSelectedType(type);
    handleMailFilter(type);
  };

  return (
    <header className="MailFilter__root">
      <h3>Filter By</h3>
      {btns.map((btn) => (
        <Button
          key={btn.id}
          variant={btn.variant}
          color={btn.color}
          onClick={() => handleSelectedType(btn.text)}
          selected={selectedType === btn.text}
        >
          {toStartCase(btn.text)}
        </Button>
      ))}
    </header>
  );
};
MailHeader.propTypes = {
  handleMailFilter: PropTypes.func.isRequired,
};
export default MailHeader;
