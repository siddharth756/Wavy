from fastapi import Depends, FastAPI, Header, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from pydantic import BaseModel, HttpUrl

from app.config import get_settings
from app.downloader import DownloadError, download_track

app = FastAPI(title="Wavy Music Downloader", version="2.0.0")


def get_allowed_origins():
    return get_settings()["allowed_origins"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class DownloadRequest(BaseModel):
    url: HttpUrl


def verify_api_key(x_api_key: str | None = Header(default=None)):
    settings = get_settings()
    expected_key = settings["api_key"]

    if expected_key and x_api_key != expected_key:
        raise HTTPException(status_code=401, detail="Invalid API key.")


@app.get("/")
def root():
    return {
        "service": "wavy-music",
        "version": "2.0.0",
        "status": "running",
        "description": "Paste any music link (YouTube, Gaana, Spotify, SoundCloud, etc.) to download.",
        "endpoints": {
            "health": "/health",
            "download": "POST /api/download",
        },
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/download", dependencies=[Depends(verify_api_key)])
def download(payload: DownloadRequest):
    try:
        return download_track(str(payload.url))
    except DownloadError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
