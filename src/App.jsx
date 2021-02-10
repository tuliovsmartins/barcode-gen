import React, { useState } from "react";
import "./styles.css";
import CSVReader from 'react-csv-reader';
import CsvDownloader from 'react-csv-downloader';
import BarCode from 'react-barcode';


export default () => {


  const [csvdata, setCsvData] = useState([{}]);
  const [csvdatah, setCsvDatah] = useState([{}]);
  const [site, setSite] = useState("");
  const [print, setPrint] = useState(false);
  const [exportCsv, setexportCsv] = useState(false);

  function adequanome(elemento) {
    let nome = elemento.replace(/[eiu]/gi,'');
    if(nome.legth > 30) {
      nome = nome.replace(/[o]/gi,'');
    }
    return nome;
  }

  function ajustaValores(valor){
    if (valor < 100) {
      valor = parseFloat(valor).toFixed(2);
      return 0 + valor;
    } else {
      valor = parseFloat(valor).toFixed(2);
      return valor;
    }
  }
  
  function handleForce(data, fileinfo) {
    let barcode;
    setCsvDatah(data[0]);
    data.splice(0, 1);
    data.map((element, index) => {
    setSite("www.rivieramodapraia.com.br")
    if (element[10] === "" || element[10] === undefined) {
        if(element[9] === undefined) { element[9] = "0.0" }
        element[9] = ajustaValores(element[9]);
        if(element[0].length > 30) { data[index][0] = adequanome(element[0]); }
        barcode = "789" + element[9].replace(".","") + element[29];
        data[index][17] = barcode;
    } else {
        element[10] = ajustaValores(element[10]);
        if(element[0].length > 30) { data[index][0] = adequanome(element[0])}
        barcode = "789" + element[10].replace(".","") + element[29];
        data[index][17] = barcode;
      }
  });
  setCsvData(data);
  setPrint(true);
  setexportCsv(true);
}

  return (
    <div>
      <div id='paper' className="paper">
        {
        csvdata.map((value, index)=> (
          <div key={index} className="stick">
             <BarCode width={1} height={40} fontSize={10} value={value[17]}/>
             <span className="size">{value[4]}</span>
             <div className="model">{value[0]}</div>
             <div className="site">{site}</div>
          </div>
        ))}               
      </div>
      <div className="container">
        <CSVReader onDrop={handleForce} parserOptions={{header: false, fileEncoding: 'UTF-8'}} onFileLoaded={handleForce} cssClass="react-csv-input" label="Encontre o csv exportado no site" />
        {
        exportCsv ? <CsvDownloader columns={csvdatah} datas={csvdata} 
            filename={'ProdutosEnriquecidos'} className="exportCsv"separator=";"
            text="Exportar CSV enriquecido" >
          </CsvDownloader> : null
        }
        {
          print ? <div className="printDoc" >
            <button onClick={() => window.print()}>Imprimir Etiquetas</button>
          </div> : null
        }
        
    </div>
    </div>  
  );
}
