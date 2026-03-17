import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
