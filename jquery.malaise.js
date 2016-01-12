/**
 * jQuery malaise
 * Lazy load images and backgrounds
 * https://github.com/zaption/malaise
 * Forked from https://github.com/luis-almeida/unveil
 *
**/

;(function($) {

	$.malaise = function(options) {

		var desktopSource = 'data-src';
		var mobileSource = 'data-src-mobile';
		var retinaSource = 'data-src-retina';

		var opts = options || {};
		var settings = $.extend({
			offset: 0,
			path: '',
			selector: '.malaise',
			loadedClass: 'malaise-loaded',
			breakpoint: '767px',
			container: window,
			throttle: 100
        }, opts);

		var retina = window.devicePixelRatio >= 1.5;
		var offset = offset || 0;
		var unLoaded = $(settings.selector);
		var allElements = $(settings.selector);
		var loaded;

        var $container = $(settings.container);
        var $window = $(window);
        var windowHeight = $window.height();


		var aboveBreakpoint = true;
        if (window.matchMedia !== undefined) {
			var transWidth = window.matchMedia('(min-width: ' + settings.breakpoint + ')');
			var responsiveSources = function(mqw) {
				aboveBreakpoint = mqw.matches ? true : false
				unLoaded = allElements;
			};
			transWidth.addListener(responsiveSources);
			responsiveSources(transWidth);
        }

		allElements.on('loadSourceAttribute', function() {
			var source;

			if (retina && this.hasAttribute(retinaSource)) source = retinaSource;
			else if (!aboveBreakpoint && this.hasAttribute(mobileSource)) source = mobileSource;
			else source = desktopSource;
			var newSource = this.getAttribute(source);
			if (newSource) {
				if ($(this).is('img, iframe, video')) {
					this.setAttribute('src', settings.path + newSource);
				} else {
					this.setAttribute('style', 'background-image: url(' + settings.path + newSource + ')');
				}
				if (!$(this).hasClass(settings.loadedClass)) {
					$(this).addClass(settings.loadedClass);
					if (typeof settings.callback === 'function') settings.callback.call(this);
				}
			}
		});

		var showImages = function() {
			if (!unLoaded.length) return;
			var windowTop = $window.scrollTop();
			var windowBottom = windowTop + windowHeight;
			var containerTop = $container.is($window) ? 0 : windowTop - $container.offset().top;

			var onScreen = unLoaded.filter(function() {
				var $element = $(this);
				if ($element.is(':hidden')) return;
				var elementTop = $element.offset().top + containerTop;
				var elementBottom = elementTop + $element.height();

				return elementBottom >= windowTop - settings.offset && elementTop <= windowBottom + settings.offset;
			});

			loaded = onScreen.trigger('loadSourceAttribute');
			unLoaded = unLoaded.not(loaded);
		}

		var throttle = function(func) { // based on underscore's throttle
			var context;
			var result;
			var timeout = null;
			var previous = 0;
			var later = function() {
				previous = Date.now();
				timeout = null;
				result = func.apply(context);
				if (!timeout) context = null;
			};
			return function() {
				var now = Date.now();
				if (!previous) previous = now;
				var remaining = settings.throttle - (now - previous);
				context = this;
				if (remaining <= 0 || remaining > settings.throttle) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					previous = now;
					result = func.apply(context);
					if (!timeout) context = null;
				} else if (!timeout) {
					timeout = setTimeout(later, remaining);
				}
				return result;
			};
		};

		var resize = function() {
			windowHeight = $window.height();
			showImages();
		}

		$container.on({
			'resize.malaise': throttle(resize),
			'scroll.malaise': throttle(showImages),
			'wakeup.malaise': showImages,
			'touchend.malaise': showImages
		});

		showImages();

		return allElements;

	};

})(window.jQuery);