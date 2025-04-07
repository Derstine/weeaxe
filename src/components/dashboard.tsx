import { useEffect } from "react"
import SkinsPage from "./skins"
import SkinSearch from "./skins/search"

export default function Dashboard({username} : {username: string}) {
    return (
        <div>
            <p>Welcome {username}!</p>
            <SkinsPage />
            <SkinSearch />
        </div>
    )
}