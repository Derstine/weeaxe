import { createAccessToken, getSessionToken } from "@/functions/authenticationAPI";
import { listUserSkins } from "@/functions/skinAPI";
import { useEffect, useState } from "react"

export default function SkinList() {
    const [index, setIndex] = useState(0);
    const [skinsCount, setSkinsCount] = useState(0);
    const [error, setError] = useState("");
    type Skin = {
        data: {
            value: string;
            signature: string;
        };
    };
    const [skins, setSkins] = useState<Skin[]>([]);
    const [skinImage, setSkinImage] = useState("");

    useEffect(() => {
		async function fetchData() {
			console.log("loading list");
			await getList();
		}
		fetchData();
    }, [])

    // when index changes
    useEffect(() => {
        if (skinsCount > 0 && index >= 0 && index < skinsCount && skins.length > index) {
            try {
                const texture = JSON.parse(atob(skins[index].data.value));
                setSkinImage(texture.textures.SKIN.url);
            } catch (err) {
                setError("Failed to parse skin image");
                console.error(err);
            }
        }
    }, [index, skins, skinsCount]);
    

    async function getList() {
        console.log("searching");
        const session = await getSessionToken();
        const sessionToken = session.token;
        const sessionUser = session.owner.name;

        const createAccessTokenResponse = await createAccessToken(sessionToken, "skin");
        if (!createAccessTokenResponse.success) {
            setError("Trouble creating access token");
            return;
        }

        const accessToken = createAccessTokenResponse.data.token;

        const listUserSkinsResponseCount = await listUserSkins(accessToken, sessionUser, true);
        // sets the number of skins the user has
        setSkinsCount(listUserSkinsResponseCount.data.count);
        console.log(listUserSkinsResponseCount.data);
        // const skinTextureJSON = JSON.parse(atob(getSkinDetailsResponse.data.data.value));
        // setSkinImage(skinTextureJSON.textures.SKIN.url);

        const listUserSkinsResponseList = await listUserSkins(accessToken, sessionUser, false);
        console.log(listUserSkinsResponseList.data);
        setSkins(listUserSkinsResponseList.data.skins);
    }

    return (
        <div>
            <h2 className="text-3xl text-blue-500 font-semibold">My Skins</h2>
            <img src={skinImage} alt="Skin" />
            <div className="flex flex-row justify-between">
                <button>1</button>
                <button>{`<`}</button>
                <input type="number" value={index} onChange={(e) => setIndex(e.target.valueAsNumber)} className="border px-2 py-1 rounded" />
                <button>{`>`}</button>
                <button>{skinsCount}</button>
            </div>

        </div>
    )
}