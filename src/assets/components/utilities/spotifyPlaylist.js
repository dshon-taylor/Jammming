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
  const trackUris = playlist.map(song => `spotify:track:${song.id}`);
  await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uris: trackUris })
  });

  alert('Playlist created on your Spotify!');

}