var id = getUrlParam('id')
var docid = getUrlParam('uid')
var name = null
$("#iframe").html(`<iframe src="../file/${id}.pdf" frameborder="0" width="80%" height="600px" style="margin-left: 10%;"></iframe>`)
$.ajax({
    url: 'http://127.0.0.1:2333/api/header',
    type: 'get',
    data: {
        uid: id
    },
    success: (data) => {
        name = data.data[0].name
    }
})
$.ajax({
    url: "http://127.0.0.1:2333/api/zhuanjia",//请求地址
    type: "get",//请求方式
    data: {
        docid: docid,
    },
    dataType: "json",
    success: function (data) {//请求成功回调
        $("#sp").html(data.data[0].title)
    }
})
$.ajax({
    url: 'http://127.0.0.1:2333/api/stand',
    type: 'get',
    success: (data) => {
        let arr = new Array()
        let arr1 = []
        let arr3 = new Array()
        $.each(data.data[0], (k, v) => {
            if (isNaN(v)) {
                arr.push(v)
            } else {
                arr1.push(v)
            }
        })
        $.each(arr, (k, v) => {
            arr3.push(arr[k] + '(' + arr1[k] * 100 + '%)')
        })
        // 渲染页面
        let num = 1
        $.each(arr3, (k, v) => {
            let uname = 'score'
            uname = uname + num
            $('table tbody').append(`<tr><td class="text-right">${v}:</td>
                                <td><span>1分</span><input type="radio" name=${uname} data-score=1></td>
                                <td><span>2分</span><input type="radio" name=${uname} data-score=2></td>
                                <td><span>3分</span><input type="radio" name=${uname} data-score=3></td>
                                <td><span>4分</span><input type="radio" name=${uname} data-score=4></td>
                                <td><span>5分</span><input type="radio" name=${uname} data-score=5></td>
                                <td><span>6分</span><input type="radio" name=${uname} data-score=6></td>
                                <td><span>7分</span><input type="radio" name=${uname} data-score=7></td>
                                <td><span>8分</span><input type="radio" name=${uname} data-score=8></td>
                                <td><span>9分</span><input type="radio" name=${uname} data-score=9></td>
                                <td><span>10分</span><input type="radio" name=${uname} data-score=10></td></tr>`); num++
        })
        $('table tbody').append(`<tr class="text-right"><td>评审意见:</td><td colspan="10"><textarea class="w-100 comment" name="" id="" cols="30" rows="5"></textarea></td></tr>`)
        // 点击后，将所有信息传到后台
        $('.submit').click(() => {
            // 用于存储所选信息
            let score = {}
            $('tr').each(function (k, v) {
                $(this).find('input').each(function (m, n) {
                    // 判断表单的值是否为true
                    if ($(n).prop('checked')) {
                        score['p' + (k + 1)] = $(this).attr('data-score')
                    }
                })
            })
            var st = $('.comment').val()
            score.comment = toString(st)
            // 对象中有6个属性 此时可以提交
            if (Object.keys(score).length != 6) {
                alert('请填写完整')
                return
            }
            // 遍历求总分
            let totalscore = 0
            $.each(score, (k, v) => {
                if (!isNaN(v)) {
                    totalscore += v * 0.2
                }
            })
            // 将数据传入后台
            $.ajax({
                url: 'http://127.0.0.1:2333/api/score',
                type: 'post',
                data: {
                    p1: score.p1,
                    p2: score.p2,
                    p3: score.p3,
                    p4: score.p4,
                    p5: score.p5,
                    comment: score.comment,
                    docid: docid,
                    point: totalscore,
                    review: name
                },
                success: (data) => {
                    if (data.code == 200) {
                        alert('评分提交成功，将返回列表')
                        setTimeout(() => {
                            location.href = `zhuanjia.html?id=${id}`
                        }, 1000)
                    }
                }
            })
        })
    }
})
// 点击提交
$('.submit').click(() => { var score = {} })
// 浏览器截取参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = parent.location.search.substr(1).match(reg);
    var strValue = null;
    if (r != null) {
        strValue = unescape(r[2]);
    }
    return strValue;
}
$("#b").click(function () {
    history.back()
})