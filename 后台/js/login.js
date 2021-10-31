$("#btn1").click(function () {
    sendData()
})
function sendData() {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:2333/api/login",
        data: {
            name: $("#name").val(),
            pas: $("#pas").val()
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if ($("#pas").val() == "" || $("#name").val() == "") {
                alert("用户名或密码不能为空")
            } else if (data.err_code == 200) {
                console.log(data.uid);
                alert(data.msg)

                if (data.role == 2) {
                    window.location.href = "./scorelist.html?id=" + data.uid//用户
                } else if (data.role == 1) {
                    window.location.href = "./zhuanjia.html?id=" + data.uid//评审
                } else if (data.role == 0) {
                    window.location.href = "./admin.html?id=" + data.uid//管理
                } else {
                    alert("用户未定义")
                }
            } else {
                alert(data.msg)
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown, "有错")
        }
    })
}

$(".img").eq(0).click(function(){
    location.href="../../前台/index.html"
})