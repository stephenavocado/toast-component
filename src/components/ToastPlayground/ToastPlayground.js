import React from 'react';
import ToastShelf from "../ToastShelf";
import Button from '../Button';
import { ToastContext } from '../ToastProvider/ToastProvider';
import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const { message, setMessage, variant, setVariant, createToast, deleteToasts } = React.useContext(ToastContext);

  React.useEffect(() => {
    function clearToasts(event) {
      if(event.code === 'Escape') {
        deleteToasts();
      };
    };

    window.addEventListener('keydown', clearToasts);

    return () => {
      window.removeEventListener('keydown', clearToasts);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea 
              id="message" 
              className={styles.messageInput} 
              value={message} 
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {
              VARIANT_OPTIONS.map((option, index) => {
                return (
                  <label htmlFor={`variant-${option}`} key={index}>
                    <input
                      id={`variant-${option}`}
                      type="radio"
                      name="variant"
                      value={option}
                      checked={variant === option}
                      onChange={(event) => setVariant(event.target.value)}
                      onKeyDown={(event) => event.code === "Enter" && setVariant(option)}
                    />
                    {option}
                  </label>
                )
              })
            }
            {/* TODO Other Variant radio buttons here */}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <form onSubmit={(event) => createToast(event)}
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
