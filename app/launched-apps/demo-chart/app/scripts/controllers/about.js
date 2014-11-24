/*global nv, d3*/
'use strict';

/**
 * @ngdoc function
 * @name demoChartApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the demoChartApp
 */
angular.module('demoChartApp')
  .controller('AboutCtrl', function ($scope, demoData, interappMessaging) {
    $scope.model = {
      name: 'Demo',
      data: [1,2,3,4,3,2,3,4,3,2,1]
    };

    interappMessaging.subscribe('*', 'currentCompany', function(msg){
      console.log(msg);
      $scope.model.name = msg.name;
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    });

    function exampleData() {
      return [{
        key: 'sure',
        values: demoData[0]
          .Dates
          .map(function(el, i){
            return {
              label: el,
              value: demoData[0].Elements[0].DataSeries.close.values[i]
            };
          })
      }];
    }

    var width = 470,
        height = 282,
        data = exampleData()[0].values,
        y = d3.scale.linear()
          .range([0, height])
          .domain([0, d3.max(data, function(d){
            return d.value;
          })]),
        barWidth = width / data.length,
        chart = d3.select('#equity-chart svg');

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

  });
