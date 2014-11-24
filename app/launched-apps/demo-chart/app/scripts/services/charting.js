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

    var dataBySymbol = function(symbol){
      return demoData.filter(function(company){
        return company.Elements[0].Symbol === symbol;
      });
    };

    var paintChart = function(chart){
      console.log('this is the data by symbol ', dataBySymbol('FB'));

      //element.innerHTML = '';

      d3.select(chart);

      var width = 440,
          height = 100,
          data = exampleData()[0].values,
          y = d3.scale.linear()
            .range([0, height])
            .domain([0, d3.max(data, function(d){
              return d.value;
            })]),
          barWidth = width / data.length;

      chart
        .attr('width', width)
        .attr('height', height);

      var bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function(d, i) {
            return 'translate(' + i * barWidth + ',0)';
        });

      bar.append('rect')
        .attr('y', function(d) {
            return y(d.value);
        })
        .attr('height', function(d) {
            return height - y(d.value);
        })
        .attr('width', barWidth )
        .attr('fill', 'steelblue');
    };

    return {
      paintChart: paintChart
    };
  });
