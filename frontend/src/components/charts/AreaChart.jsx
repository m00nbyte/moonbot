// modules
import clsx from 'clsx';
import moment from 'moment';
import Chart from 'react-apexcharts';

// types
import { areaChartTypes } from 'src/types';

const AreaChart = ({ theme, title, labelName, labels, customTooltip, data }) => {
    const config = {
        options: {
            chart: {
                type: 'area',
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
                borderColor: '#90A4AE',
                strokeDashArray: 0,
                position: 'back',
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
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
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0.3,
                    opacityFrom: 0.3,
                    opacityTo: 0.4,
                    stops: [0, 90, 100]
                }
            },
            labels: labels,
            xaxis: {
                type: 'timestamp',
                tickAmount: 8,
                labels: {
                    formatter: (value) => {
                        return moment(value, 'DD/MM/YYYY').format('DD. MMM');
                    }
                }
            },
            yaxis: {
                min: 0,
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
                type='area'
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

AreaChart.propTypes = areaChartTypes;

export default AreaChart;
