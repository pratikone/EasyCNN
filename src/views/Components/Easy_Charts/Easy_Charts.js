import React, {Component} from "react";
import {Line} from "react-chartjs-2";

class Easy_Charts extends Component {
    constructor(props) {
        super(props);
        const brandPrimary = '#20a8d8';
        const brandSuccess = '#4dbd74';
        const brandInfo = '#63c2de';
        const brandWarning = '#f8cb00';
        const brandDanger = '#f86c6b';

        var elements = 27;
        var data1 = [];
        var data2 = [];
        var data3 = [];

        for (var i = 0; i <= elements; i++) {
          data1.push(this.random(50, 200));
          data2.push(this.random(80, 100));
          data3.push(65);
        }

        const mainChart = {
          labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: this.convertHex(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: data1
            },
            // {
            //   label: 'My Second dataset',
            //   backgroundColor: 'transparent',
            //   borderColor: brandSuccess,
            //   pointHoverBackgroundColor: '#fff',
            //   borderWidth: 2,
            //   data: data2
            // },
            // {
            //   label: 'My Third dataset',
            //   backgroundColor: 'transparent',
            //   borderColor: brandDanger,
            //   pointHoverBackgroundColor: '#fff',
            //   borderWidth: 1,
            //   borderDash: [8, 5],
            //   data: data3
            // }
          ]
        }

        const mainChartOpts = {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: false,
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
                max: 250
              }
            }]
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            }
          }
        }


        this.state = {
            mainChart: mainChart,
            mainChartOpts: mainChartOpts
        };


    }



    //Random Numbers
     random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    // convert Hex to RGBA
    convertHex(hex, opacity) {
      hex = hex.replace('#', '');
      var r = parseInt(hex.substring(0, 2), 16);
      var g = parseInt(hex.substring(2, 4), 16);
      var b = parseInt(hex.substring(4, 6), 16);

      var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
      return result;
    }



    componentDidMount() {
        this.timer = setInterval(
          () => this.check_for_updates(),
          5000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }



    update ( new_data, that ) {
        let datacopy = Object.assign({}, that.state.mainChart);
        datacopy.datasets[0].data = new_data;
        //console.log(datacopy.datasets[0].data);
        that.setState({mainChart: datacopy});

    }

    check_for_updates() {
      var that = this;
      fetch('http://localhost:5000/update_chart_data')
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }


            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data.data);
              that.update( data.data, that );
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });



    }

    render() {
        return (
            <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}} >
                  <Line ref='doggy' data={this.state.mainChart} options={this.state.mainChartOpts} height={300}/>
            </div>
        );
    }
}



export default Easy_Charts;