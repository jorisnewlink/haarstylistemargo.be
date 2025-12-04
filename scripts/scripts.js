$(function () {
    'use strict';
    var $ae = $('.animate'),
        $body = $('body'),
        $window = $(window),
        $document = $(document);

    $('.nav-dropdown').on('click', (function (e) {
        'use strict';
        var el = $(this),
            elId = el.attr('id');
        if (el.attr('aria-expanded') == 'false') {
            el.attr('aria-expanded', 'true'),
                el.siblings('.nav-submenu').addClass('open'),
                el.parent().siblings().find('.nav-dropdown').attr('aria-expanded', 'false'),
                el.parent().siblings().find('.nav-submenu').removeClass('open');
        } else {
            el.attr('aria-expanded', 'false'),
                el.siblings('.nav-submenu').removeClass('open'),
                el.parent().find('.nav-dropdown').attr('aria-expanded', 'false'),
                el.parent().find('.nav-submenu').removeClass('open');
        }

        $document.click(function (e) {
            if ($(e.target).closest('.nav-dropdown').length > 0) {
                return true;
            }
            $('.nav-submenu.open').siblings().attr('aria-expanded', 'false');
            $('.nav-submenu.open').removeClass('open');
        });
    }));

    $('.nav-toggler').on('click', (function (e) {
        "use strict";
        var el = $(this);
        if (el.attr('aria-expanded') == 'false') {
            el.attr('aria-expanded', 'true').addClass('open'),
                $('#nav-desktop').addClass('open');
        } else {
            el.attr('aria-expanded', 'false').removeClass('open'),
                $('#nav-desktop').removeClass('open');
        }
    }));

    /* ::::: Hotfix Margo Single Page ::::: */
    if ($(window).width() < 1200) {
        $('.nav-link').on('click', (function (e) {
            "use strict";
            var el = $(this),
                toggle = $('.nav-toggler');
            if (toggle.attr('aria-expanded') == 'false') {
                toggle.attr('aria-expanded', 'true').addClass('open'),
                    $('#nav-desktop').addClass('open');
            } else {
                toggle.attr('aria-expanded', 'false').removeClass('open'),
                    $('#nav-desktop').removeClass('open');
            }
        }));
    }
     /* ::::: End Hotfix Margo Single Page ::::: */


    var cleanUp, debounce, i, len, ripple, rippleContainer, ripples, showRipple;

    debounce = function (func, delay) {
        var inDebounce;
        inDebounce = undefined;
        return function () {
            var args, context;
            context = this;
            args = arguments;
            clearTimeout(inDebounce);
            return inDebounce = setTimeout(function () {
                return func.apply(context, args);
            }, delay);
        };
    };

    showRipple = function (e) {
        var pos, ripple, rippler, size, style, x, y, offsetTop;
        ripple = this;
        rippler = document.createElement('span');
        size = ripple.offsetWidth;
        pos = ripple.getBoundingClientRect();
        offsetTop = $(this).offset().top;
        x = e.pageX - pos.left - (size / 2);
        y = e.pageY - offsetTop - (size / 2);
        style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;';
        ripple.rippleContainer.appendChild(rippler);
        return rippler.setAttribute('style', style);
    };

    cleanUp = function () {
        while (this.rippleContainer.firstChild) {
            this.rippleContainer.removeChild(this.rippleContainer.firstChild);
        }
    };

    ripples = document.querySelectorAll('[ripple]');

    for (i = 0, len = ripples.length; i < len; i++) {
        ripple = ripples[i];
        rippleContainer = document.createElement('div');
        rippleContainer.className = 'ripple--container';
        ripple.addEventListener('mousedown', showRipple);
        ripple.addEventListener('mouseup', debounce(cleanUp, 2000));
        ripple.rippleContainer = rippleContainer;
        ripple.appendChild(rippleContainer);
    }

    var scrollTop = function () {
        if ($(window).scrollTop() > 0) {
            $('#nav-wrapper').addClass('scrolled');
        } else {
            $('#nav-wrapper').removeClass('scrolled');
        }
    }

    function check_if_in_view() {
        var wh = $window.height(),
            ww = $window.width(),
            wtp = $window.scrollTop(),
            wbp = (wtp + wh);

        $.each($ae, function () {
            var $el = $(this),
                eh = $el.outerHeight(),
                etp = $el.offset().top,
                ebp = (etp + eh);

            if (etp <= wbp && ebp >= wtp) {
                if ($el.hasClass('scroll-1')) {
                    var ch = $('.hero-img-group').height(),
                        scrollsp = wtp * (0.66667 * (ch / wh));
                    $el.css({
                        'transform': 'translateY(' + scrollsp + 'px)'
                    });
                }
                if ($el.hasClass('scroll-2')) {
                    var ch = $('.hero-img-group').height(),
                        scrollsp = wtp * (0.333334 * (ch / wh));
                    $el.css({
                        'transform': 'translateY(' + scrollsp + 'px)'
                    });
                }
                if ($el.hasClass('scroll-3')) {
                    var ch = $('.hero-img-group').height(),
                        scrollsp = wtp * (-0.333334 * (ch / wh));
                    $el.css({
                        'transform': 'translateY(' + scrollsp + 'px)'
                    });
                }
                if ($el.hasClass('scroll-4')) {
                    var ch = $('.hero-img-group').height(),
                        scrollsp = wtp * (-0.66667 * (ch / wh));
                    $el.css({
                        'transform': 'translateY(' + scrollsp + 'px)'
                    });
                }
                if ($el.hasClass('scroll-5')) {
                    var ch = $('.hero-img-group').height(),
                        scrollsp = wtp * (0.2 * (ch / wh));
                    $el.css({
                        'transform': 'translateY(' + scrollsp + 'px)'
                    });
                }
                if ($el.hasClass('scroll-6')) {
                    var ch = $('.hero-img-group').height(),
                        scrollsp = wtp * (0.133334 * (ch / wh));
                    $el.css({
                        'transform': 'translateY(' + scrollsp + 'px)'
                    });
                }
                if ($el.hasClass('fade')) {
                    $el.addClass('in-view');
                }
            } else {
                if ($el.hasClass('in-view')) {
                    $el.removeClass('in-view');
                }
            }
        });
    }

    $window.ready(check_if_in_view);
    $window.ready(scrollTop);
    $window.on('scroll resize', check_if_in_view);
    $window.on('scroll resize', scrollTop);
});