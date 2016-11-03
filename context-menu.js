define([
    'angular',
    'lodash'
],
function (angular, _) {
  'use strict';

  var module = angular.module('grafana.directives');

  module.directive('grafanaAnalyticGraphContextMenu', function ($log, $modal, $q, $rootScope, backendSrv) {
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
        var analyticGraphAppConfig = null,
          markThresholdModalScope = null;
        updateAnalyticGraphAppConfig();

        function getConfig(cb) {
          backendSrv.get('api/plugins/analytic-engine-app/settings').then(function(results) {
            cb(results);
          });
        }

        function updateAnalyticGraphAppConfig(cb) {
          getConfig(function(results) {
            $log.log('analyticGraphAppConfig updated.');
            analyticGraphAppConfig = results;

            if (_.isFunction(cb)) {
              cb();
            }
          });
        }

        function popMarkThreshold() {
          if (markThresholdModalScope) { return; }

          markThresholdModalScope = $rootScope.$new();
          var markThresholdModal = $modal({
            template: 'public/app/plugins/panel/analytic-graph/partials/mark-threshold-modal.html',
            persist: false,
            show: false,
            scope: markThresholdModalScope,
            keyboard: false
          });

          markThresholdModalScope.$on('$destroy', function() { markThresholdModalScope = null; });
          $q.when(markThresholdModal).then(function(modalEl) { modalEl.modal('show'); });
        }

        scope.markThreshold = function() {
          if (analyticGraphAppConfig) {
            $log.log('POP');
            popMarkThreshold();
          } else {
            updateAnalyticGraphAppConfig(function() {
              $log.log('POP');
              popMarkThreshold();
            });
          }
        };
      }
    };
  });
});