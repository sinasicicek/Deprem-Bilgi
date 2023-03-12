//import { bildirimGönder } from "./notific.js";
//import sehir from "./sehirFiltre.js";
//import { bildirim } from "./notific.js";

import enfazla from "./depremsaati.js";

const apiAdresi = "https://api.orhanaydogdu.com.tr";
const live = "/deprem/kandilli/live";
const archive = "/deprem/kandilli/archive";
let depremil=[]
let iller=[]
let tarihsaat=[]
let ilkSaat=null
/*OLŞTURULAN HTML ELEMENTLERİ İÇİN ANA DİV */
const conta = document.querySelector(".container");

/*API DOSYASI ASYNC */
async function getir(kac, sorgu_tipi = "/deprem/kandilli/live") {
  let kac_adet = apiAdresi;
  const geti = await fetch(`${kac_adet + sorgu_tipi}`);
enfazla()
  return await geti.json();
}

/*HTML NESNESİ OLUŞTURMAK İÇİN */
function Created(veri) {
  return document.createElement(veri);
}

/*HTML NESNELERİ BİRLEŞTİRİLİYOR */
function obj_build(...params) {
  let div = document.createElement("div");
  let siddet_no = Number(params[2]);
  let sinif = ["items", "brdr"];
  div.classList.add(...sinif);

  let konumName = Created("a");
  konumName.setAttribute("href", params[3]);
  konumName.setAttribute("target", "_blank");
  konumName.textContent = "Konum";
  konumName.classList.add("konumLi");
  konumName.classList.add("btn-primary");
  konumName.classList.add("btn");

  let str = Created("h3");
  str.textContent = params[1];

  let h5 = Created("h5");
  h5.textContent = params[0];

  let span = Created("span");
  if (siddet_no > 4) {
    span.classList.add("span-red");
   // bildirimGönder(params[0], params[1], siddet_no);

   
    /*span.classList.add("sala")
       div.classList.add("sala")*/
  }
  span.textContent = params[2];


 
  const spanDerinlik=Created("h4")
  spanDerinlik.classList.add("derinlikH4")
  spanDerinlik.innerText="Derinlik :"+params[4]+" km"
  if(params[4] <4){spanDerinlik.classList.add("span-red")}

//div-span eklendi
  const divSpan=Created("div")
  divSpan.classList.add("d-flex-row")
  divSpan.classList.add("newUiSiddet")
  
  divSpan.appendChild(span)
//h3-h5 eklendi
const divBilgiler=Created("div")
divBilgiler.classList.add("d-flex-col")
divBilgiler.appendChild(str)
divBilgiler.appendChild(h5)
divBilgiler.appendChild(spanDerinlik)
divSpan.appendChild(konumName)

let eklenecek = [ divSpan,divBilgiler ];
  eklenecek.forEach((ekle) => {
    div.appendChild(ekle);
  });
  
  return div;
}

const sayiToplam = 0;
/*EKRANDA KAÇ ADET DEPREM GÖSTERİLECEGİ FİLTRESİ */
function depremAdeti() {
  const div = Created("div");
  div.id = "depremAdeti";

  const input = Created("input");
  input.type = "number";
  input.id = "inputdepremnumber";
  input.classList.add("input_deprem");
  input.classList.add("form-control")
  input.setAttribute("placeholder","Kac Adet Deprem Gösterilsin")
  div.appendChild(input);

  const btn = Created("button");
  btn.innerHTML = "Getir";
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
  btn.classList.add("adet_btn");

  btn.addEventListener("click", () => {
    const sayi_kaci = document.getElementById("inputdepremnumber");

    if (sayi_kaci.value != null) {
      conta.innerHTML = "";
      basla(sayi_kaci.value, archive);
      console.log(sayi_kaci.value);
    } else {
      alert("Lütfen Sayi giriniz");
    }
  });

  div.appendChild(btn);

  return div;
}

