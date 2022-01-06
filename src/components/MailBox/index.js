/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getMail } from '../../services/flixApi';
import { formatDate, getFirstChar } from '../../utils';
import Button from '../Button';
import './index.css';

const MailBox = ({ mail }) => {
  const [mailData, setMailData] = useState();

  useEffect(() => {
    getMail(mail.id)
      .then((res) => res.json())
      .then((data) => setMailData(data));
  }, [mail.id]);

  const renderHTML = (markup) => {
    return {
      __html: markup,
    };
  };

  return (
    <article className="MailBox__root">
      <h3>{getFirstChar(mail.from.name)}</h3>
      <section className="MailBox__container">
        <header className="MailBox__header">
          <div>
            <h2>{mail.subject}</h2>
            <p>{formatDate(mail.date)}</p>
          </div>
          <Button variant="contained" color="textSecondary">
            Favorite
          </Button>
        </header>
        <div dangerouslySetInnerHTML={renderHTML(mailData?.body)} />
      </section>
    </article>
  );
};

export default MailBox;
