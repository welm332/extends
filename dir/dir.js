// const beforefunc = open_args;
window.api.create_local_shk("Ctrl+B");
window.api.on("Ctrl+B", create_side);

window.api.create_local_shk("Ctrl+C");
window.api.on("Ctrl+C", copy_and_peast_listen);
focusFlag = true;
window.addEventListener("click" ,()=>{focusFlag = false});
palette_commands["OpenDir"] = `create_element(".", "dir", create_side())`
function copy_and_peast_listen(){
    if(select_element !== null){
        if(! focusFlag){
            return false;
        }
        window.api.create_local_shk("Ctrl+V");
        window.api.on("Ctrl+V", ()=>{
            let i = 1;
            const dirs = fs.readdirSync(window.requires.path.dirname(select_element.dataset.fullpath));
            const file_basename = select_element.textContent;
            while(true){
                dot_rindex = file_basename.lastIndexOf(".");
                if(dot_rindex === -1){
                    dot_rindex = file_basename.length 
                }
                console.log(file_basename);
                cp_name = file_basename.substring(0, dot_rindex)+" copy"+(i !== 1 ? ` ${i}`:"")+window.requires.path.extname(file_basename);
                console.log(cp_name);
                if(dirs.indexOf(cp_name) === -1){
                    console.log(window.requires.fs.copyFileSync(select_element.dataset.fullpath, window.requires.path.dirname(select_element.dataset.fullpath)+"/"+cp_name));
                    break
                }
                i++;
                
            }
        });

    }
}
let select_element = null
async function create_element(path, type, div, nest=0, intertPoint=null){
    const element = document.createElement("div");
    element.className = type;
    console.log(type);
    console.log(type === "dir");
    console.log(type == "dir");
    element.textContent = window.requires.path.basename(path);
    if(type === "dir"){
        const file_inputer = document.createElement("input");
        file_inputer.type = "image";
        file_inputer.src = window.requires.dirname+"/../extends/dir/file_icon.png";
        // const width = (element.style.height * input.style.width) / input.style.height;
        file_inputer.style.height = "20px";//element.style.height;
        file_inputer.style.width = "20px";//width;
        file_inputer.className = "file_name_inputer";
        file_inputer.onclick = (event1)=>{
            // return 
            fname_input = document.createElement("input");
            fname_input.onkeydown = (event2)=>{
                // console.log(event2);
                if(event2.key === "Enter"){
                    window.requires.fs.writeFileSync(path+"/"+event2.target.value, "");
                    event2.target.remove();
                }
            };
            div.insertBefore(fname_input, element.nextSibling);
            event1.stopPropagation();
        };
        
        element.appendChild(file_inputer);
        
        
        
        const dir_inputer = document.createElement("input");
        dir_inputer.type = "image";
        dir_inputer.src = window.requires.dirname+"/../extends/dir/folder_icon.png";
        // const width = (element.style.height * input.style.width) / input.style.height;
        dir_inputer.style.height = "20px";//element.style.height;
        dir_inputer.style.width = "20px";//width;
        dir_inputer.className = "dir_name_inputer";
        dir_inputer.onclick = (event1)=>{
            // return 
            fname_input = document.createElement("input");
            fname_input.onkeydown = (event2)=>{
                // console.log(event2);
                if(event2.key === "Enter"){
                    window.requires.fs.mkdirSync(path+"/"+event2.target.value);
                    event2.target.remove();
                }
            };
            div.insertBefore(fname_input, element.nextSibling);
            event1.stopPropagation();
        };
        
        
        element.appendChild(dir_inputer);
    }
    path = window.requires.path.resolve(path);
    element.style.marginLeft = `${nest*15}px`;
    // element.style.width = "300px"; 
    // element.style.height = "40px";
    element.dataset.status = "closed";
    element.dataset.fullpath = window.requires.path.resolve(path);
    element.style.display = "block";
    element.onclick = async (event)=>{
        focusFlag = true;
        const target = event.target;
        if(type == "file"){
            if(select_element !== null){
                select_element.style.color = "black";
            }
            target.style.color = "blue";
            select_element = target;
            console.log(path);
            let em = create_tab().dataset.fullpath;
            const fullpath = get_path(path);
            readFile(fullpath, em);
        }else if(target.dataset.status === "closed"){
            target.style.background  = "gray";
            target.dataset.status = "opend";
            let children = fs.readdirSync(path);
            children =children.map((child)=>path+"/"+child);
            console.log(children);
            const DirFlags = await window.api.isDirs(children);
            for(let i=0,len=children.length;i<len;i++){
               create_element(children[i], DirFlags[i] ? "dir":"file", div, nest+1, target);
            }
        }else{
            target.style.background  = "white";
            const delist = Array(...div.children).filter((em)=> window.requires.path.dirname(em.dataset.fullpath) ===  target.dataset.fullpath)
            console.log(delist);
            for(const em of delist){
                em.remove();
            }
            target.dataset.status = "closed";
        }
        
    }
    if(intertPoint === null){
        div.appendChild(element);
    }else{
        div.insertBefore(element, intertPoint.nextSibling)
    }
    // div.style.overflow = "scroll scroll";
}
async function open_dir(){
    console.log("yaah")
    const args = await window.api.get_args();
    const open_elements = args["Others"];
    const DirFlags  = await window.api.isDirs(open_elements);
    const open_dirs = open_elements.filter((elm, index) =>DirFlags[index]);
    if(open_dirs.length != 0){
        const dir = open_dirs[0];
        const div = create_side();
        create_element(dir, "dir", div);
        return dir;
    }

//     beforefunc();
//     console.log(args);
    // console.log(i)
    
};
window.addEventListener("load", open_dir);
    
function create_side(){
    // return;
    let div = document.createElement('div');
    a = document.querySelector("#dialogspace");
    div.id = "dir_side";
    div.style.position = "absolute";
    div.style.top = "100px";
    document.body.insertBefore( div,a);
    if(document.querySelector("#input_area").style.padding !== "34px 0px 20px 200px"){
        document.querySelector("#input_area").style.padding = "34px 0px 20px 200px";
    }else{
        document.querySelector("#input_area").style.padding = "34px 0px 20px 0px";
    }
    div.style.height = "75vh";
    div.style.overflow = "auto auto";
    return div;
    }
// async function isDir(path){
//     const toString = async (bytes) => {
//     return window.requires.Encoding.convert(bytes, {
//         from: 'SJIS',
//         to: 'UNICODE',
//         type: 'string',
//         });
//     };
//     const out = await toString(window.requires.exe.execSync("(Get-Item " + path + ") -is [System.IO.DirectoryInfo]",{'shell':'powershell.exe'}))
//     return out === "True\r\n";
// }
