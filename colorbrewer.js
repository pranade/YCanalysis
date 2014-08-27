function rgba2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = {r: r, g: g, b: b, a: opacity/100};
    return result;
}

var colorbrewer = function (n){
  var colors = ['#f2ea00','#ebce13','#f0aa14','#f08630','#f07a60','#ee78f0','#bd90f0','#9092f0','#7fbadc','#90f0e3','#91d271','#c5f060'],
      output = [],
      alpha = 100;
      
  
  for(var i = 0; i < n; i++){
    output.push(colors[i%colors.length]);
    
    // if(i%colors.length == 0){
//       alpha -= 10;
//       if(alpha == 0){ alpha = 100; }
//     }
  }
  console.log(output.length);
  return output;
  
};