$.ajax({
    url: "../data/detail.json",//请求地址
    type: "get",//请求方式
    async: true,//true异步，false同步
    data: {},//发送给服务器的数据
    success: function (res) {//请求成功回调
        //data是自定义的属性添加给div
        $("#title").append(`${res.title}`),
        $("#date").append(`${res.date}`),
        $("#source").append(`${res.source}`)
        $("#text").append(`${res.content}`)
    },
})
$("img").eq(1).click(function () {
    window.parent.location = "../../后台/page/login.html"
})