import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useTheme } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";


interface ChartProps {
    coinId: string | undefined;
}

interface IHistorical {
    time_open: number,
    time_close: number,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const theme = useTheme();
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
                mode: isDark ? "dark" : "light"
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
                y: {
                    formatter: (value) => `$${value.toFixed(3)}`
                },
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
                type: "datetime",
                labels: {
                    show: false,
                    datetimeFormatter: {month: "mmm 'yy"}
                },
                categories: data?.map((price) =>
                    new Date(price.time_close * 1000).toISOString()
                ),
            }
        }}
        >
            </ApexChart>}
        </div>
}

export default Chart;