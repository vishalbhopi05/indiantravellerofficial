import { useRouter } from 'next/router';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';

export default function Layout({ children }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={styles.main}>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
