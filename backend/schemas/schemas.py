from pydantic import BaseModel

class Bath(BaseModel):
    affiliateLink: str
    brand: str
    description: str
    id: str
    image: str
    price: float
    title: str
    type: str