import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
  &:hover {
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
  }
`;

interface RouteState {
    name: string;
}


interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}


function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    const location = useLocation();
    const state = location.state as RouteState;
    const [info, setInfo] = useState<IInfoData>();
    const [price, setPrice] = useState<IPriceData>();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPrice(priceData);
            setLoading(false);
        })();
    }, [coinId]);

    return <Container>
        <Header>
            <Title>
                {state?.name ? state.name : loading ? "Loading..." : info?.name}
            </Title>
        </Header>
        {loading ? (
            <Loading>Loading...</Loading>
        ) : (
            <>
                <Overview>
                    <OverviewItem>
                        <span>Rank:</span>
                        <span>{info?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>${info?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Open Source:</span>
                        <span>{info?.open_source ? "Yes" : "No"}</span>
                    </OverviewItem>
                </Overview>
                <Description>{info?.description}</Description>
                <Overview>
                    <OverviewItem>
                        <span>Total Suply:</span>
                        <span>{price?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{price?.max_supply}</span>
                    </OverviewItem>
                </Overview>

                <Tabs>
                    <Tab isActive={chartMatch !== null}>
                        <Link to={`chart`}>Chart</Link>
                    </Tab>
                    <Tab isActive={priceMatch !== null}>
                        <Link to={`price`}>Price</Link>
                    </Tab>
                </Tabs>

                <Routes>
                    <Route path="price" element={<Price></Price>} />
                    <Route path="chart" element={<Chart></Chart>} />
                </Routes>
            </>
        )}
    </Container>
}

export default Coin;