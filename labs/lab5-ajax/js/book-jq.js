$(document).ready(function() {
    function changeAllImagesOpacity() {
        $('img').fadeTo('fast', 0.5);
    }

    $('#don-quixote-img').on('click', function() {
        changeAllImagesOpacity();
        $(this).fadeTo('fast', 1);
        $('#details').load('https://faithadewumi.rhody.dev/lab5-ajax/data/cervantes-data.html').hide().fadeIn('slow');
    });

    $('#two-cities-img').on('click', function() {
        changeAllImagesOpacity();
        $(this).fadeTo('fast', 1);
        $('#details').load('https://faithadewumi.rhody.dev/lab5-ajax/data/dickens-data.html').hide().fadeIn('slow');
    });

    $('#lotr-img').on('click', function() {
        changeAllImagesOpacity();
        $(this).fadeTo('fast', 1);
        $('#details').load('https://faithadewumi.rhody.dev/lab5-ajax/data/tolkien-data.html').hide().fadeIn('slow');
    });
});