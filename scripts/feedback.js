$.widget('custom.feedback', {
    _feedbacks: null,
    options: {
        optios_id: null,
        feedbacks: null,
        grid: false,
        onResultsLoaded: null,
        color: null
    },
    _create: function () {
        if (!this.options.optios_id) {
            console.error('optios_id is a required option.');
        }

        if (null !== this.options.color) {
            this.element.css('color', this.options.color);
        }

        this.element.addClass('of-container');
        if (this.options.grid) {
            this.element.addClass('of-container-grid');
        } else {
            this.element.addClass('of-container-scroll-horizontal');
        }

        if (null === this._feedbacks) {
            this._getFeedbacks();
            this._buildLoader();
            return;
        }

        this._buildOverview();
    },
    _getFeedbacks: function () {
        var self = this;
        $.ajax({
            url: 'https://client.optios.net/feedback/' + this.options.optios_id,
            dataType: 'json'
        })
            .done(function (data) {
                self._feedbacks = data;
                if (typeof self.options.onResultsLoaded === "function") {
                    self.options.onResultsLoaded(data);
                }
            })
            .fail(function (response, response2) {
                console.error('Unable to load feedback for given optios_id');
                self._feedbacks = [];
            })
            .always(function (data) {
                self._buildOverview();

                /* ::::: Slider Init ::::: */
                $('#feedback').slick({
                    infinite: true,
                    arrows: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    speed: 1000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: true,
                    appendArrows: $(".feedback-arrows"),
                    prevArrow: '<button class="button-prev" ripple><i class="far fa-angle-left"></i></button>',
                    nextArrow: '<button class="button-next" ripple><i class="far fa-angle-right"></i></button>',
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2
                            }
                        }
                    ]
                });
            });
    },
    _buildLoader: function () {
        this.element
            .empty()
            .append(
                $('<div>')
                    .addClass('of-spinner')
                    .append($('<div>').addClass('of-dot1'))
                    .append($('<div>').addClass('of-dot2'))
            );
    },
    _buildOverview: function () {
        this.element.empty();
        for (var i = 0; i < this._feedbacks.length; i++) {
            var feedback = this._feedbacks[i];
            var createdAt = new Date(feedback.created_at);
            var createdAtFormatted = createdAt.toLocaleDateString(
                undefined,
                { year: 'numeric', month: 'long', day: 'numeric' }
            );
            var ratingImg = 'https://client.optios.net/img/';
            ratingImg += feedback.rating === 'bad' ? 'feedback-sad.png' : 'feedback-super.png';

            this.element.append(
                $('<div>')
                    .addClass('of-feedback')
                    .append(
                        $('<div>')
                            .addClass('of-header')
                            .append($('<div>').addClass('of-rating').append($('<img>').prop('src', ratingImg)))
                            .append(
                                $('<div>')
                                    .addClass('of-title')
                                    .append($('<div>').addClass('of-customer').html(feedback.customer))
                                    .append(
                                        $('<div>')
                                            .addClass('of-date')
                                            .html(createdAtFormatted)
                                    )
                            )
                    )
                    .append($('<div>').addClass('of-text').html(feedback.text))
            );
        }
    }
});
