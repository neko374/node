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
        alert("注册成功")
        location.href = "../page/login.html"
    }
})