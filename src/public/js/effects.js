/* PROJECTS MENU ANIMATION */
$('body').on('mouseenter mouseleave','.dropdown-hover',function(e){
    let dropdown=$(e.target).closest('.dropdown-hover');
    dropdown.addClass('show');

    setTimeout(function(){
        dropdown[dropdown.is(':hover')?'addClass':'removeClass']('show');
    },300);
});


function showCertificates () {
    let delay = 0;

    $('.thumbnail').each(function () {
        $(this).delay(delay).fadeIn(1000);
        delay += 200;
    });
}

