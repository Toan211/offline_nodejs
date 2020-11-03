
//Replace Text function		 
$(function () { 
    count = 0; 
    wordsArray = [
        " Cuộc đời này thật ngắn ngủi, đừng dành… dù chỉ một phút cho những người, những việc khiến bạn buồn. ", 
        " Họ tốt đến đâu không quan trọng, bởi những thứ đó thuộc về họ. ", 
        " Họ tốt với bạn thế nào mới quan trọng, bởi những thứ đó thuộc về bạn. ",
        "Thứ không cần, có tốt đến đâu cũng là rác.",
        "Có những lúc, không có lần sau, không có cơ hội bắt đầu lại. Có những lúc, bỏ lỡ hiện tại, vĩnh viễn không còn cơ hội nữa.",
        "Hãy dùng thái độ cam tâm tình nguyện để sống một cuộc sống an ổn.",
        "Phụ nữ không có sức hấp dẫn mới cảm thấy đàn ông trăng hoa. Đàn ông không có thực lực mới cảm thấy phụ nữ thực dụng!",
        "Để tâm nên mới nghĩ ngợi linh tinh, không để tâm, đến nghĩ cũng chẳng buồn nghĩ!",
        "Cuộc sống không phải là một vấn đề cần giải quyết, mà là thực tế để chúng ta cần trải nghiệm"]; 
    setInterval(function () { 
      count++; 
      $("#word").fadeOut(1000, function () { 
        $(this).text(wordsArray[count % wordsArray.length]).fadeIn(1000); 
      }); 
    }, 1000); 
  }); 
  //End Replace Text function	

  function AddTask() {
    var x = document.getElementById("AddDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function Add(){

    var x = document.getElementById("TName").value;
    var y = document.getElementById("DeadLine").value;
    var z = document.getElementById("TaskCBox").value;
    
    var mTable = document.getElementById("_TableT");
    var mTab = document.createElement("tr");

    var arrayTask = [
        "Number",x, y, z,"edit"
    ];
    
    
    for (var i = 0; i<5; i++){
        var mCell = document.createElement("td");
        mCell.innerHTML = arrayTask[i];
        mTab.appendChild(mCell);
    }
    mTable.appendChild(mTab);

    
  }

  function CancelTask(){
    
    document.getElementById("TName").value = "";
    document.getElementById("DeadLine").value = "";
    
    
  }