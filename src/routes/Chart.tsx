import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { theme } from "../theme";

interface ChartProps {
    coinId: string | undefined;
}

interface IHistorical {
    time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId], 
        () => fetchCoinHistory(coinId));
    return <div>
        {isLoading ? "Loading chart..." : <ApexChart 
        type="line"
        series={[
            {
                name: "Price",
                data: data?.map(price => price.close) ?? []
            }
        ]}
        options={{
            theme: {
                mode: "dark"
            },
            colors: [theme.accentColor],
            chart:{
                width: 500, 
                height: 500,
                foreColor: '#ffffff', // 전체 글자색
                toolbar: {
                    show: false
                },
                background: "transparent"
            },
            grid: { show:false },
            tooltip: {
                style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                }
            },
            stroke: {
                curve: "smooth"
            },
            yaxis: {
                show: false
            },
            xaxis: {
                axisBorder: {show: false},
                axisTicks: {show: false},
                labels: {show: false}
            }
        }}
        >
            </ApexChart>}
        </div>
}

export default Chart;