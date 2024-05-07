
export default function App (rows) {
    const array = rows

    let newArr = array.map( (each) => {
        console.log(">>data from Addkey..")
        console.log(each, ' ', Object.keys(each), ' ', Object.values(each))
        let key = Object.keys(each)
        let valArr = Object.values(each)
        valArr.unshift(key[0])
        // console.log("newArray : ", valArr)
        let newObj = {}
        newObj[key[0]] = valArr
        // console.log("neObje ", newObj)
        return newObj
    })
    console.log(newArr)
    return newArr
};



