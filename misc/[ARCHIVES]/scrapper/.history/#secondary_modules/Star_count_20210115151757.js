async function star_count(page) {
  async function ite(path) {
    try {
      const starclass = await page.$eval(path, el => el.className)
      sc = starclass.trim().split(/ +/g)[0]
      console.log("class of star: "+sc)
      return sc
    } catch (err) {
      console.log("Error:\n"+ err);
      return "err";
    }
  }

  i = 1;
  stars=[]
  level=''
  while (i <= 5) {
    path="#star"+i.toString()
    
    console.log("");
    console.log("path: "+path);
    console.log("typeof(path): "+typeof(path));
    
    await ite(path).then((numb) => {
      stars.push(numb)
    })
    console.log("stars: "+stars);
    console.log("--");
    i += 1;
  }

  for (i in stars){
    console.log(stars[i])
    if (i>0){
      if (stars[i] != stars[i-1]){
        order=5-i
        if (stars[i]== 1){
          rank="bronze"
        }
        if (stars[i]== 2){
          rank="silver"
        }
        if (stars[i]== 3){
          rank="gold"
        }
        level=order.toString()+" "+rank
      }
    }
  }
  console.log("level: "+level)


}
module.exports = { star_count };
