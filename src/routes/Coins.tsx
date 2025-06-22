import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { isDarkAtom } from "../atoms";
import { useSetRecoilState } from "recoil";


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
    background-color: ${(props) => props.theme.bgColor};;
    color: ${(props) => props.theme.textColor};
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid ${(props) => props.theme.textColor};
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
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    return <Container>
        <Helmet>
            <title>
                코인
            </title>
        </Helmet>
        <Header>
            <Title>코인</Title>
            <button onClick={() => toggleDarkAtom()}>Toggle Mode</button>
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