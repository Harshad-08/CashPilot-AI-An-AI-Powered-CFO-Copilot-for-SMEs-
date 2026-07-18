import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENV: str = "development"
    DEBUG: bool = True
    DATABASE_URL: str = "sqlite:///./cashpilot.db"
    JWT_SECRET: str = "your-super-secret-jwt-key-change-this-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
