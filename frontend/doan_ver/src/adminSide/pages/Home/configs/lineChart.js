
const lineChart = (data) => ( {
    series: [
        {
            name: "Tổng tiền",
            data: data,
            offsetY: 0,
        },
    ],

    options: {
        chart: {
            width: "100%",
            height: 350,
            type: "area",
            toolbar: {
                show: false,
            },
        },

        legend: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },

        yaxis: {
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: 600,
                    colors: ["#8c8c8c"],
                },
            },
        },

        xaxis: {
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: 600,
                    colors: [
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                    ],
                },
            },
            categories: [
                "(Tháng) 1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12"
            ],
        },

        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "đ";
                },
            },
        },
    },
});

export default lineChart;
