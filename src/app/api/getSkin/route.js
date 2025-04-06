// app/api/getSkin/route.js

import fetch from 'node-fetch';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ error: 'Username is required' }), { status: 400 });
  }

  try {
    // Step 1: Get UUID from Mojang
    const profileRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    if (!profileRes.ok) {
      return new Response(JSON.stringify({ error: `Mojang profile not found for ${username}` }), { status: 404 });
    }

    const profile = await profileRes.json();
    const uuid = profile.id;

    // Step 2: Generate signed skin via Mineskin
    const mineskinRes = await fetch('https://api.mineskin.org/generate/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid }),
    });

    if (!mineskinRes.ok) {
      const err = await mineskinRes.text();
      return new Response(JSON.stringify({ error: `Mineskin API error: ${err}` }), { status: 500 });
    }

    const data = await mineskinRes.json();
    const texture = data.data.texture;

    return new Response(
      JSON.stringify({
        skinTexture: texture.value, // Send base64 texture
        skinSignature: texture.signature, // Send base64 signature
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: `Error fetching skin data: ${error.message}` }), { status: 500 });
  }
}
