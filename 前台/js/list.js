$.ajax({
    url: "../data/list.json",//请求地址
    type: "get",//请求方式
    async: true,//true异步，false同步
    data: {},
    success: function (res) {//请求成功回调
        for (var i = 0; i < res.list.length; i++) {
            var title = res.list[i].title;
            var date = res.list[i].date;
            $(".tbody").append(`<tr><td scope="row"><a href="./details.html">${title}</a></td><td>${date}</td></tr>`)
        }
    }
})
$("img").eq(1).click(function () {
    window.parent.location = "../../后台/page/login.html"
})