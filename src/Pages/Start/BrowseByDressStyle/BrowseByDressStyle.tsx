import styles from "./BrowseByDressStyle.module.scss"
import guy1 from "../../../assets/browse_by_dress_style/guy1.png"
import guy2 from "../../../assets/browse_by_dress_style/guy2.png"
import guy3 from "../../../assets/browse_by_dress_style/guy3.png"
import guy4 from "../../../assets/browse_by_dress_style/guy4.png"
import { Link } from "react-router"
import Heading from "../../../Components/Heading"


const persons = [{text:"Casual", img:guy1}, {text:"Formal", img:guy2}, {text:"Party", img:guy3}, {text:"Gym", img:guy4}] as const;

const BrowseByDressStyle = () => {
    return (
        <section className={styles.wrapper}>
            <Heading text="BROWSE BY DRESS STYLE"/>
            <div className={styles.persons_wrapper}>
                {persons.map((person) => (
                    <Link to="xd" className={styles.person_single}>
                        <div className={styles.background_person} style={{backgroundImage:`url(${person.img})`}}>
                            <h6 className={styles.type}>{person.text}</h6>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
    )
}

export default BrowseByDressStyle;