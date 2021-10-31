$("#defaultCheck").click(function () {
    $(".form-check-input").prop("checked", $(this).prop("checked"))
})
$('#defaultCheck').click(function () {
    var flag = true;
    $(".form-check-input").each(function (k, v) {
        if (!$(this).prop('checked')) {
            flag = false
            return false
        }
    })
    $("#defaultCheck").prop('checked', flag)
})

$("#btn").click(function () {
    if ($(".form-control").val() == "") {
        alert("请填写完整")
    } else if (!$('#defaultCheck').prop("checked")) {
        alert("请勾选并同意条款")
    } else {
        sendData()
    }
})

function sendData() {
    $.ajax({
        type: "post",
        url: "http://127.0.0.1:2333/api/reg",
        data: {
            name: $(".form-control").eq(0).val(),
            pas: $(".form-control").eq(1).val(),
            truename: $(".form-control").eq(2).val(),
            department: $(".form-control").eq(3).val(),
            mailbox: $(".form-control").eq(4).val(),
            phone: $(".form-control").eq(5).val(),
            role: 0
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.err_code == 200) {
                alert("注册成功")
                if (data.err_code == 0) {
                    alert(data.msg)
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
$("#back").click(function () {
    history.back()
})