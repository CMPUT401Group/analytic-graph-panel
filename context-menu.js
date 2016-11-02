define([
    'angular'
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.directives');

  module.directive('grafanaAnalyticGraphContextMenu', function ($log, backendSrv) {
    return {
      restrict: 'E',
      template: '<div class="dropdown open">' +
      '  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">' +
      '    <li><a tabindex="-1" href="#" ng-click="markThreshold()">Mark Threshold</a></li>' +
      '    <li><a tabindex="-1" href="#">Mark Covariance</a></li>' +
      '    <li><a tabindex="-1" href="#">Mark Linear Correlation</a></li>' +
      '  </ul>' +
      '</div>',
      link: function (scope) {
        var self = this;

        self.analyticGraphAppConfig = null;
        updateAnalyticGraphAppConfig();

        function getConfig(cb) {
          backendSrv.get('api/plugins/analytic-engine-app/settings').then(function(results) {
            cb(results);
          });
        }

        function updateAnalyticGraphAppConfig(cb) {
          getConfig(function(results) {
            $log.log('analyticGraphAppConfig updated.');
            self.analyticGraphAppConfig = results;
            cb();
          });
        }

        scope.markThreshold = function() {
          if (self.analyticGraphAppConfig) {
            $log.log('POP');
          } else {
            updateAnalyticGraphAppConfig(function() {
              $log.log('POP');
            });
          }
        };

      }
    };
  });
});