/*jshint expr:true */

function debouncer(func, timeout) {
	var timeoutID;
	timeout = timeout || 200;
	return function() {
		var scope = this,
			args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function() {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	};
}

jQuery(function($) {
	function exist(o) {
		d = ($(o).length>0) ? true : false;
		return d;
	}
	function window_smaller_than(n) {
		var d = ($(window).width() < n) ? true : false;
		return d;
	}

	var L = {
		modal: function() {
			$('.mfc-modal').on('click', function(e) {
				e.preventDefault();
				var target = $(this).attr('href');
				$.magnificPopup.open({
                    items: {
                        src: target,
                        type: 'inline'
                    },
					mainClass: 'mfp-fade mfp-modal'
                });
			});	
		},
		modernizrSupport: function() {
			var m = Modernizr.addTest('svgasimg', document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'));
			
			function replaceSvgImg() {
				var i = document.getElementsByTagName("img"),
					j, y;
				for (j = i.length; j--;) {
					y = i[j].src;
					if (y.match(/svg$/)) {
						i[j].src = y.slice(0, -3) + 'png';
					}
				}
			}

			m.svgasimg ? true : replaceSvgImg();
			
		},
		ns: function() {
			$('select').niceSelect();
		},
		relocations: function() {
			function ask() {
				var el = $('.c-ask'),
					status = false;
	
				function init() {
					el.detach();
					$('.o-content--products').after(el);
					status = true;
				}
				$(window).resize(debouncer(function(e) {
					if (window_smaller_than(641)) {
						if (status === false) {
							init();
						}
					} else {
						if (status === true) {
							el.detach();
							$('.c-nav-products').after(el);
							status = false;
						}
					}
				}));
				if (window_smaller_than(641)) {
					init();
				}
			}
			
			function team() {		
				var el = $('.c-team'),
					status = false;
	
				function init() {
					el.detach();
					$('.o-sidebar').after(el);
					status = true;
				}
				$(window).resize(debouncer(function(e) {
					if (window_smaller_than(801)) {
						if (status === false) {
							init();
						}
					} else {
						if (status === true) {
							el.detach();
							$('.c-article').after(el);
							status = false;
						}
					}
				}));
				if (window_smaller_than(801)) {
					init();
				}
			}
			
			function topContact() {				
				var el = $('.c-article__excerpt'),
					status = false;
	
				function init() {
					el.detach();
					$('.c-top__photo--contact').after(el);
					status = true;
				}
				$(window).resize(debouncer(function(e) {
					if (window_smaller_than(801)) {
						if (status === false) {
							init();
						}
					} else {
						if (status === true) {
							el.detach();
							$('.o-header-top h1').after(el);
							status = false;
						}
					}
				}));
				if (window_smaller_than(801)) {
					init();
				}
			}

			exist('.c-team') && team();
			exist('.c-top--contact') && topContact();
			exist('.o-sidebar--products') && ask();
		},
		init: function() {
			exist('select') && L.ns();
			L.modernizrSupport();
			L.relocations();
		}
	};

	var N = {
		mobileNav: function() {
			function shTrigger() {
				var t = $('.c-nav-trigger'),
					n = $('.c-nav-primary'),
					status = false;

				function init() {
					n.removeClass('u-posy');
					status = true;
				}
				t.on('click', function(e) {
					e.preventDefault();
					$(this).toggleClass('is-active');
					n.toggleClass('is-mobile');
				});
				$(window).resize(debouncer(function(e) {
					if (window_smaller_than(641)) {
						if (status === false) {
							init();
						}
					} else {
						if (status === true) {
							t.removeClass('is-active');
							n.addClass('u-posy').removeClass('is-mobile').attr('style', '');
							status = false;
						}
					}
				}));
				if (window_smaller_than(641)) {
					init();
				}
			}
			shTrigger();
		},
		productsNav: function() {
			var el = $('.c-nav-products');
			
			$('a', el).on('click', function(e) {	
				if ( $(this).next('.sub-menu').length > 0 ) {
					e.preventDefault();
					$(this).next('.sub-menu').slideToggle();
					$(this).parent().toggleClass('is-active');
				};
			});
			
		},
		init: function() {
			exist('.c-nav-products') && N.productsNav();
			N.mobileNav();
		}
	}
	
	$(document).ready(function() {
		L.init();
		N.init();
	});
});