import styles from "./DisplayClothes.module.scss"

interface Props{
    heading:String,
    products?:any
}


const DisplayClothes = ({heading}:Props) => {


    return (
        <section className={styles.wrapper}>
            <h3 className={styles.heading}>{heading}</h3>
        </section>
    )

}

export default DisplayClothes;