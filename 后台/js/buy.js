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
        url: "http://127.0.0.1:2333/api/buy",//请求地址
        type: "get",//请求方式
        data: {},
        dataType: "json",
        success: function (data) {//请求成功回调
            console.log(data.data.length);
            $.each(data.data, function (k, v) {
                $("#tbody").append(`<tr><td>${k + 1}</td><td><a attrs="review" href="javascript:void(0)" onclick=" openView(${v.docid})">${v.title}</a></td><td>${v.author}</td><td>${v.crtime}</td>
        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        购买</button></td><td><button type="button" class="dl"><a href="../file/${v.docid}.pdf" download="${v.docid}.pdf" style="color:white">下载</a></button></td></tr>
        `)
            })
        }
    })
}
point()
function point() {
    $("#point").empty()
    $.ajax({
        url: "http://127.0.0.1:2333/api/header",
        type: "get",
        data: {
            uid: uid
        },
        dataType: "json",
        success: function (res) {
            console.log(res.data[0].points);
            $("#point").append("剩余积分:" + res.data[0].points)
            $(".dl").click(function () {
                if (res.data[0].points <= 2) {
                    alert("积分不足")
                    return
                } else {
                    alert("下载需消耗3积分")
                    points = res.data[0].points - 3
                    $.ajax({
                        url: "http://127.0.0.1:2333/api/cpoint",
                        type: "post",
                        dataType: "json",
                        data: {
                            uid: uid,
                            points: points
                        },
                        success: function (data) {
                            if (data.err_code == 200) {
                                // location.reload()
                            }
                        }
                    })
                }
            })
        }
    })
}
function openView(c) {
    window.open("./pdf.html?uid=" + c + "&id=" + uid)
}
