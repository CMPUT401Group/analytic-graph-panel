define([
    'angular'
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.directives');

  module.directive('grafanaAnalyticGraphContextMenu', function ($log) {
    return {
      restrict: 'E',
      template: '<div class="dropdown open">' +
      '  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">' +
      '    <li><a tabindex="-1" href="#">Action</a></li>' +
      '    <li><a tabindex="-1" href="#">Another action</a></li>' +
      '    <li><a tabindex="-1" href="#">Something else here</a></li>' +
      '    <li class="divider"></li>' +
      '    <li><a tabindex="-1" href="#">Separated link</a></li>' +
      '  </ul>' +
      '</div>',
      link: function () {
        $log.log('grafana-analytic-graph-context-menu linked.');
      }
    };
  });
});