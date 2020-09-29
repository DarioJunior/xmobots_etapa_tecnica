//Variável final de coordenada
var latMarcador = [];
var longMarcador = [];

// Vai Carregar no Onload() do body
function init(){
    // Adiciona escuta de evento change
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

  //Evento de selecionar o arquivo
  function handleFileSelect(event){
    const reader = new FileReader() //
    reader.onload = handleFileLoad; // quando carregar, chama o evendo FileLoad
    reader.readAsText(event.target.files[0])  // cria o atributo result com o texto
  }
  
  function handleFileLoad(event){
          var conteudoArquivo = event.target.result; //se tiver texto no arquivo
      try {
          var conteudoArquivoObj = JSON.parse(conteudoArquivo); //Vai tratar o arquivo
      } catch (err) {  // Se o conteúdo não for JSON, dará o window.alert em vez de mostrar apenas no console
          alert("Erro ao importar o arquivo: \n\n"+err);
          return; //return para não seguir executando o restante dos códigos
      } 
    var arrayConteudo = conteudoArquivoObj["aerodromes"];
    var tabela = document.querySelector('#conteudo_tabela');
    var coordenadas = []; // criada para tratar valor de lat/long mais embaixo
     for (i = 0; i < arrayConteudo.length; i++){
        var row = tabela.insertRow(i); //funcão que automatiza criação de linhas da tabela
        var linha = arrayConteudo[i]; 
        const objectArray = Object.entries(linha); // = acessar o Objeto para poder quebrar em chave/valor
        var coluna = 0;
        
        objectArray.forEach(([key, value]) => {
            var celula = row.insertCell(coluna);
            if (key == 'description'){ // if para tratar apenas o campo description e
                var strQuebra = quebraString(value);// selecionar apenas as coordenadas para tratar cada uma
                coordenadas.push(strQuebra); 
                celula.innerHTML = strQuebra;     
            } else if (key == 'runways'){ // if para tratar apenas o campo runways e pegar apenas o valor do comprimento
                var qtdPista = value.length;
                celula.innerHTML = qtdPista;  
                console.log(qtdPista);
            }  
            else {
            celula.innerHTML = value;
            }
            coluna++;
      });
     }
    
    lat = trataCoordLat(coordenadas);
    long = trataCoordLong(coordenadas);
       
    for(i=0; i < coordenadas.length; i++){
        converteDMS(lat[i], long[i]); // chamada da função que vai converter h/m/s em lat/long
        marcadores(latMarcador[i], longMarcador[i]); // função que vai jogar as coordenadas no mapa
    }

    // função que vai pegar apenas xxxxxxxS/xxxxxxxW
  function quebraString(descricao) {
    var str = descricao;
    var C = str.indexOf("COORD")+6; // localizar tudo apartir da string COORD +6 casas
    var W = str.indexOf("W", C)+1; // até o final das coordenadas que terminam com W
    var coord = str.substr(C, W-C); 
     return coord;    
}

//função que vai tratar xxxxxxxS/xxxxxxxW retirar /S e W e também ','
function trataCoordLat(coordenadas){//que na sintaxe não são float para calcular
    var lat=[];
    var str= coordenadas;
    for(i=0; i < str.length; i++ ) {   
        var fimS = str[i].indexOf("S/"); 
        var latitude = str[i].substr(0, fimS);
        if(latitude.includes(",")){// Tratando as vírgulas, substituindo por ponto        
            var latitude = latitude.replace(",", ".");
        //    console.log(latitude);
        }
        lat.push(latitude); //vai coocar no array lat
    }
    return lat;//retornar os numeros de S
}

function trataCoordLong(coordenadas){
    var long=[];
    var str= coordenadas;
    for(i=0; i < str.length; i++ ) {
        var inicioW= str[i].indexOf("/")+2;
        var fimW = str[i].indexOf("W");
        var longitude = str[i].substr(inicioW, fimW-inicioW);
        if(longitude.includes(",")){// Tratando as vírgulas, substituindo por ponto
            var longitude = longitude.replace(",", ".");
        //   console.log(longitude);
        }
        long.push(longitude); //vai colocar no array long
    }
    return long;//retornar os numeros de W
}

// Conversor de h/m/s para LAT/LONG para passar p função marcadores()
function converteDMS(lat, long){

    var coorLat = lat;
    var coorLong = long;
    // LATITUDE
    var minLat = coorLat.substr(2, 2)*60;
    //console.log(minLat);
    var segLat = parseFloat(coorLat.substr(4, 6)); // forçar a conversão para float
    //console.log(segLat);
    var segConv = (minLat+segLat) / 3600;
    //console.log(segConv);
    var hrsLat = parseInt(coorLat.substr(0, 2));
    var latTotal = (segConv+hrsLat) * -1; 
    latMarcador.push(latTotal); //passar para variavel global 

    // LONGITUDE 
    var minLong = coorLong.substr(2, 2)*60;
    //console.log(minLong);
    var segLong = parseFloat(coorLong.substr(4, 6));
    //console.log(segLong);
    var segConv = (minLong+segLong) / 3600;
    //console.log(segConv);
    var hrsLong = parseInt(coorLong.substr(0, 2));
    var LongTotal = (segConv+hrsLong) * -1; 
    longMarcador.push(LongTotal);//passar para variavel global 

        }  
    }
}

//função que vai jogar latitude e longitude no mapa
function marcadores(latitude, longitude){
    L.marker([
        latitude, longitude
    ]).addTo(mymap);

    L.circle([latitude, longitude], 5000, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2
    }).addTo(mymap).bindPopup("perímetro 5KM do marcador.");
}