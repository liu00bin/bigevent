$(function () {
  getUserInfo()
  let layer = layui.layer
  $('#btn').on('click', function () {
    layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index)
    })
  })
})
function getUserInfo() {
  $.ajax({
    type: 'GET', //默认get
    url: '/my/userinfo', //默认当前页
    // dataType: 'json',
    success: function (res) {
      // console.log(res, 2)
      res.data && renderAvater(res.data)
      //请求成功回调
    },
    //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置
  })
}

function renderAvater(user) {
  let name = user.nickname || user.username
  //   console.log(name);
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
