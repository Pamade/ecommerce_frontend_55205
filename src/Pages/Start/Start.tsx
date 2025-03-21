import styles from "./Start.module.scss"
import guys from "../../assets/guys.png"
import logo1 from "../../assets/partners/logo1.png"
import logo2 from "../../assets/partners/logo2.png"
import logo3 from "../../assets/partners/logo3.png"
import logo4 from "../../assets/partners/logo4.png"
import logo5 from "../../assets/partners/logo5.png"
import DisplayClothes from "./DisplayClothes/DisplayClothes"
import BrowseByDressStyle from "./BrowseByDressStyle/BrowseByDressStyle"
import axios from "axios"
import { token, API_SERVER } from "../../main"
import OutHappyCustomers from "./OurHappyCustomers/OurHappyCustomers"

const Start = () => {
    const partners = [logo1, logo2, logo3, logo4, logo5]
    const about = [{title:"200+", label:"International Brands"}, {title:"2,000+", label:"High Quality Products"}, {title:"30,000+", label:"Happy customers"}]
                const fetch = async () => {
                    const r = await axios.post(`${API_SERVER}/reviews/add`, {productId:64, email:"insune15@gmail.com", reviewText:"XD", rating:5}, {
                        headers:{"Authorization": "Bearer " + token}
                    })
                    console.log(r)
                }
                // fetch()
    return (
    <>
        <button onClick={() => fetch()}>ADD review</button>
        <section className={styles.main_background}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <h2 className={styles.heading}>FIND CLOTHES THAT MATCH YOUR STYLE</h2>
                    <p className={styles.description}>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                    <button className={styles.button}>Shop now</button>
                    <div className={styles.about}>
                        {about.map((item) => (
                            <div className={styles.single_about}>
                                <h6 className={styles.about_title}>{item.title}</h6>
                                <p className={styles.about_label}>{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.people}>
                <img className={styles.guys} src={guys} alt="guys" />
            </div>
        </section>
        <section className={styles.partners}>
                {partners.map((partner) => <img className={styles.partners_logo} src={partner} alt="partner"/>)}
        </section>
        <div className={styles.info}>
            <DisplayClothes heading={"NEW ARRIVALS"}/>
            <BrowseByDressStyle />
            <OutHappyCustomers />
        </div>
    </>
        
    )
}
export default Start;