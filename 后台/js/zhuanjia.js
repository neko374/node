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
        url: "http://127.0.0.1:2333/api/paper",//请求地址
        type: "get",//请求方式
        data: {},
        dataType: "json",
        success: function (data) {//请求成功回调
            console.log(data.data.length);
            $.each(data.data, function (k, v) {
                if (v.point == null) {
                    v.point = "未评分"
                    var s = "评审"
                }else{
                    var s = "重新评审"
                }
                $("#tbody").append(`<tr><td>${k + 1}</td><td><a attrs="review" href="javascript:void(0)" onclick=" openView(${v.docid})" id="abc">${v.title}</a></td><td>${v.crtime}</td><td>${v.point}</td>
        <td><button type="button" class="ps"><a attrs="review" href="javascript:void(0)" onclick=" view(${v.docid})">${s}</a></button></td></tr>
        `)
            })
        }
    })
}
function openView(c) {
    window.open("./lxl.html?uid=" + c + "&id=" + uid)
}

function view(a) {
    location.href = "./score.html?id=" + uid + "&uid=" + a
}