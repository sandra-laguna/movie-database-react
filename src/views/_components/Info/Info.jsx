import styles from './Info.module.scss';

export const Info = ({ text }) => {
  return <p className={styles.blackText}>{text}</p>;
};
