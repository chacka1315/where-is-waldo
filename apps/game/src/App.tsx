import styles from './styles/App.module.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className={styles.page_layout}>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
