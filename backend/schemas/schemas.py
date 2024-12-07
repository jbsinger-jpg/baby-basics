from typing import Literal

from pydantic import BaseModel


class Bath(BaseModel):
    affiliateLink: str
    brand: str
    description: str
    id: int
    image: str
    price: float
    title: str
    type: str


class CarSeat(BaseModel):
    affiliateLink: str
    brand: str
    description: str
    id: int
    image: str
    price: float
    title: str
    type: str


class Clothing(BaseModel):
    affiliateLink: str
    brand: str
    description: str
    gender: Literal["boy", "girl"]
    id: int
    image: str
    price: float
    price_range: str
    query_sizes: list[str]
    title: str
    type: str
