import React, { useState, useEffect } from "react"
import styles from "./Card.module.scss"
import { useDrag } from "react-use-gesture"
import { useSpring, a } from "react-spring"
import { FiHeart } from "react-icons/fi"

interface props {
    picture: string
}

const Card: React.FC<props> = ({ picture }) => {
    const [{ x, y, visibility }, set] = useSpring(() => ({
        x: 0,
        y: 0,
        visibility: "visible",
    }))

    const [{ opacity, display }, setLike] = useSpring(() => ({
        opacity: 0,
        display: "none",
    }))
    const [isLike, setIsLike] = useState(false)

    useEffect(() => {
        if (isLike) {
            const handleAnimation = async () => {
                await setLike({ display: "flex", opacity: 0, immediate: true })
                setLike({ opacity: 1 })
            }

            handleAnimation()
        } else {
            const handleAnimation = async () => {
                await setLike({ opacity: 0 })
                setLike({ opacity: 0, display: "none", immediate: true })
            }

            handleAnimation()
        }
    }, [isLike, setLike])

    const bind = useDrag(({ down, movement: [mx] }) => {
        const coefDiv = 10000

        const absMx = Math.abs(mx)

        const active = down && mx > 50
        if (down && mx > 150 && !isLike) {
            setIsLike(true)
        } else if (down && mx < 150 && isLike) {
            setIsLike(false)
        } else if (isLike && !down) {
            const endAnimation = async () => {
                const endLife = 1000
                await set({ x: endLife, y: (endLife * endLife) / coefDiv })
                await set({
                    x: endLife,
                    y: (endLife * endLife) / coefDiv,
                    visibility: "hidden",
                    immediate: true,
                })
                setIsLike(false)
                await set({
                    x: -endLife,
                    y: (endLife * endLife) / coefDiv,
                    visibility: "hidden",
                    immediate: true,
                })
                await set({
                    x: -endLife,
                    y: (endLife * endLife) / coefDiv,
                    visibility: "visible",
                    immediate: true,
                })
                await set({ x: 0, y: 0, visibility: "visible" })
            }

            endAnimation()
            return
        }

        set({
            x: active ? (isLike ? mx + 50 : mx) : 0,
            y: active ? (absMx * absMx) / coefDiv : 0,
        })
    })

    return (
        <a.div
            className={styles.card}
            {...bind()}
            style={{ x, y, visibility: visibility as any }}
        >
            <div className={styles.account}>
                <div className={styles.userLogo}>
                    <img
                        src="https://instagram.fcdg2-1.fna.fbcdn.net/v/t51.2885-19/s320x320/21689969_1933587840236373_2203795230505828352_n.jpg?_nc_ht=instagram.fcdg2-1.fna.fbcdn.net&_nc_ohc=hFXIzee8uUQAX8icmVk&oh=b5d3105dfd834cb5bb8cbb8253d7c255&oe=5F604FD2"
                        alt="user profile"
                    />
                </div>
                <div className={styles.userContent}>
                    <div className={styles.userLogin}>Tâm-Tanguy</div>
                    <div className={styles.userLocation}>Paris</div>
                </div>
            </div>
            <div className={styles.content}>
                {/* <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg"
                    alt="everest"
                /> */}
                <img src={picture} alt="posted element" />
                <a.div
                    className={styles.like}
                    style={{ opacity: opacity as any, display: display as any }}
                >
                    <FiHeart />
                </a.div>
            </div>
        </a.div>
    )
}

export default Card
