
function changeEditorIdleResearch ( ) {
    var editor = document.getElementById('editor')
    editor.innerHTML = ''

    var input = addTextarea(editor)
    addDivider(editor, "AES-CBC", "(key = \"658d5bfe2d3ec1e6f010cd9eed81208ba0c04a20dbae12b85f471a0be1ec22c8\", iv = \"313472756b6c38393366686a6c397235\")")
    var decrypted = addTextarea(editor)

    input.oninput = function ( ) {
      var cell = ''
      try {
        cell = CryptoJS.AES.decrypt(input.value, CryptoJS.enc.Hex.parse("658d5bfe2d3ec1e6f010cd9eed81208ba0c04a20dbae12b85f471a0be1ec22c8"), { iv: CryptoJS.enc.Hex.parse("313472756b6c38393366686a6c397235"), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8)
      } catch ( e ) {
        cell = e.toString()
      }
      decrypted.value = cell
    }
    decrypted.oninput = function ( ) {
      var cell = ''
      try {
        cell = CryptoJS.AES.encrypt(decrypted.value, CryptoJS.enc.Hex.parse("658d5bfe2d3ec1e6f010cd9eed81208ba0c04a20dbae12b85f471a0be1ec22c8"), { iv: CryptoJS.enc.Hex.parse("313472756b6c38393366686a6c397235"), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
      } catch ( e ) {
        cell = e.toString()
      }
      input.value = cell
    }
  }
