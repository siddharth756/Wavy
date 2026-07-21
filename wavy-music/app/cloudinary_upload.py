import cloudinary
import cloudinary.uploader

from app.config import get_settings


def configure_cloudinary():
    settings = get_settings()
    cloudinary.config(
        cloud_name=settings["cloudinary_cloud_name"],
        api_key=settings["cloudinary_api_key"],
        api_secret=settings["cloudinary_api_secret"],
        secure=True,
    )


def upload_audio(file_path: str) -> str:
    configure_cloudinary()
    settings = get_settings()

    result = cloudinary.uploader.upload(
        file_path,
        resource_type="video",
        folder=settings["cloudinary_audio_folder"],
    )
    return result["secure_url"]


def upload_image(image_source: str) -> str:
    configure_cloudinary()
    settings = get_settings()

    result = cloudinary.uploader.upload(
        image_source,
        resource_type="image",
        folder=settings["cloudinary_image_folder"],
    )
    return result["secure_url"]
