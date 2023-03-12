export default async function enfazla()
{
    
  let sonuc=await fetch("./iller.json")
  
  return sonuc.json()
}
