import React from "react"
import styles from "./Header.module.scss"
import { FiAperture } from "react-icons/fi"

export default () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <FiAperture />
            </div>
            <div className={styles.name}>Instagram</div>
        </header>
    )
}
