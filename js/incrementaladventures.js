
function changeEditorIncrementalAdventures ( ) {
  var editor = document.getElementById('editor')
  editor.innerHTML = ''

  var input = addTextarea(editor)
  addDivider(editor, "AES-CBC", "(passphrase = \"gwFgN\")")
  var decrypted = addTextarea(editor)

  input.oninput = function ( ) {
    var cell = ''
    try {
      cell = CryptoJS.AES.decrypt(input.value, "gwFgN").toString(CryptoJS.enc.Utf8)
    } catch ( e ) {
      cell = e.toString()
    }
    decrypted.value = cell
  }
  decrypted.oninput = function ( ) {
    var cell = ''
    try {
      cell = CryptoJS.AES.encrypt(decrypted.value, "gwFgN")
    } catch ( e ) {
      cell = e.toString()
    }
    input.value = cell
  }
}
