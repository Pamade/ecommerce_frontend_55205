import styles from "./Navigation.module.scss";
import {Link} from "react-router";

const navigationItems = [{label:"Shop", to:"/shop"}, {label:"On Sale", to:"/sale"}, {label:"New Aarrivals", to:"new"}
    ,{label:"Brands", to:"/brands"}
]

const Navigation = () => {

    return (
        <nav className={styles.navigation}>
            <ul className={styles.wrapper}>
                {navigationItems.map((item) => <li><Link to={item.to}>{item.label}</Link></li>)}
            </ul>
        </nav>
    )
}

export default Navigation;