/*API GELEN VERİLER */
function basla(kac_adet = 100, sorgu_tipi = live) {
 
  let bc = getir(kac_adet, sorgu_tipi);
  console.log(kac_adet + " " + sorgu_tipi);
  /*deprem adeti func cagır */
  const adet = depremAdeti();
  const baslik = Created("h1");
  baslik.innerHTML = "Sondan başa dogru kaç adet deprem gösterilsin";
  baslik.classList.add("baslik_deprem");
  
  const altbaslik = Created("h1");
  altbaslik.innerHTML = "* Şuan da " + kac_adet + " adet Deprem Gösteriliyor *";
  altbaslik.classList.add("baslik_deprem");
  altbaslik.id="baslikD"

  const br = Created("br");

  conta.appendChild(baslik);
  conta.appendChild(altbaslik);
  conta.appendChild(adet);
  conta.appendChild(br);

  const divConta=Created("div")


  bc.then((geldi) => {
    for (const key in geldi) {
      //archive sorgusu için doguye sokularak kaca adet cekilecegi belirleniyor

      if (Object.hasOwnProperty.call(geldi, key)) {
        const element = geldi[key];
        // console.log(geldi[key].length);
        for (let index = 0; index < kac_adet; index++) {
          const eleman = element[index];
          if (eleman === undefined) {
          } else {
            /*Json verileri  */
            
            let tarih = eleman["date"];
            let lokasyon = eleman["title"];
            let siddet = eleman["mag"];
            let konumArray = eleman["geojson"];
            let derinlik=eleman["depth"]
            let sehir=eleman["location_properties"]["closestCity"]["name"]
           
            depremil.push(sehir)
            tarihsaat.push(tarih)
              /*sehir arama alanı burada */

            // console.log(tarih+" "+lokasyon+" "+siddet+" "+konumArray.coordinates[0]);
            let konum =
              "https://www.google.com/maps/place/" +
              konumArray.coordinates[1] +
              "+" +
              konumArray.coordinates[0];
            if (
              tarih != null &&
              lokasyon != null &&
              siddet != null &&
              konum != null
            ) {
              let data = obj_build(tarih, lokasyon, siddet, konum,derinlik);

              divConta.appendChild(data)
              divConta.classList.add("d-flex-row")
              conta.appendChild(divConta)



            } 
           
          }
          
          ilkSaat=tarihsaat[kac_adet-1]


        }
      }
    } 
    htmlDepremEkle()
   
  }
 
  );



}

/** */

function depremSayisi() {

   function removeDuplicates() {
        return depremil.filter((item,index) => depremil.indexOf(item) === index);
    }
    let son=null
    let text=Created("span")
    const ul=Created("ul")
    
    
    const kısa=removeDuplicates()
    kısa.forEach(elem=>{
     const li=Created("li")
     son=depremil.filter(elemen=>elemen==elem)
      console.log(son[0]+" "+son.length+" "+tarihsaat[0].substring(10,16));
      li.innerText=son[0]+" ("+son.length+" adet)"
      if (son.length > 5) {
        li.classList.add("li-red")
      }
      ul.appendChild(li)
    })

    depremil=[]
    iller=[]
    
    const eklemeAlanıNumber=document.getElementById("depremNumber")
    eklemeAlanıNumber.appendChild(ul)
  

}
function htmlDepremEkle() {
const ekl=document.getElementById("baslikD")
const depremdiv=Created("div")
depremdiv.innerHTML= `<p>
<a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
  Deprem Sayıları
</a>
</p>
<div class="collapse" id="collapseExample">
<div class="card card-body" id="depremNumber">
  <h5>  ${ilkSaat.substring(10,16)} ile ${tarihsaat[0].substring(10,16)} saatleri arasında olan Depremler</h5>
</div>
</div>`

 ekl.appendChild(depremdiv)
 depremSayisi()
}
basla();
/*HER 6 SANİYEDE SAYFA YENİLENİYOR */
setInterval(() => {
  conta.innerHTML = "";
  basla();
 
}, 60000);

