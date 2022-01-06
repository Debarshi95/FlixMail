import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { sanitize } from 'dompurify';
import { getMail } from '../../services/flixApi';
import { formatDate, getFirstChar, persistInStorage } from '../../utils';
import Button from '../Button';
import './index.css';
import strings from '../../utils/strings';

const MailBox = ({ mail }) => {
  const [mailData, setMailData] = useState();

  useEffect(() => {
    getMail(mail.id)
      .then((res) => res.json())
      .then((data) => setMailData(data));
  }, [mail.id]);

  const renderHTML = (markup) => {
    const html = sanitize(markup);
    return {
      __html: html,
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
          <Button
            variant="contained"
            color="textSecondary"
            onClick={() => persistInStorage(mail, strings.storageKeys.favorite)}
          >
            Favorite
          </Button>
        </header>
        {mailData?.body && <div dangerouslySetInnerHTML={renderHTML(mailData.body)} />}
      </section>
    </article>
  );
};

MailBox.propTypes = {
  mail: PropTypes.shape({
    id: PropTypes.string,
    from: PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
    }),
    date: PropTypes.number,
    subject: PropTypes.string,
    short_description: PropTypes.string,
  }).isRequired,
};

export default MailBox;
