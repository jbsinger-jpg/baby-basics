from pathlib import Path

import tomllib

from config.config import *  # noqa: F403

config_path = Path("config", "config.toml")

if config_path.exists():
    toml = tomllib.load(config_path.open("rb"))
