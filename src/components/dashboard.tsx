import { useEffect } from "react"
import SkinsPage from "./skins/upload"
import SkinSearch from "./skins/search"
import SkinList from "./skins/list"

export default function Dashboard({username} : {username: string}) {
    return (
        <div className="flex flex-col w-screen h-screen p-10 gap-10">
            <p className="text-5xl">Welcome, <span className="text-blue-500 font-semibold">{username}!</span></p>
            <div className="flex flex-row justify-around grow w-full">
                <div className="w-1/4 p-8 border-2 rounded-2xl">
                    <SkinsPage />
                </div>
                <div className="w-1/4 p-8 border-2 rounded-2xl">
                    <SkinList />
                </div>
                <div className="w-1/4 p-8 border-2 rounded-2xl">
                    <SkinSearch />
                </div>

            </div>
        </div>
    )
}