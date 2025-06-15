const BASE_URL = `https://api.coinpaprika.com/v1`

export async function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string) {
    return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinPrice(coinId: string) {
    return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}