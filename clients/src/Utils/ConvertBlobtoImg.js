export default function convertBlobtoImg (props) {
    const data = props
    const myBlob = new Uint8Array(data)
    const imgBlob = new Blob([myBlob], {type: 'image/jpeg'}) 
    const urlCreator = window.URL || window.webkitURL
    const imgURL =urlCreator.createObjectURL(imgBlob)
    setTimeout(() => {
        URL.revokeObjectURL(imgBlob)
    }, 100);
    // URL.revokeObjectURL(imgBlob)
    return imgURL
 }

