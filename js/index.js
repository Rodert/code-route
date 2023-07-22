/*
 * @Author: JavaPub
 * @Date: 2023-07-22 09:07:42
 * @LastEditors: your name
 * @LastEditTime: 2023-07-22 09:18:03
 * @Description: Here is the JavaPub code base. Search JavaPub on the whole web.
 * @FilePath: \code-route\js\index.js
 */
;(function(win) {
    function isFunction(functionToCheck) {
     return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
    }
  
    win.EditOnGithubPlugin = {}
  
    function create(docBase, docEditBase, title) {
      title = title || '主页'
      docEditBase = docEditBase || docBase.replace(/\/blob\//, '/edit/')
  
      function editDoc(event, vm) {
        var docName = vm.route.file
  
        if (docName) {
          var editLink = docEditBase + docName
          window.open(editLink)
          event.preventDefault()
          return false
        } else {
          return true
        }
      }
  
      win.EditOnGithubPlugin.editDoc = editDoc
  
      function generateHeader(title) {
        return header = [
          '<div style="overflow: auto">',
          '<p style="float: right"><a style="text-decoration: underline; cursor: pointer"',
          'onclick="EditOnGithubPlugin.onClick(event)">',
          title,
          '</a></p>',
          '</div>'
        ].join('')
      }
  
      return function(hook, vm) {
        win.EditOnGithubPlugin.onClick = function(event) {
          EditOnGithubPlugin.editDoc(event, vm)
        }
  
        if (isFunction(title)) {
  
          hook.afterEach(function (html) {
            return generateHeader(title(vm.route.file)) + html
          })
        } else {
          var header = generateHeader(title)
  
          hook.afterEach(function (html) {
            return header + html
          })
        }
  
  
      }
    }
  
    win.EditOnGithubPlugin.create = create
  }) (window)
  