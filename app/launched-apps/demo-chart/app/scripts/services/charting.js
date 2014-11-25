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

      // clear out any previous paintings
      chart.selectAll('g').remove();

      var bar,
          width = 440,
          height = 165,
          data = dataBySymbol(companySymbol),
          y = d3.scale.linear()
            .range([0, height])
            .domain([0, d3.max(data, function(d){
              return d.value;
            })]),
          barWidth = width / data.length;

      chart
        .attr('width', width)
        .attr('height', height);

      bar = chart.selectAll('g')
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
