import { LoaderCircle as LoaderIcon } from 'lucide-react';
import { PulseLoader } from 'react-spinners';
import styles from './Styles.module.css';

const LoadingSpinner = function () {
  return (
    <span className={styles.loader_circle}>
      <LoaderIcon />
    </span>
  );
};

export { LoadingSpinner, PulseLoader };
