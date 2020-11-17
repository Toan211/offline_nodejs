
    // var search_input = document.querySelector("#searchInput");

    // search_input.addEventListener("keyup", function(e){
        
    //         var body_items = document.querySelectorAll("tbody");
    // var table_body = document.querySelector(".table_body ul");
    //     var search_item = e.target.value.toLowerCase();
    //     console.log(search_item);
    // console.log(body_items);
    // body_items.forEach(function(item){
    //     if(item.textContent.toLowerCase().indexOf(search_item) != -1){
    //         item.closest("li").style.display = "block";
    //     }
    //     else{
    //         item.closest("li").style.display = "none";
    //     }
    // })




    // });

// listTask = getListTask();

// console.log(listTask[1] );

var body_items = document.querySelectorAll("tbody");
body_items.forEach(function(item){
        console.log();
        });

//console.log(body_items);



var onSearchInput = () =>
{
    var searchChar = document.getElementById("searchInput").value.toLowerCase();
    var body_items = document.getElementById("tableBody");


    
    body_items.forEach(function(item)
    {
        
    })

}

var highLine = ()=>
{
    let text = document.getElementById('box').textContent;
    let key = 'NODEJS';
    list_text = text.split(" ");
    res = '';
    for(i = 0; i < list_text.length; i++) {
        if(list_text[i].toUpperCase() == key){
            res += ' <mark>' + key + '</mark> ';
        } else {
            res += list_text[i] + ' ';
        }
    }
    document.getElementById('box').innerHTML = res;
}



