export function blobToArrayBuffer(blob) {
  return new Promise(function (resolve, reject) {
    var arrayBuffer;
    var fileReader = new FileReader();

    fileReader.onload = function (event) {
      arrayBuffer = event.target.result;
    };

    fileReader.onloadend = function (event) {
      return resolve(arrayBuffer);
    };

    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(blob);
  });
}
//# sourceMappingURL=binary.js.map