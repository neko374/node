$("#tj").click(function () {
    if ($("#tit").val() == "") {
        alert("必填项目未填写完整")
    } else if ($("#file").val() == "") {
        alert("未选择文件")
    } else {
        console.log($("#file").val());
        $.ajax({
            
        })
    }
})