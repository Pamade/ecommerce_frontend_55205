import Header from "../Header/Header";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import Footer from "../Footer/Footer";

const MainLayout = () => {
    // Use the useLocation hook to get the czzurrent pathname
    const location = useLocation();
  
    return (
      <>
        <Header />
        <div className={styles.wrapper}>
          <main className={styles.wrapper_main}>
            <Outlet /> 
          </main>
        </div>
        <Footer />
      </>
    );
  };
  
  export default MainLayout;