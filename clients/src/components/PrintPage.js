import { red } from "@material-ui/core/colors";
import React from "react";
import ReactToPrint from "react-to-print";
import Button from 'react-bootstrap/Button';

const PrintPage = (props) => {
    const divPrint = props.divRef
    const pageName = props.pageName
    const pageStyle =
    `
    @page {
        { size: A4 landscape; };
    }
  
    @media all {
      .pagebreak {
        display: none;
      }
    }
  
    @media print {
      .pagebreak {
        page-break-before: always;
      }
    }
  `;
    // const pageStyle = `@media print { @page {\ size: 'A4 landscape';\ }}`;
    // const pageStyle = `{ size: 2.5in 4in }`;
    return (
        <div>
            <ReactToPrint
                pageStyle={pageStyle}
                trigger={() => <Button variant="primary" >{pageName}!</Button>}
                //trigger={() => <Button variant="secondary" style={{height: "35px", backgroundColor: "green"}}>{pageName}!</Button>}
                content={() => divPrint.current}
            />
        </div>
    );
}

export default PrintPage;