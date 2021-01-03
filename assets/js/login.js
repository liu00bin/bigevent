$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  let form = layui.form
  let layer = layui.layer
  let url = ''
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码为6到12位，且不能出现空格！'],
    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val()
      if (value !== pwd) {
        return '两次输入密码不对！'
      }
    },
  })
  // 注册
  $('#form_reg').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST', //默认get
      url: '/api/reguser', //默认当前页
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      }, //格式{key:value}
      dataType: 'json',
      success: function (res) {
        //请求成功回调
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功!')
        $('#link_login').click()
      },
      error: function (e) {
        //请求超时回调
        if (e.statusText == 'timeout') {
          alert('请求超时')
        }
      },
    })
  })
  // 登录
  $('#form_login').submit(function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
      type: 'POST', //默认get
      url: '/api/login', //默认当前页
      data: data, //格式{key:value}
      dataType: 'json',
      success: function (res) {
        //请求成功回调
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        localStorage.setItem('token', res.token)
        window.location.href = '/index.html'
      },
      error: function (e) {
        //请求超时回调
        if (e.statusText == 'timeout') {
          alert('请求超时')
        }
      },
    })
  })
})
