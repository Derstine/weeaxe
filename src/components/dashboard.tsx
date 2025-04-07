import { useEffect } from "react"
import SkinsPage from "./skins"
import SkinSearch from "./skins/search"

export default function Dashboard({username} : {username: string}) {
    return (
        <div className="flex flex-col w-screen h-screen p-10 gap-10">
            <p className="text-5xl">Welcome, <span className="text-blue-500 font-semibold">{username}!</span></p>
            <div className="flex flex-row justify-around grow w-full">
                <div className="w-1/4 p-3 border-2 rounded-2xl">
                    <SkinsPage />
                </div>
                <div className="w-1/4 p-3 border-2 rounded-2xl">
                    <p>My Skins</p>
                </div>
                <div className="w-1/4 p-3 border-2 rounded-2xl">
                    <SkinSearch />
                </div>

            </div>
        </div>
    )
}