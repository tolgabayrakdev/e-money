from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "e-money"

    model_config = SettingsConfigDict(env_file=".env")
