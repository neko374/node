function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = parent.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
}
var uid = getUrlParam("id")
$.ajax({
    url: "http://127.0.0.1:2333/api/header",
    type: "get",
    dataType: "json",
    data: {
        uid: uid
    },
    success: function (res) {
        if (res.err_code == 200) {
            $("#ninhao").html("您好<br>" + res.data[0].name + "!!!")
        }
    }
})
$(".r").eq(0).click(function () {
    window.parent.location = "./login.html"
})
$(".r").eq(1).click(function () {
    window.parent.location = "../../前台/index.html"
})