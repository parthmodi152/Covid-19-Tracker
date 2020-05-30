//var dates,
//    confirmed,
//    recovered,
//    deaths
//
//function UpdateChart(user_country){
//    var dates = []
//    var confirmed = []
//    var recovered = []
//    var deaths = []
//    fetch("https://pomber.github.io/covid19/timeseries.json")
//        .then(response => response.json())
//        .then(data => {
//        country_data = data[user_country]
//        data_length = data[user_country]['length']
//
//        // collecting data
//        for (var i = 0; i < 14; i++) {
//            dates.push(country_data[data_length - 1 - i]['date']);
//            confirmed.push(country_data[data_length - 1 - i]['confirmed']);
//            recovered.push(country_data[data_length - 1 - i]['recovered']);
//            deaths.push(country_data[data_length - 1 - i]['deaths']);
//        }
//        
//        // making chart
//        $("canvas#bar-chart").remove();
//        $("div.bar-chart").append('<canvas id="bar-chart" width="200" height="100"></canvas>');
//        var bar_ctx = document.getElementById('bar-chart');
//        var bar_chart = new Chart(bar_ctx, {
//            type: 'bar',
//            data: {
//                labels: dates.reverse(),
//                datasets: [
//                    {
//                        label: 'Confirmed',
//                        data: confirmed.reverse(),
//                        backgroundColor: "rgba(55, 160, 225, 0.7)",
//                        hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
//                        hoverBorderWidth: 2,
//                        hoverBorderColor: 'lightgrey'
//                    },
//                    {
//                        label: 'Recovered',
//                        data: recovered.reverse(),
//                        backgroundColor: "rgba(77,181,60,0.7)",
//                        hoverBackgroundColor: "rgba(77,181,60,0.7)",
//                        hoverBorderWidth: 2,
//                        hoverBorderColor: 'lightgrey'
//                    },
//                    {
//                        label: 'Deaths',
//                        data: deaths.reverse(),
//                        backgroundColor: "rgba(255,0,0,0.7)",
//                        hoverBackgroundColor: "rgba(255,0,0,0.7)",
//                        hoverBorderWidth: 2,
//                        hoverBorderColor: 'lightgrey'
//                    }
//                ]
//            },
//            options: {
//                animation: {
//                    duration: 10,
//                },
//                scales: {
//                    xAxes: [{ 
//                        stacked: true, 
//                        gridLines: { display: false },
//                        ticks: false,
//                    }],
//                    yAxes: [{ 
//                        stacked: true, 
//                    
//                    }],
//                }, // scales
//                legend: {display: true}
//            } // options
//        }
//                                 );
//    });
//
//}
