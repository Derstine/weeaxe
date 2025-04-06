"use client";

import { createAccessToken, getSessionToken } from "@/functions/authenticationAPI";
import { uploadSkinRequest } from "@/functions/skinAPI";
import { useState } from "react";

export default function SkinsPage() {
    const [username, setUsername] = useState("");
    const [skinSignature, setSkinSignature] = useState("");
    const [skinTexture, setSkinTexture] = useState("");
    const [skinImage, setSkinImage] = useState("");
    const [error, setError] = useState("");

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
        const sessionToken = await getSessionToken();

        const createAccessTokenResponse = await createAccessToken(sessionToken, "skin");
        if (!createAccessTokenResponse.success) {
            setError("Trouble creating access token");
            return;
        }

        const accessToken = createAccessTokenResponse.data.token;

        console.log("Texture: " + skinTexture);
        console.log("Signature: " + skinSignature);

        const uploadSkinResponse = await uploadSkinRequest(
            "dog_euthanizer",
            "technoblade",
            accessToken,
            "Technoblade",
            "blue",
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
                    <button onClick={() => uploadSkin()}>Upload</button>
                </>
            )}
        </div>
    );
}
