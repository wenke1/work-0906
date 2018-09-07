require.config({
    baseUrl: "/js/libs",
    paths: {
        "jquery": "./jquery.min",
        "handlebars": "./handlebars-v4.0.11",
        "bscroll": "./bscroll",
        "swiper": "./swiper.min",
        "index": "./index"
    }
});
require(["index"])