export async function uploadSkinRequest(user: string, skin: string, token: string, captionText: string, captionColor: string, value: string, signature: string) {
    const url = `https://api.weeaxe.cn:15102/skin/v3/data/${user}/${skin}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caption: {
          text: captionText,
          color: captionColor,
        },
        data: {
          value: value,
          signature: signature,
        },
      }),
    });
  
	const data = await response.json();
    return {success: response.ok, data: data};
  }
  