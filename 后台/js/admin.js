function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = parent.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
}
var id = getUrlParam("id")
$.ajax({
    url: 'http://127.0.0.1:2333/api/user',
    type: 'get',
    success: (data) => {
        let num = 0
        $.each(data.data, (k, v) => {
            num++
            $('#tbody1').append(`<tr>
                                    <td scope="row" class="text-center">${num}</td>
                                    <td>${v.name}</td>
                                    <td class="role">${v.role}</td>
                                    <td class="points">${v.points}</td>
                                    <td>
                                        <button class="btn1 btn btn-primary" data-status="0" data-userid=${v.uid}>修改</button>
                                    </td>
                                </tr>`)
        })
        $('.btn1').click(function () {
            let status = $(this).attr('data-status')
            let points = $(this).parent().parent().children('.points')
            let role = $(this).parent().parent().children('.role')
            let p
            let r
            if (status == 0) {
                status = 1
                $(this).html('保存').attr({
                    'class': 'btn btn-warning btn1 text-white',
                    'data-status': status
                })
                p = points.text()
                r = role.text()
                p = `<input type="text" value=${p} class="text-center">`
                r = `<input type="text" value=${r} class="text-center">`
            } else {
                status = 0
                $(this).html('修改').attr({
                    'class': 'btn1 btn btn-primary',
                    'data-status': status
                })
                p = $(points).children().val()
                r = $(role).children().val()
                let uid = $(this).attr('data-userid')
                // 将数据传入数据库
                $.ajax({
                    url: 'http://127.0.0.1:2333/api/role',
                    type: 'post',
                    data: {
                        point: p,
                        role: r,
                        uid: uid
                    },
                    success: (data) => {
                        console.log(data);
                    }
                })
            }
            points.html(p)
            role.html(r)
        })
        $('td').each(function (k, v) {
            let cla = $(this).attr('class') + ' align-middle'
            $(this).attr('class', cla)
        })
    }
})
score()
function score() {
    $.ajax({
        url: "http://127.0.0.1:2333/api/buy",//请求地址
        type: "get",//请求方式
        data: {},
        dataType: "json",
        success: function (data) {//请求成功回调
            console.log(data.data.length);
            $.each(data.data, function (k, v) {
                $("#tbody2").append(`<tr><td>${k + 1}</td><td>${v.title}</td><td>${v.point}</td><td><button type="button" class="btn btn-primary">修改</button></td></tr>
        `)
            })
        }
    })
}