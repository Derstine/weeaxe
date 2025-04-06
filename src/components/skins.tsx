"use client";

import { createAccessToken, getSessionToken } from "@/functions/authenticationAPI";
import { uploadSkinRequest } from "@/functions/skinAPI";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "./ui/input";

export default function SkinsPage() {
    const [username, setUsername] = useState("");
    const [skinSignature, setSkinSignature] = useState("");
    const [skinTexture, setSkinTexture] = useState("");
    const [skinImage, setSkinImage] = useState("");
    const [error, setError] = useState("");

	const [skinID, setSkinID] = useState("");
	const [captionText, setCaptionText] = useState("");
	const [captionColor, setCaptionColor] = useState("");

    async function searchSkin(username: string) {
        try {
            const response = await fetch(`/api/getSkin?username=${username}`);
            const skinData = await response.json();
            console.log(skinData);

            if (response.ok) {
                setSkinSignature(skinData.skinSignature);
                setSkinTexture(skinData.skinTexture);

                const skinTextureJSON = JSON.parse(atob(skinData.skinTexture));
                setSkinImage(skinTextureJSON.textures.SKIN.url);

                setError("");
            } else {
                setError(skinData.error || "An error occurred");
                setSkinSignature("");
                setSkinTexture("");
                setSkinImage("");
            }
        } catch (error) {
            setError("Failed to fetch skin data");
            setSkinSignature("");
            setSkinTexture("");
            setSkinImage("");
        }
    }

    async function uploadSkin() {
        console.log("Uploading skin...");
        const session = await getSessionToken();
		const sessionToken = session.token;
		const sessionUser = session.owner.name;

        const createAccessTokenResponse = await createAccessToken(sessionToken, "skin");
        if (!createAccessTokenResponse.success) {
            setError("Trouble creating access token");
            return;
        }

        const accessToken = createAccessTokenResponse.data.token;

        console.log("Texture: " + skinTexture);
        console.log("Signature: " + skinSignature);

        const uploadSkinResponse = await uploadSkinRequest(
            sessionUser,
            skinID,
            accessToken,
            captionText,
            captionColor,
            skinTexture,
            skinSignature
        );

        if (uploadSkinResponse.success) {
            console.log("Successfully uploaded!");
        } else {
            setError("Error uploading skin - " + uploadSkinResponse.data.message);
        }

        console.log(uploadSkinResponse.data);
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={() => searchSkin(username)}>Search</button>

            {error && <p>{error}</p>}

            {skinImage && (
                <>
                    <img src={skinImage} alt="Minecraft Skin" />
					<Label className="text-lg" htmlFor="skinID">Skin ID</Label>
					<Input className="border-gray-400 mt-1" id="skinID" type="text" value={skinID} onChange={(e) => setSkinID(e.target.value)} placeholder="Skin ID" disabled={!skinImage} required />
					<Label className="text-lg" htmlFor="captionText">Caption Text</Label>
					<Input className="border-gray-400 mt-1" id="captionText" type="text" value={captionText} onChange={(e) => setCaptionText(e.target.value)} placeholder="Caption" disabled={!skinImage} required />
					<Label className="text-lg" htmlFor="captionColor">Caption Color</Label>
					<Input className="border-gray-400 mt-1" id="captionColor" type="text" value={captionColor} onChange={(e) => setCaptionColor(e.target.value)} placeholder="Color" disabled={!skinImage} required />
                    <button onClick={() => uploadSkin()}>Upload</button>
                </>
            )}
        </div>
    );
}
