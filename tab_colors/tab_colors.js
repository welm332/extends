before_create_editor = create_editor;
create_editor = (element) =>{
    console.log(element);
    editor = before_create_editor(element);
    console.log(editor);
    element.addEventListener("keydown", (event2)=>{
      console.log(event2);
     if(event2.key === "Enter"){
         rainbow();
     }
 });
 return editor
}


function rainbow(){

    // window
    lines = document.querySelectorAll(".ace_line");
    for(const line of lines){
        indents = line.querySelectorAll(".ace_indent-guide");
        console.log(indents.length);
        len = indents.length;
        colors = [
            "rgba(255,0,51,0.15)",
            "rgba(255,102,51,0.15)",
            "rgba(255,255,51,0.15) ",
            "rgba(0,204,51,0.15)",
            "rgba(0,204,255,0.15)",
            "rgba(51,51,255,0.15) ",
            "rgba(153,51,255,0.15)"
        ]
        for(let i=0;i<len;i++){
            indents[i].style.backgroundColor = colors[i];
            
            
        }
    }
    
}