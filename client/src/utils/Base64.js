
 export const Base64=(base64String)=> {
     try {
         let sliceSize = 1024;
         let byteCharacters = atob(base64String);
         let bytesLength = byteCharacters.length;
         let slicesCount = Math.ceil(bytesLength / sliceSize);
         let byteArrays = new Array(slicesCount);

         for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
             let begin = sliceIndex * sliceSize;
             let end = Math.min(begin + sliceSize, bytesLength);

             let bytes = new Array(end - begin);
             for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                 bytes[i] = byteCharacters[offset].charCodeAt(0);
             }
             byteArrays[sliceIndex] = new Uint8Array(bytes);
         }
         return byteArrays;
     } catch (e) {
         // console.log("Couldn't convert to byte array: " + e);
         return undefined;
     }
 }


 //  export  const imgBase64ToBlob = (dataURI)=> {
 //     const splitDataURI = dataURI.split(',')
 //     const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
 //     const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
 //
 //     const ia = new Uint8Array(byteString.length)
 //     for (let i = 0; i < byteString.length; i++)
 //         ia[i] = byteString.charCodeAt(i)
 //
 //     return new Blob([ia], { type: mimeString })
 // }