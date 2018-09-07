define(["jquery", "handlebars", "bscroll", "swiper"], function($, hand, bscroll, swiper) {
    $.ajax({
        url: "/api/eatList",
        dataType: "json",
        success: function(rs) {
            var soucer = $("#navList").html();
            var template = hand.compile(soucer);

            var html = template(rs.data);
            $(".swiper-slide>ul").html(html);
            new swiper(".navlist")
        }
    });
    $.ajax({
        url: "/api/cateList",
        dataType: "json",
        success: function(rs) {
            var soucer = $("#cateList").html();
            var template = hand.compile(soucer);
            var html = template(rs.data);
            $(".cate").html(html);
            new swiper(".navlist")
        }
    });
    var bscroll = new bscroll("section", {
        click: true,
        probeType: 2
    });
    var page = 0;

    bscroll.on("scroll", function() {
        if (this.y < this.maxScrollY - 90) {
            $(".pull_up").html("释放加载").addClass("flag");
        }
        if (this.y > this.maxScrollY - 10) {
            $(".pull_up").html("上拉加载").removeClass("flag");
        }
        if (this.y < 90) {
            $(".pull_down").html("下拉刷新").removeClass("flag");
        }
        if (this.y > 10) {
            $(".pull_down").html("释放刷新").addClass("flag");
        }
    });
    bscroll.on("scrollEnd", function() {
        if ($(".pull_down").hasClass("flag")) {
            location.reload();
        }
        if ($(".pull_up").hasClass("flag")) {
            $.ajax({
                url: "/api/catelist",
                dataType: "json",
                data: {
                    page: page++,
                    limit: 2
                },
                success: function(rs) {
                    var soucer = $("#cateList").html();
                    var template = hand.compile(soucer);
                    var html = template(rs.data);
                    $(".cate")[0].innerHTML += html;
                }
            });
        }
    });


});