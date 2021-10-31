function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = parent.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
}
var uid = getUrlParam("uid")
search()
function search() {
    $.ajax({
        url: "http://127.0.0.1:2333/api/zhuanjia",//请求地址
        type: "get",//请求方式
        data: {
            docid: uid,
        },
        dataType: "json",
        success: function (data) {//请求成功回调
            $("#point").html(data.data[0].title)
            if (data.data[0].point != null) {
                $("#name").html(data.data[0].author)
                $("#p").html(data.data[0].point)
                $("#p1").html(data.data[0].p1)
                $("#p2").html(data.data[0].p2)
                $("#p3").html(data.data[0].p3)
                $("#p4").html(data.data[0].p4)
                $("#p5").html(data.data[0].p5)
            } else {
                $("#name").html(data.data[0].author)
                $("#p").html("本项目尚未评分")
            }
        }
    })
}
