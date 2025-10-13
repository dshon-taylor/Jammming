export async function savePlaylistToSpotify(playlist, playlistName) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    alert('Please log in with Spotify!');
    return;
  }

  // 1. Get user ID
  const userRes = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const userData = await userRes.json();
  const userId = userData.id;

  // 2. Create playlist
  const createRes = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: playlistName || "MY PLAYYYLIST",
      description: "Created with Jammming!",
      public: true
    })
  });
  const playlistData = await createRes.json();
  const playlistId = playlistData.id;

  // 3. Add tracks
  // Build URIs. Prefer an existing `uri` field when available. Filter out invalid entries.
  const trackUris = (playlist || [])
    .map(song => (song && (song.uri || (song.id ? `spotify:track:${song.id}` : null))))
    .filter(Boolean);

  if (trackUris.length === 0) {
    alert('No valid tracks to add to the Spotify playlist.');
    return;
  }

  // Spotify limits adding to 100 tracks per request. Batch if necessary.
  const batchSize = 100;
  for (let i = 0; i < trackUris.length; i += batchSize) {
    const batch = trackUris.slice(i, i + batchSize);
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris: batch })
    });

    if (!res.ok) {
      // Try to give a useful error message
      let text = '';
      try { text = await res.text(); } catch (e) { /* ignore */ }
      console.error('Failed to add tracks to Spotify playlist:', res.status, text);
      throw new Error(`Failed to add tracks to Spotify playlist: ${res.status}`);
    }
  }

  alert('Playlist created on your Spotify!');

}