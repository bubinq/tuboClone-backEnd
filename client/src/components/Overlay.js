import { useContext } from "react"
import { NavigationContext } from "../contexts/navigationContext"

export const Overlay = () => {
    const {sideMenuToggle} = useContext(NavigationContext)
    return (
        <div className="overlay" onClick={sideMenuToggle}>

        </div>
    )
}