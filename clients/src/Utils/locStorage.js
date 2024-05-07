
const removeLocalCDMList = () => {
    localStorage.removeItem("cdm"); //from CDMList
    localStorage.removeItem("pages"); //CDMList.js
    localStorage.removeItem("pageindex");
    // localStorage.removeItem("tfl"); //from Table_TFList
}

const removeLocalTFL = () => {
    console.log("remove local TFL")
    localStorage.removeItem("tfl"); //from Table_TFList
    localStorage.removeItem("tflpages"); //CDMList.js
    localStorage.removeItem("tflpageindex");
}

const removeLocalWOList = () => {
    localStorage.removeItem("wo_list"); //from CDMList
    localStorage.removeItem("wo_pages"); //CDMList.js
    localStorage.removeItem("wo_pageindex");
}
module.exports = { removeLocalCDMList, removeLocalTFL, removeLocalWOList }