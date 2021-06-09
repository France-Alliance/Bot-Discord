async function ite_mb(page, path) {
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
    console.log("cl clean: " + cl);
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
    await ite_mb(page, path).then((numb) => {
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
  cl = cl.toString();
  //console.log(cl)
  while (i < 6) {
    cl = cl.replace('            <span class="airlineStar ', "");
    cl = cl.replace('"></span>', "");
    i++;
  }
  for (i in cl) {
    if (cl[i] == "0") {
      stars.push(cl[i]);
    }
    if (cl[i] == "1") {
      stars.push(cl[i]);
    }
    if (cl[i] == "2") {
      stars.push(cl[i]);
    }
    if (cl[i] == "3") {
      stars.push(cl[i]);
    }
  }
  //console.log('stars: '+stars)
  for (i in stars) {
    if (i > 0) {
      if (stars[i] != stars[i - 1]) {
        order = i;
        if (stars[i - 1] == 0) {
          order = i;
          rank = "bronze";
        }
        if (stars[i - 1] == 1) {
          rank = "bronze";
        }
        if (stars[i - 1] == 2) {
          rank = "silver";
        }
        if (stars[i - 1] == 3) {
          rank = "gold";
        }
        level = order.toString() + " " + rank;
      } else {
        if (stars[4] == stars[0]) {
          order = 5;
          if (stars[i - 1] == 1) {
            rank = "bronze";
          }
          if (stars[i - 1] == 2) {
            rank = "silver";
          }
          if (stars[i - 1] == 3) {
            rank = "gold";
          }
          level = order.toString() + " " + rank;
        }
      }
    }
  }
  //console.log("level: " + level);
  return level;
}
module.exports = { star_count_mb, star_count_cl };
