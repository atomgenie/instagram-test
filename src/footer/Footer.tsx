import React from "react"
import styles from "./Footer.module.scss"
import { FiHome, FiSearch, FiPlusSquare, FiHeart, FiUser } from "react-icons/fi"

export default () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.icons}>
                <FiHome />
                <FiSearch />
                <FiPlusSquare />
                <FiHeart />
                <FiUser />
            </div>
        </footer>
    )
}
