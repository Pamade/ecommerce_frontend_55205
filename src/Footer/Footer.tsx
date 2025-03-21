import styles from "./Footer.module.scss";

const Footer = () => {

    return (
        <footer className={styles.footer}>
            <section className={styles.container}>
                <p>SHOP.CO</p>
                <p>Created By Patryk Mikołajczak</p>
            </section>
            
        </footer>
    )
}

export default Footer;