import React, { useEffect, useRef } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  visible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, visible }) => (
  <div
    className={`${styles.toast} ${visible ? styles.show : ''}`}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    {message}
  </div>
);

export default Toast;
