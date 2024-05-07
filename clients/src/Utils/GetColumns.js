export default getColumns = (props) => {
    const data = props.data
    const columns = [];
    const sample = data[0];
    Object.keys(sample).forEach(key => {
    if (key !== "_id") {
        columns.push({
        accessor: key,
        Header: key
        });
    }
    });
    return columns;
    }