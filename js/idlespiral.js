
function changeEditorIdleSpiral ( ) {
  var editor = document.getElementById('editor')
  editor.innerHTML = ''

  var input = addTextarea(editor)
  addDivider(editor, "Split on #")
  var columns = addColumns(editor, 3)
  var splitcells = []
  var decryptedcells = []
  for ( let i = 0; i < 3; ++i ) {
    splitcells.push(addTextarea(columns[i], true))
    addDivider(columns[i], "AES-CBC", "(key = 0901f87d5725efde4e4ae88cc197230b, iv = 14ce63b855acd907c451a1777e592457)")
    decryptedcells.push(addTextarea(columns[i]))
  }

  input.oninput = function ( ) {
    const split = input.value.split('#')
    for ( let i = 0; i < 3; ++i ) {
      splitcells[i].value = split[i]
      var cell = ''
      try {
        cell = CryptoJS.AES.decrypt(split[i], CryptoJS.enc.Hex.parse("0901f87d5725efde4e4ae88cc197230b"), { iv: CryptoJS.enc.Hex.parse("14ce63b855acd907c451a1777e592457"), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8)
      } catch ( e ) {
        cell = e.toString()
      }
      decryptedcells[i].value = cell
    }
  }
  for ( let i = 0; i < 3; ++i ) {
    decryptedcells[i].oninput = function ( ) {
      var cell = ''
      try {
        cell = CryptoJS.AES.encrypt(decryptedcells[i].value, CryptoJS.enc.Hex.parse("0901f87d5725efde4e4ae88cc197230b"), { iv: CryptoJS.enc.Hex.parse("14ce63b855acd907c451a1777e592457"), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
      } catch ( e ) {
        cell = e.toString()
      }
      splitcells[i].value = cell
      input.value = splitcells.map( (x) => x.value ).join('#')
    }
  }
}
