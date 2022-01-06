import React, { useCallback, useEffect, useState } from 'react';
import MailBox from '../../components/MailBox';
import MailCard from '../../components/MailCard';
import Button from '../../components/Button';
import MailFilter from '../../components/MailFilter';
import { getMails } from '../../services/flixApi';
import { loadFromStorage, persistInStorage } from '../../utils';
import strings from '../../utils/strings';
import './index.css';

const App = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const [mails, setMails] = useState(null);

  useEffect(() => {
    getMails()
      .then((res) => res.json())
      .then((data) => setMails(data))
      .catch((err) => err);
  }, []);

  const handleMailSelected = (mail) => {
    setSelectedMail(mail);
  };

  const memoizedHandleMailSelected = useCallback((args) => handleMailSelected(args), []);

  const handleMailFilter = (filterType) => {
    const { unread } = strings.storageKeys;
    if (filterType === unread) {
      getMails()
        .then((res) => res.json())
        .then((data) => setMails(data))
        .catch((err) => err);
    } else {
      setMails(loadFromStorage(filterType));
    }

    setSelectedMail(null);
  };

  return (
    <main className="App__root">
      <MailFilter handleMailFilter={handleMailFilter} />
      <article className="App__mailsContainer">
        {mails ? (
          <section className={`App__mailsCard ${selectedMail ? 'width-min' : ''}`}>
            {mails?.list?.map((mail) => (
              <MailCard mail={mail} key={mail.id} handleMailSelected={memoizedHandleMailSelected}>
                {selectedMail?.id === mail.id && (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={(e) => {
                      const { favorite } = strings.storageKeys;
                      e.stopPropagation();
                      persistInStorage(mail, favorite);
                    }}
                  >
                    Favorite
                  </Button>
                )}
              </MailCard>
            ))}
          </section>
        ) : (
          <h3>No Mails Found</h3>
        )}
        {selectedMail && <MailBox mail={selectedMail} />}
      </article>
    </main>
  );
};

export default App;
