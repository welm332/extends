// const beforefunc = open_args;
window.api.create_local_shk("Ctrl+B");
window.api.on("Ctrl+B", create_side);
async function create_element(path, type, div, nest=0, intertPoint=null){
    bt = document.createElement("button");
    path = window.requires.path.resolve(path);
    bt.textContent = window.requires.path.basename(path);
    bt.style.marginLeft = `${nest*15}px`;
    // bt.style.width = "300px"; 
    // bt.style.height = "40px";
    bt.dataset.status = "closed";
    bt.dataset.fullpath = window.requires.path.resolve(path);
    bt.style.display = "block";
    bt.onclick = async (event)=>{
        const button = event.target;
        if(type == "file"){
            console.log(path);
            let em = create_tab().dataset.fullpath;
            const fullpath = get_path(path);
            readFile(fullpath, em);
        }else if(button.dataset.status === "closed"){
            button.style.background  = "gray";
            button.dataset.status = "opend";
            let children = fs.readdirSync(path);
            children =children.map((child)=>path+"/"+child);
            console.log(children);
            const DirFlags = await window.api.isDirs(children);
            for(let i=0,len=children.length;i<len;i++){
               create_element(children[i], DirFlags[i] ? "dir":"file", div, nest+1, button);
            }
        }else{
            button.style.background  = "white";
            const delist = Array(...div.children).filter((em)=> window.requires.path.dirname(em.dataset.fullpath) ===  button.dataset.fullpath)
            console.log(delist);
            for(const em of delist){
                em.remove();
            }
            button.dataset.status = "closed";
        }
        
    }
    if(intertPoint === null){
        div.appendChild(bt);
    }else{
        div.insertBefore(bt, intertPoint.nextSibling)
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
        div.style.height = "75vh";
        div.style.overflow = "auto auto";
        create_element(dir, "dir", div);
        return dir;
    }

//     beforefunc();
//     console.log(args);
    // console.log(i)
    
};
window.addEventListener("load", open_dir);
    
function create_side(){
    let div = document.createElement('div');
    a = document.querySelector("#dialogspace");
    div.id = "dir_side";
    div.style.position = "absolute";
    div.style.top = "100px";
    document.body.insertBefore( div,a);
    if(document.querySelector("#input_area").style.padding !== "34px 0px 20px 500px"){
        document.querySelector("#input_area").style.padding = "34px 0px 20px 500px";
    }else{
        document.querySelector("#input_area").style.padding = "34px 0px 20px 0px";
    }
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
