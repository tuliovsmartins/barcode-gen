import React from 'react'
import CSVReader from 'react-csv-reader'
import App from './App'


export default props => {

    const handleForce = (data, fileInfo) => App(data, fileInfo);

    const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };


    return (
    <div className="container">
        <CSVReader cssClass="react-csv-input" label="Encontre o csv exportado no site" 
            onFileLoaded={handleForce} />
    </div>
    );
}