var left = document.getElementsByClassName("left")[0]
var right = document.getElementsByClassName("right")[0]
var swiper = document.getElementsByClassName("swiper")[0]
var wapper = document.getElementsByClassName("wapper")[0]
var t
var n = 0
left.onclick = function () {
    n--
    if (n < 0) {
        n = 2
    }
    lr()
}
right.onclick = function () {
    n++
    if (n < 0) {
        n = 1
    }
    lr()
}

swiper.onmouseenter = function () {
    clearInterval(t)
}
left.onmouseenter = function () {
    clearInterval(t)
}
right.onmouseenter = function () {
    clearInterval(t)
}

swiper.onmouseleave = function () {
    auto()
}
left.onmouseleave = function () {
    auto()
}
right.onmouseleave = function () {
    auto()
}

function auto() {
    t = setInterval(function () {
        n++
        if (n > 2) {
            n = 0
        }
        lr()
    }, 2000)
}

function lr() {
    wapper.style.left = -1200 * n + "px"
}

$.ajax({
    url: "data/list.json",//请求地址
    type: "get",//请求方式
    async: true,//true异步，false同步
    data: {},//发送给服务器的数据
    success: function (res) {//请求成功回调
        // var con = JSON.parse(res)
        //data是自定义的属性添加给div
        for (var i = 0; i < res.list.length; i++) {
            var title = res.list[i].title;
            if (title.length > 9) { title = title.substr(0, 9) + "..." }
            $("#sylw").append(`<a href="">${title}</a><span>${res.list[i].date}</span><br>`)
        }
    },
})
