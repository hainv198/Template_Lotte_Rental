$(document).ready(function(){
    /**********************************************/
    // Main_slide
    /**********************************************/
    $('#main_visual02').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000
    });

    m_couting();
    function m_couting(){
        setTimeout(function(){
            $('.counting').each(function(){
                var time = ($(this).data('time')) ? $(this).data('time') : 400;
                var delay = ($(this).data('delay')) ? $(this).data('delay') : 10;
                $(this).counterUp({
                    time : time,
                    delay: delay
                });
            });
        },800);
        first = false;
    }
});