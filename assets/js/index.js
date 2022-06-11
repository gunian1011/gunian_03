$(function () {
    // 调用getUserInfo获取用户信息
    getUserInfo()

    var layer = layui.layer
    // 点击按钮 实现退出
    $("#btnLogout").on('click', function () {
        // 提示用户是否退出
        layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的 token
            localStorage.removeItem('token')
            // 从新跳转到登录界面
            location.href = '/后台管理/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })
})


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染头像
            renderAvatar(res.data)
        },
        // 不管成功还是失败都会调用 complete函数
        // complete: function (res) {
        //     // 在complete回调函数中 可以使用res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.
        //         message === '身份认证失败！') {
        //         // 强制清空 token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面
        //         location.href = '/后台管理/login.html'
        //     }
        // }
    })

}

function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}