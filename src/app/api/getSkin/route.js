// /app/api/getSkin/route.js
export async function GET(req) { //chatgpt generated
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
        return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });
    }

    try {
        // Step 1: Get player UUID from Mojang API
        const profileRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const profileData = await profileRes.json();
        if (!profileData.id) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // Step 2: Get player skin and signature using UUID
        const skinRes = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${profileData.id}`);
        const skinData = await skinRes.json();

        // Send the skin texture and signature to the client
        const texturesProperty = skinData.properties.find(p => p.name === "textures");
        if (texturesProperty) {
            return new Response(
                JSON.stringify({
                    skinTexture: texturesProperty.value,
                    skinSignature: texturesProperty.signature,
                }),
                { status: 200 }
            );
        }

        return new Response(JSON.stringify({ error: "Skin data not found" }), { status: 404 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch skin data" }), { status: 500 });
    }
}
