/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from 'react';
import {
  formatDate,
  getFirstChar,
  loadFromStorage,
  persistInStorage,
  toStartCase,
} from '../../utils';
import './index.css';

const MailCard = ({ mail, handleMailSelected, children }) => {
  const [isRead, setIsRead] = useState(false);
  const { from } = mail;

  useEffect(() => {
    const data = loadFromStorage('read');
    if (data) {
      data.list.forEach((item) => {
        if (item.id === mail.id) {
          setIsRead(true);
        }
      });
    }
  }, [mail.id]);

  const addToReadList = (_, mailItem) => {
    persistInStorage(mailItem, 'read');
    handleMailSelected(mailItem);
    setIsRead(true);
  };

  return (
    <div
      className={`MailCard__root ${isRead ? 'MailCard--read' : ''}`}
      onClick={(e) => addToReadList(e, mail)}
      role="button"
      tabIndex={0}
      aria-hidden
    >
      <h2>{getFirstChar(from.name)}</h2>
      <article className="MailCard__contentContainer">
        <p>
          From: <span>{toStartCase(from.name)}</span> <span>{mail.from.email}</span>
        </p>
        <p>
          Subject: <span>{mail.subject}</span>
        </p>
        <p>{mail.short_description}</p>
        <div className="MailCard__contentAction">
          <p>{formatDate(mail.date)}</p>
          {children}
        </div>
      </article>
    </div>
  );
};

export default memo(MailCard);
