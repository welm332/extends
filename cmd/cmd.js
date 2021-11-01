window.addEventListener('DOMContentLoaded', ()=>{
    palette_commands["open cmd"] = "openCmd()";//`tab=create_tab();loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/webviewer/web.html");tab.querySelector("#tab_name").textContent = "Browser"`;
});
if(palette_commands !== null){
    palette_commands["open cmd"] = "openCmd()";//`tab=create_tab();loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/webviewer/web.html");tab.querySelector("#tab_name").textContent = "Browser"`;
}

async function openCmd(){
    tab=create_tab();
    // loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/webviewer/web.html");
    
    
    window.api.create_process_shell("Powershell.exe", "Cmd");
    loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/cmd/cmd.html")
    tab.querySelector("#tab_name").textContent ="commandPrompt";
    window.api.on("child_process_session::Cmd",(event,value)=>{
        // console.log(value.data);
    // console.log(value.data);
        // try{
            data = window.requires.iconv.decode(value.data, "utf-8");
            console.log(data);
            const line = document.createElement("div");
            line.className = "line";
            line.textContent = data;
            document.querySelector("#cmd_place").appendChild(line);
            if(data.indexOf("PS") !== -1 && data.indexOf(":\\") !== -1){
                const dirs = fs.readdirSync(data.substring(3,data.length-2));
                line.style.display = "inline-block";
                const input = document.createElement("input");
                
                input.dataset.children = dirs.join("|");
                input.dataset.index = 0;
                input.style.backgroundColor = "#1e1e1e";//document.querySelector("#cmd_place").style.backgroundColor;
                input.style.color = "white";
                input.style.outline =  "none";
                input.onkeydown = async (event)=>{
                    console.log(event.key);
                    if(event.key === "Tab"){
                        const dirs = event.target.dataset.children.split("|");
                        console.log(dirs);
                        const index = Number(event.target.dataset.index);
                        const replace_index  = index === 0 ? dirs.length-1 : index-1;
                        console.log(index);
                        if(event.target.value.indexOf(dirs[replace_index]) !== -1){
                            event.target.value = event.target.value.replace(dirs[replace_index], dirs[index]);
                        }else{
                            event.target.value += dirs[index];
                        }
                        if(Number(event.target.dataset.index) === dirs.length-1){
                            event.target.dataset.index = 0;
                        }else{
                            event.target.dataset.index = Number(event.target.dataset.index)+1
                        }
                        
                        event.preventDefault();
                        return;
                    }
                    if(event.key !== "Enter"){
                        return
                    }
                    target = event.target;
                    const value = target.value;
                    
                    // const line = document.createElement("div");
                    // line.className = "line";
                    // line.textContent = value;
                    // document.querySelector("#cmd_place").replaceChild(line, target);
                    target.remove();
                    await window.api.child_process_session_stdin(`${value}\n`,"Cmd");
                    
                }
                document.querySelector("#cmd_place").appendChild(input);
                input.focus();
            }
        // }
        // catch{}
        
    })
        
        default_onchange();
        line = txt_editor.session.getLine(txt_editor.getCursorPosition().row);
        console.log(line);
        // await window.api.child_process_session_stdin(`ls\n`,"Cmd");

}