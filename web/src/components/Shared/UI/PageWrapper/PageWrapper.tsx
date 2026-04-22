import styles from './PageWrapper.module.scss';

interface PageWrapperProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const PageWrapper = ({ children, style }: PageWrapperProps) => {
  return (
    <div className={styles.pageWrapper} style={style}>
      {children}
    </div>
  )
}
export default PageWrapper;