async function ite_mb(page,path) {
  try {
    const starclass = await page.$eval(path, (el) => el.className);
    sc = starclass.trim().split(/ +/g)[0];
    //console.log("class of star: "+sc)
    return sc;
  } catch (err) {
    console.log("Error:\n" + err);
    return "err";
  }
}

async function ite_cl(cl) {
  try {
    console.log('cl clean: '+cl)
    sc = cl.trim().split(/ +/g)[0];
    return sc;
  } catch (err) {
    console.log("Error:\n" + err);
    return "err";
  }
}

async function star_count_mb(page) {
  i = 1;
  stars = [];
  level = "";
  while (i <= 5) {
    path = "#star" + i.toString();
    //console.log("path: "+path);
    //console.log("typeof(path): "+typeof(path));
    await ite_mb(page,path).then((numb) => {
      stars.push(numb);
    });
    //console.log("stars: "+stars);
    i += 1;
  }
  for (i in stars) {
    if (i > 0) {
      if (stars[i] != stars[i - 1]) {
        order = 5 - i;
        if (stars[i] == 1) {
          rank = "bronze";
        }
        if (stars[i] == 2) {
          rank = "silver";
        }
        if (stars[i] == 3) {
          rank = "gold";
        }
        level = order.toString() + " " + rank;
      }
    }
  }
  console.log("level: " + level);
}

async function star_count_cl(cl) {
  i = 1;
  stars = [];
  level = "";
  console.log(cl)
  while (i < 6){
    console.log(i)
    i++
  }
  
 /* 
  while (i <= 5) {
    cl=cl.replace('            <span class="airlineStar ','')
    cl=cl.replace('"></span>','')
    //console.log("cl: "+cl[1])
    cl=cl.toString()
    //cl.split(/\r\n|[\n\r\u0085\u2028\u2029]/g)
    a=17
    console.log('text: '+cl[i])
    console.log('Character: '+cl[a])
    console.log('Unicode: '+cl.charCodeAt(a))

    //console.log("cl: "+cl);
    //console.log("typeof(cl): "+typeof(cl));
    //await ite_cl(cl[i]).then((numb) => {
      //stars.push(numb);
      //console.log("sc: "+numb)
    //});
    //console.log("stars: "+stars);
    i += 1;
  }*//*
  for (i in stars) {
    if (i > 0) {
      if (stars[i] != stars[i - 1]) {
        order = 5 - i;
        if (stars[i] == 1) {
          rank = "bronze";
        }
        if (stars[i] == 2) {
          rank = "silver";
        }
        if (stars[i] == 3) {
          rank = "gold";
        }
        level = order.toString() + " " + rank;
      }
    }
  }
  console.log("level: " + level);
  */
}
module.exports = { star_count_mb, star_count_cl };
