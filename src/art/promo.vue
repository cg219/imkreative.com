<template>
    <app>
        <h1>Custom Hamsa Painting - $150 Special</h1>
        <h3>Get your own signed one of a kind HAMSA piece.</h3>
        <p class="body">Acrylic on 1ft x 1ft wood panel canvas with special high gloss resin finish. This will be a very limited run. So make sure to send in your message if you'd like to purchase your own before all the spots are full.</p>
        <contact-form class="contact-form"></contact-form>
        <p><small><strong>* Full Payment Required once concept is finalized</strong></small></p>
        <div class="video-container">
            <iframe width="560" height="315" class="video" src="https://www.youtube.com/embed/MSnh6t05cXU?ecver=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    </app>
</template>

<script>
    const App = require('./app.vue');
    const ContactForm = require('./contact-form.vue');
    const Ting = require('./ting');

    module.exports = {
        components: {
            App,
            ContactForm
        }
    }

</script>

<style lang="scss">
    @import 'vars';

    .video {
        margin: auto;
        width: 100%;
        height: 51vw;
    }

    .video-container {
        margin: auto;
    }

    .body {
        margin-bottom: 30px;
    }

    .video-container {
        margin-top: 50px;
    }
</style>
