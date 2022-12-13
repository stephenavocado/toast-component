import React from 'react';
import { ToastContext } from '../ToastProvider/ToastProvider';
import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts, clearToast } = React.useContext(ToastContext);
  
  return (
    <ol className={styles.wrapper}>
      {
        toasts.map(({ variant, message, id }) => {
          return (
            <li className={styles.toastWrapper} key={id}>
              <Toast variant={variant} clearToast={() => clearToast(id)}>{message}</Toast>
            </li>
          )
        })
      }
    </ol>
  );
}

export default ToastShelf;
