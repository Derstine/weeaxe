"use client"

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

            if (response.ok) {
                // base64 shit
                setSkinSignature(skinData.skinSignature);
                setSkinTexture(skinData.skinTexture);

                // getting url of image
                const skinTextureJSON = JSON.parse(atob(skinData.skinTexture));
                setSkinImage(skinTextureJSON.textures.SKIN.url)

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
                    <img 
                        src={skinImage}
                        alt="Minecraft Skin" 
                    />
                    <button onClick={() => {}}>Upload</button>
                </>
            )}
        </div>
    );
}
