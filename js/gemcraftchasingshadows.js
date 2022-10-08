

function changeEditorGemCraftChasingShadows ( ) {
  var editor = document.getElementById('editor')
  editor.innerHTML = ''

  var input = addTextarea(editor)
  addDivider(editor, "Checksum")
  var str = addTextarea(editor, true)
  addDivider(editor, "Base64")
  var base64 = addTextarea(editor, true)
  addDivider(editor, "zlib compression")
  var zlib = addTextarea(editor, true)
  addDivider(editor, "Custom compression")
  var custom = addTextarea(editor)

  input.oninput = function ( ) {
    var data = input.value.slice(0, input.value.length - 16)
    str.value = data

    data = atob(data)
    base64.value = data

    data = data.split('').map(function(x){return x.charCodeAt(0);});
    data = new Uint8Array(data);
    data = pako.inflate(data)
    data = String.fromCharCode.apply(null, new Uint16Array(data));
    zlib.value = data

    var COMPRESSED_STRS = [" ","!","#","$","%","&","(",")","*",".",":",";","<",">","@","[","]","_","{","|","}"]
    var UNCOMPRESSED_STRS = [",B",",C",",D",",E",",F",",G",",H",",I",",J",",K",",L",",M",",N",",O",",P",",Q",",R",",S",",T",",U",",V"]
    for (var i = 0; i < COMPRESSED_STRS.length; i++)
      data = data.replaceAll(COMPRESSED_STRS[i],UNCOMPRESSED_STRS[i])
    custom.value = data
  }
  custom.oninput = function ( ) {
    var data = custom.value

    var COMPRESSED_STRS = [" ","!","#","$","%","&","(",")","*",".",":",";","<",">","@","[","]","_","{","|","}"]
    var UNCOMPRESSED_STRS = [",B",",C",",D",",E",",F",",G",",H",",I",",J",",K",",L",",M",",N",",O",",P",",Q",",R",",S",",T",",U",",V"]
    for (var i = 0; i < COMPRESSED_STRS.length; i++)
      data = data.replaceAll(UNCOMPRESSED_STRS[i],COMPRESSED_STRS[i])
    zlib.value = data

    data = data.split('').map(function(x){return x.charCodeAt(0);});
    data = new Uint8Array(data);
    data = pako.deflate(data)
    data = String.fromCharCode.apply(null, new Uint16Array(data));
    base64.value = data

    data = btoa(data)
    str.value = data

    var vChkString = calculateChecksumGemCraftChasingShadows(data)
    input.value = data + vChkString
  }
}
function calculateChecksumGemCraftChasingShadows ( vStr ) {
  var i = 0
  var iLim = vStr.length
  var left = 29318441
  var right = 33264582
  for ( i = 0; i < iLim; ++i ) {
    left = left * (vStr.charCodeAt(i) + 78 + i * 111) % (94382918 - 105) + 28931 - 5
    right = right * (vStr.charCodeAt(i) + 122 + i * 111) % (90542157 - 105) + 90542 - 5
  }
  left = left % 89999999 + 10000000
  right = right % 89999999 + 10000000
  right = Math.round(Math.abs(right))
  left = Math.round(Math.abs(left))

  return left + "" + right
}
