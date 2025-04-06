import { useEffect } from "react"
import SkinsPage from "./skins"

export default function Dashboard({username} : {username: string}) {
    return (
        <div>
            <p>Welcome {username}!</p>
            <SkinsPage />
        </div>
    )
}