const DATE_OPTION = { year: 'numeric', month: 'numeric', day: 'numeric'}
export default function App(){
    let today = new Date();
    console.log("tolcacateDateString: ", today.toISOString().slice(0,10))
    return today.toISOString().slice(0,10)
    // return today.toLocaleString('en-US', DATE_OPTION)
    //return ((today.get + 1) + "-" + today.getDate() + "-" + today.getFullYear())
    // return new Date().toLocaleString()
}