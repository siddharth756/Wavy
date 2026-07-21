# Wavy Music Downloader

Separate Python service that downloads audio from **any music URL** using **yt-dlp** + **ffmpeg**, then uploads the audio and cover image to **Cloudinary**.

Deploy this on **Render** (Docker). Keep your existing MERN backend on Vercel.

## Supported Platforms

YouTube, YouTube Music, Spotify, Gaana, SoundCloud, JioSaavn, Instagram, and [1000+ more](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md).

**No API keys required.** Just paste any music link.

## Features

- `POST /api/download` — Any music URL → Cloudinary audio + image URLs
- `GET /health` — health check for Render
- Optional `API_KEY` protection via `x-api-key` header
- CORS support for your frontend origins

## API

### Download track

```http
POST /api/download
Content-Type: application/json
x-api-key: your_optional_api_key

{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

### Success response

```json
{
  "status": "success",
  "title": "Song Title",
  "artist": "Artist Name",
  "trackImage": "https://res.cloudinary.com/.../image.jpg",
  "audio": "https://res.cloudinary.com/.../audio.mp3"
}
```

Use those fields with your existing `POST /api/tracks` endpoint.

## Local setup

1. Install [Python 3.10+](https://www.python.org/) and [ffmpeg](https://ffmpeg.org/) (must be on PATH).
2. Copy env file:

```bash
cp .env.example .env
```

3. Fill Cloudinary values in `.env`.
4. Install and run:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Render deploy

1. Push this repo to GitHub
2. In Render → **New → Web Service**
3. Connect the repo
4. Set:
   - **Root Directory**: `wavy-music`
   - **Environment**: Docker
5. Add environment variables from `.env.example`
6. Deploy

Or use Blueprint:

```bash
# From repo root, Render can pick up wavy-music/render.yaml
```

Set `ALLOWED_ORIGINS` to your frontend URLs, for example:

```text
http://localhost:5173,https://wavymusic.vercel.app
```

## Frontend usage

The `AddTrack` page has a **Paste Link** mode. Paste any music URL, click Fetch, then add to an album.

Internally it calls:

```js
const res = await axios.post(
  `${import.meta.env.VITE_MUSIC_API_URL}/api/download`,
  { url: musicUrl },
  { headers: { "x-api-key": import.meta.env.VITE_MUSIC_API_KEY } }
);

// then create track with res.data.title, artist, trackImage, audio
```

## Notes

- Downloads can take 20–90 seconds depending on the source.
- This is for personal/learning use. Respect copyright and platform terms.
