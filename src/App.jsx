import React, { useState } from "react";
import "./styles.css";
import CSVReader from 'react-csv-reader';
import CsvDownloader from 'react-csv-downloader';
import BarCode from 'react-barcode';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";


export default () => {


  const [csvdata, setCsvData] = useState([{}]);
  const [csvdatah, setCsvDatah] = useState([{}]);
  const [site, setSite] = useState("");
  const [print, setPrint] = useState(false);
  const [exportCsv, setexportCsv] = useState(false);
  const [type, setType] = useState(1);

  let Types = [
    { id: 0, name: 'Todos'},
    { id: 1, name: 'Slim'},
    { id: 2, name: 'Tradicional' },
    { id: 3, name: 'Chemise' },
    { id: 4, name: 'Saídas ibiza' },
  ];
  

  function adequanome(elemento) {
    let nome = elemento;
    if(nome.length > 17) {
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
    setCsvDatah(data[0]);
    data.splice(0, 1);
    data.map((element, index) => {
    setSite("www.somarquinha.com.br")
    let name = element[0];
    let size = element[4];
    let i = 1;
    let cond = false;    
      if( type.id === 0 ) { cond = name.includes('slim') || name.includes('tradicional') || name.includes('chemise') || name.includes('ibiza') }
      else if ( type.id === 1 ) { cond = name.includes('slim') }
      else if ( type.id === 2 ) { cond =  name.includes('tradicional') }
      else if ( type.id === 3 ) { cond =  name.includes('chemise') }
      else if ( type.id === 4 ) { cond = name.includes('ibiza')  }      
      else { cond = name.includes('slim') || name.includes('tradicional') || name.includes('chemise') || name.includes('ibiza') }

        if (cond) {
            if(name.length > 17) { data[index][0] = adequanome(name); }
            if (element[15] > 0) {
              for (i == 1; i < element[15]; i++) {
                data.push(element);
              }
            } else {  
              delete data[index];
            }
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
                <div className="row">
                  <div className="size">{value[4]}</div>
                  <div className="model">{value[0]}</div>
                  <div className="site">{site}</div>
                </div>
            </div>
         
        ))}               
       </div>
      <div className="container">
      <Combobox focusFirstItem='true' data={Types} placeholder="Escolha o tipo"
        dataKey='id' textField='name' onChange={value => setType(value)}/>
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
