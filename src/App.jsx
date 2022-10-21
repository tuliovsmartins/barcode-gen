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
    let nome = elemento;
    if(nome) {
      nome = nome.replace('marquinha-','mrq ');
      nome = nome.replace('biquini-','bqn ');
      nome = nome.replace('-',' ');
      nome = nome.replace(/[ou]/gi,'');
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
    console.log('iniciei o handle')
    setCsvDatah(data[0]);
    data.splice(0, 1);
    data.map((element, index) => {
    setSite("www.rivieramodapraia.com.br")
    let name = element[0];
    let size = element[4];
    if (name.includes('slim') || name.includes('tradicional') || name.includes('chemise') ) {
        if(name.length > 17) { data[index][0] = adequanome(name); }
    }  else {
        delete data[index];
      }
      if (size === 'undefined' || size == "") {
        delete data[index];
    }
    name = "";
    size = "";
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
