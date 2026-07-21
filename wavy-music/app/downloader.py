import os
import shutil
import tempfile
from pathlib import Path

import yt_dlp

from app.cloudinary_upload import upload_audio, upload_image


class DownloadError(Exception):
    pass


def _build_yt_dlp_options(output_dir: Path) -> dict:
    """Build yt-dlp options for extracting best audio as mp3."""
    opts = {
        "format": "bestaudio/best",
        "outtmpl": str(output_dir / "%(title)s.%(ext)s"),
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ],
        "writethumbnail": True,
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        "extractor_args": {"youtube": {"player_client": ["android", "web"]}},
    }
    cookies_path = Path("app/cookies.txt")
    if cookies_path.exists():
        opts["cookiefile"] = str(cookies_path)
    proxy = os.environ.get("YT_PROXY", "")
    if proxy:
        opts["proxy"] = proxy
    return opts


def _extract_metadata(url: str) -> dict:
    """Extract metadata (title, artist, thumbnail) without downloading."""
    opts = {
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        "skip_download": True,
        "extractor_args": {"youtube": {"player_client": ["android", "web"]}},
    }
    cookies_path = Path("app/cookies.txt")
    if cookies_path.exists():
        opts["cookiefile"] = str(cookies_path)

    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(url, download=False)
    except yt_dlp.utils.DownloadError as exc:
        raise DownloadError(f"Extract failed: {exc}") from exc

    if info is None:
        raise DownloadError("No metadata found for this URL.")

    title = info.get("title") or info.get("track") or "Unknown Title"
    artist = (
        info.get("artist")
        or info.get("creator")
        or info.get("uploader")
        or "Unknown Artist"
    )
    thumbnail = info.get("thumbnail") or ""

    return {"title": title, "artist": artist, "thumbnail": thumbnail}


def _find_audio_file(output_dir: Path) -> Path:
    """Find the downloaded mp3 file in the output directory."""
    mp3_files = list(output_dir.glob("*.mp3"))
    if mp3_files:
        return mp3_files[0]

    # Fallback: check for any audio file
    for ext in ("*.m4a", "*.opus", "*.ogg", "*.webm", "*.wav"):
        files = list(output_dir.glob(ext))
        if files:
            return files[0]

    raise DownloadError("Download completed but no audio file was found.")


def download_track(url: str) -> dict:
    """
    Download audio from any supported URL using yt-dlp.

    Supports YouTube, YouTube Music, Spotify, Gaana, SoundCloud,
    JioSaavn, Instagram, and 1000+ other sites.

    Returns dict with: status, title, artist, trackImage, audio
    """
    url = url.strip()
    if not url:
        raise DownloadError("URL cannot be empty.")

    temp_dir = Path(tempfile.mkdtemp(prefix="wavy-music-"))

    try:
        # Step 1: Extract metadata
        metadata = _extract_metadata(url)

        # Step 2: Download audio
        opts = _build_yt_dlp_options(temp_dir)
        try:
            with yt_dlp.YoutubeDL(opts) as ydl:
                ydl.download([url])
        except yt_dlp.utils.DownloadError as exc:
            raise DownloadError(f"Failed to download audio: {exc}") from exc

        # Step 3: Find the downloaded audio file
        audio_path = _find_audio_file(temp_dir)

        # Step 4: Upload audio to Cloudinary
        audio_url = upload_audio(str(audio_path))

        # Step 5: Upload thumbnail to Cloudinary (if available)
        track_image_url = ""
        if metadata["thumbnail"]:
            try:
                track_image_url = upload_image(metadata["thumbnail"])
            except Exception:
                # Non-critical — track can exist without an image
                track_image_url = ""

        return {
            "status": "success",
            "title": metadata["title"],
            "artist": metadata["artist"],
            "trackImage": track_image_url,
            "audio": audio_url,
        }

    except DownloadError:
        raise
    except Exception as exc:
        raise DownloadError(f"Download failed: {exc}") from exc
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
