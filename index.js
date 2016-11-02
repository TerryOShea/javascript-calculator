$(document).ready(function() {
  var total = 0,
      clearNextScreen = false,
      oper = undefined,
      pressed = undefined;
  
  const screen = $('.screen'), 
        btn = $('.btn');
  
  function clearall() {
    total = 0;
    oper = undefined;
    pressed = undefined;
    screen.html("0");
  }
  
  function evalu(val) {
    if (oper == "+") total += val;
    else if (oper == "-") total -= val;
    else if (oper == "*") total *= val;
    else total /= val;
  };
  
  function format() {
    if (!isFinite(total)) {
      clearall();
      clearNextScreen = true;
      screen.html("n0000000!");
    }
    else if (total.toString().length > 11) {
      if (total < 100000000000) return total.toPrecision(9);
      else return total.toPrecision(6);
    }
    else return total;
  }
  
  function checkClearNext() {
    if (clearNextScreen) {
      clearNextScreen = false;
      return "0";
    }
    else return screen.html();
  }
  
  btn.on('click', function() {
    const btnID = $(this).attr("id");
    
    if (pressed && btnID != "." && btnID != "+/-") pressed.css("background", "#545454");
    
    if (/^[+*/\-]{1}&/.test(btnID)) {
      $(this).css("background", "#333");
      pressed = $(this);
      
      if (!oper) total = Number(screen.html());
      
      else if (oper && !clearNextScreen) {
        evalu(Number(screen.html()));
        screen.html(format());
      }
            
      oper = btnID;
      clearNextScreen = true;
    }
    
    else if (/\d/.test(btnID)) {
      let curr = checkClearNext();
      if (curr.length < 11) {
        screen.html((curr == "0") ? btnID : curr + btnID);
      }
    }
    
    else if (btnID == ".") {
      let curr = checkClearNext();
      if (curr.length < 11) {
        if (curr.indexOf(".") == -1) screen.html(curr + ".");
      }
    }
    
    else if (btnID == "+/-") {
      let curr = screen.html();
      if (curr != "0") screen.html((curr.indexOf("-") == -1) ? "-" + curr : curr.substr(1));
    }
    
    else if (btnID == "ac") clearall();
    
    else if (btnID == "ce") {
      screen.html("0");
      $('#' + pressed.attr("id") + '').css("background", "#333");
    }
    
    else { //btnId == "="
      if (oper) {
        evalu(Number(screen.html()));
        oper = undefined;
        clearNextScreen = true;
        screen.html(format());
      }
    }
  })
});