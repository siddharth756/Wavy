import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


@lru_cache
def get_settings():
    allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
    return {
        "port": int(os.getenv("PORT", "8000")),
        "cloudinary_cloud_name": os.getenv("CLOUDINARY_CLOUD_NAME", ""),
        "cloudinary_api_key": os.getenv("CLOUDINARY_API_KEY", ""),
        "cloudinary_api_secret": os.getenv("CLOUDINARY_API_SECRET", ""),
        "cloudinary_audio_folder": os.getenv("CLOUDINARY_AUDIO_FOLDER", "wavy/audio"),
        "cloudinary_image_folder": os.getenv("CLOUDINARY_IMAGE_FOLDER", "wavy/trackImages"),
        "api_key": os.getenv("API_KEY", ""),
        "allowed_origins": [origin.strip() for origin in allowed_origins.split(",") if origin.strip()],
    }
