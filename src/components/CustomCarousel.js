$(document).ready(function() {
    // Initialize Slick Carousel
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        centerMode: true,
        focusOnSelect: true,
        slidesToShow: 3
    });

    // Update background image on slide change
    $('.carousel').on('afterChange', function(event, slick, currentSlide) {
        var imageUrl = $(slick.$slides[currentSlide]).find('img').attr('src');
        $('.slide-container::before').css('background-image', 'url(' + imageUrl + ')');
    });
});
