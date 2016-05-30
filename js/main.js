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
		
		/* exist('.js-bigcaro') && S.bigcaro(); */

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
		tabs: function() {
			var el = $('.js-tabs');

			function showTab(i, w) {
				$('.o-tabs__nav .is-active', w).removeClass('is-active');
				$('.o-tabs__nav li', w).eq(i).addClass('is-active');
				$('.o-tabs__content .o-tabs__item', w).removeClass('is-active animated fadeIn');
				$('.o-tabs__content .o-tabs__item', w).eq(i).addClass('is-active animated fadeIn');
			}
			el.each(function() {
				var n = $('> .o-tabs__nav', this),
					t = $('> ul > li', n),
					i = n.find('.is-active').index(),
					_t = $(this);

				t.click(function(e) {
					e.preventDefault();
					i = $(this).index();
					showTab(i, _t);
				});

				i && showTab(i, _t);
			});
		},
		txt2psw: function() {
			var el = $('.is-password');
			el.each(function() {
				$(this).on('click', function() {
					$(this).attr('type', 'password');
				});
			});
		},
		validate: function() {
			var el = $('form'),
				error = 0,
				errorClass = 'has-error',
				check,
				reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

			function checkField(o) {				
				if ($(o).val() == '') {
					$(o).parent().addClass(errorClass);
					return false;
				}
				return true;
			}
			var validateStart = function(o) {
				error = 0;
				el.find('.has-error').removeClass(errorClass);
				$('[type=text], [type=tel], [type=password], [type=date], textarea', o).each(function() {
					if ( $(this).prop('required') === true ) {
						check = checkField(this);
						if (check === false) {
							error = 1;
						}
					}
				});
				$('[type=email], [type=text], [type=password]', o).on('keydown', function() {
					$(this).parent().removeClass(errorClass);
				});
				$('[type=email]', o).each(function() {
					if ($(this).prop('required')) {
						var email = $(this).val();
						if (email === '') {
							$(this).parent().addClass(errorClass);
							error = 1;
						} else if (reg.test(email) === false) {
							$(this).parent().addClass(errorClass);
							error = 1;
						} else {
							$(this).parent().removeClass(errorClass);
						}
					}
				});
				$('[type=checkbox]', o).each(function() {
					if ($(this).prop('required')) {
						if (!$(this).prop('checked')) {
							$(this).parent().addClass(errorClass);
							error = 1;
						} else {
							$(this).parent().removeClass(errorClass);
						}
					}
				});
				return error;
			};
			el.each(function() {
				var submit = $('.submit', this),
					is_error, _t = $(this);
				$('input, textarea, select', this).each(function() {
					if ($(this).prop('required')) {
						$(this).prev('.o-form__lead').append(' <i class="o-form__required">*</i>');
					}
				});
				submit.on('click', function(e) {
					e.preventDefault();
					is_error = validateStart(_t);

					if (is_error === 1) {
						$('html, body').animate({
							scrollTop: 0
						}, 1500);
						
					} else {
						_t.submit();
						return true;
					}
				});
			});
		},
		init: function() {
			exist('select') && L.ns();
			L.modernizrSupport();
			L.validate();			
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
		init: function() {
			N.mobileNav();
		}
	}
	
	$(document).ready(function() {
		L.init();
		N.init();
	});
});