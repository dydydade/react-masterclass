import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 15px;
    transition: background-color 0.2s ease-in-out;
    display: flex;
    align-items: center;
    &:hover {
        background-color: ${(props) => props.theme.accentColor};
    }
`;

const Loading = styled.h1`
    font-size: 16px;
    display: flex;
    justify-content:center;
    align-items: center;
`

const Title = styled.h1`
    color:${(props) => props.theme.accentColor};
    font-size: 48px;
`;

const CoinSymbol = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 15px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    // const [loading, setLoading] = useState(true);
    // const [coins, setCoins] = useState<ICoin[]>([]);
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);
    return <Container>
        <Header>
            <Title>코인</Title>
        </Header>
        {isLoading ? <Loading>Now Loading...</Loading> :
            <CoinsList>
                {data?.slice(0, 100).map((coin) =>
                    <Link to={`/${coin.id}`} state={coin}>
                        <Coin key={`${coin.id}`}>
                            <CoinSymbol src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}></CoinSymbol>
                            {coin.name} &rarr;
                        </Coin>
                    </Link>)}
                <Coin></Coin>
            </CoinsList>
        }
    </Container >
}

export default Coins;