/*global d3*/
'use strict';

/**
 * @ngdoc service
 * @name demoChartApp.charting
 * @description
 * # charting
 * Service in the demoChartApp.
 */
angular.module('demoChartApp')
  .service('charting', function charting(demoData) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var dataToggle = 0;

    var exampleData = function() {
      dataToggle =  ++dataToggle % 2;

      console.log('this is the toggle value', dataToggle,demoData[dataToggle] );

      return [{
        key: 'sure',
        values: demoData[dataToggle]
          .Dates
          .map(function(el, i){
            return {
              label: el,
              value: demoData[dataToggle].Elements[0].DataSeries.close.values[i]
            };
          })
      }];
    };

    // var dataBySymbol = function(symbol){
    //   return demoData.filter(function(company){
    //     return company.Elements[0].Symbol === symbol;
    //   });
    // };

    var dataBySymbol = function(symbol){
      var rawData = demoData.filter(function(company){
        return company.Elements[0].Symbol === symbol;
      })[0];

      return rawData.Dates.map(function(el, i){
        return {
          label: el,
          value: rawData.Elements[0].DataSeries.close.values[i]
        };
      });
    };

    var paintChart = function(chart, companySymbol){
      console.log('this is the data by symbol ', dataBySymbol('FB'), 'and the prepped data', exampleData()[0].values);

      //element.innerHTML = '';

      chart.selectAll('g').remove();

      var width = 440,
          height = 165,
          // data = exampleData()[0].values,
          data = dataBySymbol(companySymbol),
          y = d3.scale.linear()
            .range([0, height])
            .domain([0, d3.max(data, function(d){
              return d.value;
            })]),
          barWidth = width / data.length;

      console.log('this is the first one ', data[0]);

      chart
        .attr('width', width)
        .attr('height', height);

      var bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function(d, i) {
            return 'translate(' + i * barWidth + ',0)';
        })
        .attr('data-legend','whatever ');

      bar.append('rect')
        .attr('y', function(d) {
            return y(d.value) / 1.2;
        })
        .attr('height', function(d) {
            return height - y(d.value) * .25;
        })
        .attr('width', barWidth )
        .attr('fill', '#428bca');
    };

    return {
      paintChart: paintChart
    };
  });
