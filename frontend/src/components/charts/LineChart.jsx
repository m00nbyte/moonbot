// modules
import clsx from 'clsx';
import moment from 'moment';
import Chart from 'react-apexcharts';

// types
import { lineChartTypes } from 'src/types';

const LineChart = ({ theme, title, labelName, labels, customTooltip, data }) => {
    const config = {
        options: {
            chart: {
                type: 'line',
                height: 380,
                zoom: {
                    enabled: false
                },
                background: 'transparent',
                toolbar: {
                    tools: {
                        pan: false
                    },
                    autoSelected: 'zoom'
                },
                sparkline: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            theme: {
                mode: theme,
                palette: 'palette2'
            },
            markers: {
                size: 0,
                style: 'hollow'
            },
            grid: {
                show: true,
                borderColor: '#8e8c8c',
                strokeDashArray: 0,
                position: 'back',
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                row: {
                    colors: undefined,
                    opacity: 0.5
                },
                column: {
                    colors: undefined,
                    opacity: 0.5
                }
            },
            tooltip: {
                x: {
                    show: false
                },
                y: {
                    show: false,
                    formatter: customTooltip || undefined,
                    title: {
                        formatter: (seriesName) => {
                            return labelName && `${labelName}: `;
                        }
                    }
                },
                marker: {
                    show: false
                }
            },
            labels: labels,
            xaxis: {
                type: 'timestamp',
                tickAmount: 8,
                labels: {
                    formatter: (value) => moment(value, 'DD/MM/YYYY').format('DD. MMM')
                }
            },
            yaxis: {
                min: Math.min(...data) - Math.min(...data) * 0.01,
                max: Math.max(...data) + Math.max(...data) * 0.01,
                tickAmount: 6,
                labels: {
                    formatter: (value) => value.toFixed(4)
                }
            },
            legend: {
                show: false
            }
        },
        series: [
            {
                name: title,
                data: data
            }
        ]
    };

    return (
        <div id='chart' className={clsx(['bg-stone-100', 'dark:bg-stone-800'])}>
            <Chart
                type='line'
                height={380}
                options={{
                    ...config.options,
                    theme: {
                        mode: theme,
                        palette: 'palette2'
                    }
                }}
                series={config.series}
            />
        </div>
    );
};

LineChart.propTypes = lineChartTypes;

export default LineChart;
