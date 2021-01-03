$(function () {
  let layer = layui.layer
  initAddList()
  let indexAdd = null
  //   添加分类
  $('#btnAdd').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#addArt').html(),
    })
  })
  //   事件委托 监听添加表单的提交时间
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initAddList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      },
    })
  })
  //   修改分类
  let indexEdit = null
  let form = layui.form
  $('tbody').on('click', '.editArt', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#editArt').html(),
    })
    let id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('editForm', res.data)
      },
    })
  })
  //   监听修改提交事件
  $('body').on('submit', '#editForm', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        layer.close(indexEdit)
        initAddList()
      },
    })
  })
//   删除事件
  $('tbody').on('click', '#btn-delete', function() {
    let id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initAddList()
        }
      })
    })
  })
  //   获取列表 渲染页面
  function initAddList() {
    $.ajax({
      type: 'GET', //默认get
      url: '/my/article/cates', //默认当前页
      success: function (res) {
        //请求成功回调
        // console.log(res)
        let htmlStr = template('tbody', res)
        $('tbody').html(htmlStr)
      },
      error: function (e) {
        //请求超时回调
        if (e.statusText == 'timeout') {
          alert('请求超时')
        }
      },
    })
  }
})
