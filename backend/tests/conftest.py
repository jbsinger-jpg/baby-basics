import pytest
from schemas import Bath


@pytest.fixture
def bath_results() -> list[Bath]:
    bath1 = Bath(**{
        "affiliateLink": "https://amzn.to/3EUdWFJ",
        "brand": "PandaEar",
        "description": "(LxWxH) 11.02 x 9.09 x 3.35 inches",
        "id": "4OC3hVnl6AbQ4OCDjgvJ",
        "image": "https://m.media-amazon.com/images/I/61FnDoNPWzL._SL1500_.jpg",
        "price": 18.95,
        "title": "Inflatable Bathtub",
        "type": "bath"
    })

    bath2 = Bath(**{
        "affiliateLink": "https://amzn.to/3Zz7xZV",
        "brand": "Stokke",
        "description": "(LxWxH) 26 x 13.7 x 9.4 inches",
        "id": "7qrGMPhD2ITBJvs5w1TX",
        "image": "https://m.media-amazon.com/images/I/61P467aXuiL._SL1500_.jpg",
        "price": 36.75,
        "title": "Foldable Baby Bathtub",
        "type": "bath"
    })

    return [bath1, bath2]
