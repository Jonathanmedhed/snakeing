export const formatNumber = (number) => {
  let formatted = number;
  if ((number >= 1000) & (number < 1000000)) {
    formatted = formatted / 1000;
    formatted = parseFloat(formatted).toFixed(1).toString() + "k";
  } else if ((number >= 1000000) & (number < 1000000000)) {
    formatted = formatted / 1000000;
    formatted = parseFloat(formatted).toFixed(1).toString() + "m";
  } else if (number > 1000000000) {
    formatted = formatted / 1000000000;
    formatted = parseFloat(formatted).toFixed(1).toString() + "b";
  }
  return formatted;
};

export const formatNumberFull = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getRandom = (mn, mx) => {
  return Math.floor(Math.random() * (mx - mn) + mn);
};

export const idGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const userGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  var a = ["Small", "Blue", "Ugly"];
  var b = ["Bear", "Dog", "Banana"];

  var rA = Math.floor(Math.random() * a.length);
  var rB = Math.floor(Math.random() * b.length);
  var name = a[rA] + b[rB];
  return name + S4();
};

export const createDate = () => {
  const d1 = new Date();
  d1.setDate(d1.getDate() - getRandom(1, 28));

  const d2 = new Date();
  d2.setMonth(d2.getMonth() - getRandom(1, 10));

  const d3 = new Date();
  d3.setDate(d3.getDate() - 6);
  d3.setFullYear(d3.getFullYear() - getRandom(1, 10));

  const d4 = new Date();
  d4.setHours(d4.getHours() - getRandom(1, 12));

  let dates = [d1, d2, d3, d4];
  return dates[getRandom(0, 3)];
};

const getExtension = (filename) => {
  var parts = filename.split(".");
  return parts[parts.length - 1];
};

export const checkIsImage = (filename) => {
  const ext = getExtension(filename)?.toLowerCase();
  const extensions = ["jpg", "gif", "bmp", "png", "svg", "tiff", "bmp", "pdf"];
  return extensions.some((v) => ext.includes(v));
};

export const checkIsVideo = (filename) => {
  //console.log(filename);
  const ext = getExtension(filename)?.toLowerCase();
  //console.log('ext: ' + ext);
  const extensions = ["m4v", "avi", "mpg", "mp4", "mov", "wmv", "mkv", "flv"];
  return extensions.some((v) => ext.includes(v));
};
