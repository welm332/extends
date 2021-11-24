function get_terms(){
    const terms = [];
    const platform = window.requires.platform;
      const shells = JSON.parse(fs.readFileSync(window.requires.dirname+'/../extends/cmd/shells.json', 'utf8'));
      console.log(shells)
      return shells[platform];
}

window.addEventListener('DOMContentLoaded', ()=>{
    palette_commands["open cmd"] = "openCmd()";//`tab=create_tab();loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/webviewer/web.html");tab.querySelector("#tab_name").textContent = "Browser"`;
});
if(palette_commands !== null){
    palette_commands["open cmd"] = "openCmd()";//`tab=create_tab();loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/webviewer/web.html");tab.querySelector("#tab_name").textContent = "Browser"`;
}

async function openCmd(){
    tab=create_tab();
    const commands_dict = {};
    if((await window.requires.extensions.extensions("list","-lo")).indexOf("dir") !== -1){
        commands_dict["opendir .*?"] = (value)=>{
            const dir_path = value.substring(8);
            open_dir([dir_path])
        }
    }
    const inputer_reg = RegExp("[A-Z]:(\\\\|/)\\S*>$");
    console.log(inputer_reg);
    // console.log(inputer_reg.test(data));
    // loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/webviewer/web.html")
    // console.log(get_terms[0])
    const terms = get_terms();
    let prompt_select = await window.api.show_message_box("question","選択","ターミナルの選択","どのターミナルを開きますか?", terms);
    if (prompt_select === -1){
        prompt_select = 0;
    }
    
    window.api.create_process_shell(terms[prompt_select], "Cmd");
    loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/cmd/cmd.html")
    const commands_history = [""];
    let now_num = 0;
    tab.querySelector("#tab_name").textContent = terms[prompt_select];
    window.api.off("child_process_session::Cmd",(event,value)=>{})
    window.api.on("child_process_session::Cmd",(event,value)=>{
        // console.log(value.data);
    // console.log(value.data);
        // try{
            data = window.requires.iconv.decode(value.data, "shiftjis").trim();
            console.log(data)
            console.log(inputer_reg.test(data));
            const line = document.createElement("div");
            line.className = "line";
            line.textContent = data;
            if((before_inputer=document.querySelector("#cmd_place > input"))){
                before_inputer.remove();
                }
            // console.log(lastChild)
                
            document.querySelector("#cmd_place").appendChild(line);
            if(inputer_reg.test(data) || 1){
                // console.log(data.match(RegExp("[A-Z]:(\\\\|/)\\S*"))[0]);
                // console.log(data.match(RegExp("[A-Z]:(\\\\|/)\\S*"))[0].substring(0,data.lastIndexOf(">")))
                // line.style.display = "inline-block";
                const input = document.createElement("input");
                if(inputer_reg.test(data)){
                    const dirs = fs.readdirSync(data.match(RegExp("[A-Z]:(\\\\|/)\\S*"))[0].replaceAll(">", ""));
                    input.dataset.children = dirs.join("|");
                }
                input.dataset.index = 0;
                input.style.backgroundColor = "#1e1e1e";//document.querySelector("#cmd_place").style.backgroundColor;
                input.style.color = "white";
                input.style.outline =  "none";
                input.onkeydown = async (event)=>{
                    console.log(event.key);
                    if(event.key === "Tab" && event.target.dataset.children){
                        let dirs = event.target.dataset.children.split("|");
                        const target = event.target;
                        let start_index = target.selectionStart;
                        if(target.dataset.autocomplete_index !== undefined){
                            console.info("atari");
                            start_index = Number(target.dataset.autocomplete_index);
                            
                        }
                        if(target.selectionStart !== 0 && target.value[start_index-1] != " "){
                            word_start_index = target.value.substring(0,start_index).lastIndexOf(" ");
                            const write =target.value.substring(word_start_index, start_index).trim();
                            console.log(write)
                            dirs = dirs.filter((em)=>em.indexOf(write)===0);
                            dirs = dirs.map((em)=>em.substring(em.indexOf(write) !== -1 ? write.length: 0));
                            if(target.dataset.autocomplete_index === undefined){
                                input.dataset.autocomplete_index = start_index;

                            }   
                        }
                        
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
                    else if(event.target.dataset.autocomplete_index !== undefined){
                        delete event.target.dataset.autocomplete_index;
                        event.target.dataset.index = 0
                    }
                    if(event.key === "ArrowUp"){
                        console.log("UUUPP");
                        // console.log(commands_history[--now_num])
                        if(now_num > 0){
                            event.target.value = commands_history[--now_num];
                            event.target.setSelectionRange(event.target.value.length-1, event.target.value.length-1)
                        }
                        return
                    }
                    else if(event.key === "ArrowDown"){
                        console.log("UUUPP");
                        // console.log(commands_history[--now_num])
                        if(now_num < commands_history.length-1){
                            event.target.value = commands_history[++now_num];
                            event.target.setSelectionRange(event.target.value.length-1, event.target.value.length-1)
                        }
                        return
                    }
                    else if(event.key !== "Enter"){
                        commands_history[commands_history.length-1] += event.key;
                        return
                    }
                    
                    target = event.target;
                    let value = target.value;
                    commands_history[commands_history.length-1] = value;
                    commands_history.push("");
                    now_num = commands_history.length-1;
                    
                    // const line = document.createElement("div");
                    // line.className = "line";
                    // line.textContent = value;
                    // document.querySelector("#cmd_place").replaceChild(line, target);
                    if(value.indexOf("runtab") !== -1){
                        value = value.trim();
                        let tabNumber = value.substring(7);
                        console.log(tabNumber)
                        const tab = document.querySelectorAll('.tab')[Number(tabNumber)-1];
                        console.log(tab)
                        console.log(tab.dataset.fullpath)
                        value = ("python "+tab.dataset.fullpath).replaceAll("\n","");
                        console.log(value.indexOf("\n"))
                    }
                    // オリジナルコマンド処理
                    if((origin_command =  Object.keys(commands_dict).filter((em)=>RegExp(em).test(value))).length !== 0){
                        commands_dict[origin_command[0]](value);
                    }
                        
                    
                    target.remove();
                    await window.api.child_process_session_stdin(`${value}\n`,"Cmd");
                    
                }
                document.querySelector("#cmd_place").appendChild(input);
                input.focus();
            }
        // }
        // catch{}
        
    })
        
        // default_onchange();
        // line = txt_editor.session.getLine(txt_editor.getCursorPosition().row);
        // console.log(line);
        // await window.api.child_process_session_stdin(`ls\n`,"Cmd");

}