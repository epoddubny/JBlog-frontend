/**
 * Created by eugene on 01.01.16.
 */
'use strict';
module.exports = function(jBlogApp, window) {

    jBlogApp.provider('$disqus', function() {

        var shortname;

        this.$get = [function() {

            function reset(disqusParameters) {
                if (!angular.isDefined(disqusParameters)) {
                    throw new Error('No disqus defined');
                } else if (angular.isDefined(window.DISQUS)) {
                    resetDisqus(disqusParameters);
                } else {
                    setGlobals(disqusParameters);
                    addScriptTag();
                }
            }

            return {
                reset : reset
            };
        }];

        function resetDisqus(disqusParameters) {
            window.DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = disqusParameters.id;
                    this.page.url = disqusParameters.url;
                    this.page.title = disqusParameters.title;
                    this.language = disqusParameters.lang;
                }
            });
        }

        this.setShortname = function(sname) {
            shortname = sname;
        };

        function addScriptTag() {
            var container = getScriptContainer();
            var scriptSrc = getScriptSrc();
            if (hasScriptTagInPlace(container, scriptSrc)) {
                return;
            }
            container.appendChild(buildScriptTag(scriptSrc));
        }

        function getScriptContainer() {
            return (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
        }

        function getScriptSrc() {
            return '//' + shortname + '.disqus.com/embed.js';
        }

        function hasScriptTagInPlace(container, scriptSrc) {
            var scripts   = container.getElementsByTagName('script'),
                script, i;

            for (i = 0; i < scripts.length; i += 1) {
                script = scripts[i];

                if (~script.src.indexOf(scriptSrc)) {
                    return true;
                }
            }

            return false;
        }

        function setGlobals(disqusParameters) {
            window.disqus_identifier = disqusParameters.id;
            window.disqus_url = disqusParameters.url;
            window.disqus_shortname  = shortname;
            window.disqus_config = function () {
                this.language = disqusParameters.lang;
            };
        }

        function buildScriptTag(src) {
            var scriptTag = document.createElement('script');
            scriptTag.src = src;
            scriptTag.async = true;
            return scriptTag;
        }

    });

    jBlogApp.directive('disqus', ['$disqus', function($disqus) {
        return {
            restrict : 'A',
            replace  : true,
            scope    : {
                disqus : '='
            },
            template : '<div id="disqus_thread"></div>',
            link: function (scope) {
                scope.$watch('disqus', function(disqusParameters) {
                    if (angular.isDefined(disqusParameters)) {
                        $disqus.reset(disqusParameters);
                    }
                });
            }
        };
    }]);

};

