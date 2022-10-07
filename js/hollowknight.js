
function changeEditorHollowKnight ( ) {
  var editor = document.getElementById('editor')
  editor.innerHTML = ''

  var load = addLoadButton(editor)
  var input = addTextarea(editor, true)
  addDivider(editor, "C# deserialize LengthPrefixedString")
  var csharp = addTextarea(editor, true)
  addDivider(editor, "AES-ECB", "(key = UKu52ePUBwetZ9wNX88o54dnfKRu0T1l)")
  var aesecb = addTextarea(editor)
  var save = addSaveButton(editor, "user.dat")

  load.onchange = async function ( e ) {
    var file = e.target.files[0]
    var text = await file.text()
    input.value = text

    text = text.slice(22, text.length - 1)
    var length = 0
    for ( let i = 0; i < 5; ++i ) {
      var char = text.charCodeAt(0) & 0xFF
      length += (char & 0x7f) << (i * 7)
      text = text.slice(1)
      if ( !(char & 0x80) )
        break
    }
    // Figure out why this length is incorrect
    csharp.value = text

    var cell = ''
    try {
      cell = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse("UKu52ePUBwetZ9wNX88o54dnfKRu0T1l"), { mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8)
    } catch ( e ) {
      cell = e.toString()
    }
    aesecb.value = cell
  }
  aesecb.oninput = function ( ) {
    var cell = ''
    try {
        cell = CryptoJS.AES.encrypt(aesecb.value, CryptoJS.enc.Utf8.parse("UKu52ePUBwetZ9wNX88o54dnfKRu0T1l"), { mode: CryptoJS.mode.ECB })
    } catch ( e ) {
        cell = e.toString()
    }
    csharp.value = cell

    var length = cell.length
    var lengthstring = ''
    while ( length > 0 ) {
      var char = length & 0x7f
      length >>= 7
      if ( length > 0 )
        char |= 0x80
      lengthstring += String.fromCharCode(char)
    }
    var csharpheader = [0, 1, 0, 0, 0, 255, 255, 255, 255, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 0].map( (x) => String.fromCharCode(x) ).join('')
    input.value = csharpheader + lengthstring + cell + '\11'
  }
  save.onclick = function ( ) {
    var blob = new Blob([input.value], {type: "text/plain;charset=utf-8"})
    var a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = "user.dat"
    a.click()
  }
}
