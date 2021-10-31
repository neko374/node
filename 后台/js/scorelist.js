function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = parent.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
}
var uid = getUrlParam("id")
search()
function search() {
    $("#tbody").empty();
    $.ajax({
        url: "http://127.0.0.1:2333/api/search",//请求地址
        type: "get",//请求方式
        data: {
            title: $("#title").val(),
            aid: uid,
        },
        dataType: "json",
        success: function (data) {//请求成功回调
            console.log(data.data.length);
            $.each(data.data, function (k, v) {
                if (v.status == 0) {
                    var st = '<span style="color: green;">未评审</span>'
                } else {
                    var st = '<span style="color: red;">已评审</span>'
                }
                if (v.point == null) {
                    var po = "未评分"
                } else {
                    var po = v.point
                }
                $("#tbody").append(`
        <tr><td>${k + 1}</td><td>${v.title}</td><td>${v.author}</td><td>${v.crtime}</td><td>${st}</td><td>${po}</td><td><button type="button" class="yl" onclick="openview(${v.docid})">预览</button></td></tr>
        `)
            })
        }
    })
}
$("#btn").click(function () {
    $("#tbody").empty()
    search()
})

function openview(c) {
    window.open("./pdf.html?uid=" + c + "&id=" + uid)
}

$("#buy").click(function () {
    location.href = "./buy.html?id=" + uid
})

$("#upload").click(function () {
    window.open("../page/upload.html")
})