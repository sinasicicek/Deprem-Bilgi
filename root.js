const conta=document.querySelector(".container")
async function getir() {
    const geti=await fetch("https://api.orhanaydogdu.com.tr/deprem/live.php?limit=100");
    return await geti.json()


}
let sayi=0;
let bc=getir();
bc.then( geldi=>{
const ul=Created("ul");


   for (const key in geldi) {
      
       if (Object.hasOwnProperty.call(geldi, key)) {


           const element = geldi[key];
           console.log(geldi[key].length);
         
            for (let index = 0; index < element.length; index++) {
                const eleman = element[index];
                if(eleman === undefined){}
                else{
                 console.log(eleman["date"]);

                 let tarih=eleman["date"];
                 let lokasyon=eleman["lokasyon"]
                 let siddet=eleman["mag"]
                 const li=Created("li");

                 const h1=Created("h1")
                 h1.textContent="Tarih :"+tarih;
                 const hr=Created("hr")

                 const h2=Created("h2");
                 h2.textContent=lokasyon+"  "+"Deprem Siddeti: "+siddet
                 li.appendChild(h1)
                 li.appendChild(h2)
               
                li.appendChild(hr)
                 ul.appendChild(li);
                }
            }
         
          
       } 
       
   }

   conta.appendChild(ul)



})



function Created(veri){ return document.createElement(veri)

}