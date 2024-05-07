
export default function App(blob){
    /*  const base64String = btoa(String.fromCharCode.apply(null,blob.data))
     const imgBlob = `data:image/jpeg;base64,${base64String}`
     return imgBlob */
     const myBlob = new Uint8Array(blob.data)
     const imgBlob = new Blob([myBlob], {type: 'image/jpeg'}) 
     const urlCreator = window.URL || window.webkitURL
     const imgURL =urlCreator.createObjectURL(imgBlob)
     setTimeout(() => {
         URL.revokeObjectURL(imgBlob)
     }, 100);
     // URL.revokeObjectURL(imgBlob)
     return imgURL
 }

