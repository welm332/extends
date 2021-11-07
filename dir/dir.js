// const beforefunc = open_args;
window.api.create_local_shk("Ctrl+B");
window.api.on("Ctrl+B", create_side);
file_name_keydown = async (event)=>{
    const parentdir = window.requires.path.dirname;
    if(event.key === "Enter"){
        window.requires.fs.renameSync(event.target.dataset.target_fullpath, parentdir(event.target.dataset.target_fullpath)+"/"+event.target.value);
        const parent = document.querySelector(`.dir[data-fullpath="${window.requires.path.dirname(before_selected_selement.dataset.fullpath)}"`);
        // console.log(parent)
        const i2 = await onclick_element(parent);
        const i3 =  await onclick_element(parent);
    }
    event.stopPropagation();
    
};

window.api.create_local_shk("Delete");
window.api.on("Delete", async ()=>{
    if(focusFlag && Math.abs(await window.api.show_message_box("question","確認","削除の確認",`${before_selected_selement.dataset.fullpath}を削除してもよろしいでしょうか`,["削除", "中断"])) !== 1){
        fs.rmSync(before_selected_selement.dataset.fullpath);
        const parent = document.querySelector(`.dir[data-fullpath="${window.requires.path.dirname(before_selected_selement.dataset.fullpath)}"`);
        // console.log(parent)
        const i2 = await onclick_element(parent);
        const i3 =  await onclick_element(parent);
    }
    
})
window.api.create_local_shk("F2");
window.api.on("F2", ()=>{
    if(focusFlag){
        const input = document.createElement("input");
        input.type = "text";
        input.onkeydown = file_name_keydown;
        input.dataset.target_fullpath = before_selected_selement.dataset.fullpath;
        input.value = before_selected_selement.textContent;
        // before_selected_selement.innerHTML = `
        //     <input type="text" onkeydown='l(event)' data-target_fullpath="${before_selected_selement.dataset.fullpath}" value="${before_selected_selement.textContent}"></input>`;
        before_selected_selement.textContent = "";
        before_selected_selement.onclick =()=>{};
        before_selected_selement.appendChild(input);
        input.focus()
    }
});

window.api.create_local_shk("Ctrl+C");
window.api.on("Ctrl+C", copy_and_paste_listen);
focusFlag = true;
default_create_tab = create_tab;
create_tab = ()=>{
    element = default_create_tab();
    for(const em of document.body.children){
        if(em.className !== "dir" && em.className !== "file"){
            em.addEventListener("click" ,()=>{
                select_element = null;
                focusFlag = false;
                
            });
        }
    }
    return element;
};

window.api.create_local_shk("Ctrl+V");
window.api.on("Ctrl+V", async ()=>{
    if(select_element !== null){
        let i = 1;
        const dirname = window.requires.path.dirname(select_element.dataset.fullpath);
        const dirs = fs.readdirSync(dirname);
        const file_basename = select_element.textContent;
        while(true){
            dot_rindex = file_basename.lastIndexOf(".");
            if(dot_rindex === -1){
                dot_rindex = file_basename.length 
            }
            cp_name = file_basename.substring(0, dot_rindex)+" copy"+(i !== 1 ? ` ${i}`:"")+window.requires.path.extname(file_basename);
            if(dirs.indexOf(cp_name) === -1){
                fs.copyFileSync(dirname+`/${file_basename}`, dirname+`/${cp_name}`);
                break
            }
            i++;
            
        }
        // console.log(select_element.dataset.fullpath);
        // console.log(window.requires.path.dirname(select_element.dataset.fullpath));
        
        const parent = document.querySelector(`.dir[data-fullpath="${window.requires.path.dirname(select_element.dataset.fullpath)}"`);
        // console.log(parent)
        const i2 = await onclick_element(parent);
        const i3 =  await onclick_element(parent);
    }
})
async function copy_and_paste_listen(){
    // console.info("un");
    // console.log(focusFlag);
    if(focusFlag){
        select_element = before_selected_selement;
    }
}
let before_selected_selement = null;
let select_element = null
async function create_element(path, type, nest=0, intertPoint=null){
    const element = document.createElement("div");
    element.className = type;
    element.dataset.nest = nest;
    const div = document.querySelector("#dir_side");
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
            fname_input.onkeydown = async (event2)=>{
                // console.log(event2);
                if(event2.key === "Enter"){
                    window.requires.fs.writeFileSync(path+"/"+event2.target.value, "");
                    console.log(path)
                    const parent = document.querySelector(`.dir[data-fullpath="${path.replaceAll("\\", "/").toLowerCase()}"]`)
                    event2.target.remove();
                    const i2 = await onclick_element(parent);
                    const i3 =  await onclick_element(parent);
                }
            };
            div.insertBefore(fname_input, element.nextSibling);
            fname_input.focus();
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
            dir_input = document.createElement("input");
            dir_input.onkeydown = (event2)=>{
                // console.log(event2);
                if(event2.key === "Enter"){
                    window.requires.fs.mkdirSync(path+"/"+event2.target.value);
                    event2.target.remove();
                }
            };
            div.insertBefore(dir_input, element.nextSibling);
            event1.stopPropagation();
            dir_input.focus();
        };
        
        
        element.appendChild(dir_inputer);
    }
    path = window.requires.path.resolve(path);
    element.style.marginLeft = `${nest*15}px`;
    // element.style.width = "300px"; 
    // element.style.height = "40px";
    element.dataset.status = "closed";
    element.dataset.fullpath = window.requires.path.resolve(path).replaceAll("\\", "/").toLowerCase();
    element.style.display = "block";
    element.onclick = async (event)=>{
        onclick_element(event.target);
        event.stopPropagation();
        
    }
    if(intertPoint === null){
        div.appendChild(element);
    }else{
        div.insertBefore(element, intertPoint.nextSibling)
    }
    // div.style.overflow = "scroll scroll";
}
async function onclick_element(target){
        // focusFlag = true;
        const type = target.className;
        const path = target.dataset.fullpath;
        const nest = Number(target.dataset.nest);
        const div = document.querySelector("#dir_side");
        if(type == "file"){
            if(before_selected_selement !== null){
                before_selected_selement.style.color = "black";
            }
            target.style.color = "blue";
            before_selected_selement = target;
            if(document.querySelector(`.tab[data-fullpath="${path.toLowerCase()}"]`) === null){
                
                let em = create_tab().dataset.fullpath;
                const fullpath = get_path(path);
                readFile(fullpath, em);
                get_focus(fullpath);
            }else{
                const fullpath = get_path(path);
                get_focus(fullpath);
            }
            focusFlag = true;
        }else if(target.dataset.status === "closed"){
            target.style.background  = "gray";
            target.dataset.status = "opend";
            let children = fs.readdirSync(path);
            children =children.map((child)=>path+"/"+child);
            const DirFlags = await window.api.isDirs(children);
            for(let i=0,len=children.length;i<len;i++){
               create_element(children[i], DirFlags[i] ? "dir":"file", nest+1, target);
            }
        }else{
            target.style.background  = "white";
            // const delist = Array(...div.children).filter((em)=> window.requires.path.dirname(em.dataset.fullpath) ===  target.dataset.fullpath)
            const delist = Array(...div.children).filter((em)=> em.dataset.fullpath.indexOf(target.dataset.fullpath) !== -1 && target !== em)
            for(const em of delist){
                em.remove();
            }
            target.dataset.status = "closed";
        }
        
    }
async function open_dir(){
    const args = await window.api.get_args();
    const open_elements = args["Others"];
    const DirFlags  = await window.api.isDirs(open_elements);
    const open_dirs = open_elements.filter((elm, index) =>DirFlags[index]);
    if(open_dirs.length != 0){
        const dir = open_dirs[0];
        const div = create_side();
        create_element(dir, "dir");
        return dir;
    }

//     beforefunc();
//     console.log(args);
    // console.log(i)
    
};
window.addEventListener("load", open_dir);
    
function create_side(){
    if(document.querySelector("#input_area").style.padding !== "34px 0px 20px 200px"){
        document.querySelector("#input_area").style.padding = "34px 0px 20px 200px";
    }else{
        document.querySelector("#input_area").style.padding = "34px 0px 20px 0px";
    }
    
    if(document.querySelector("#dir_side") !== null){
        return;
        
    }
    // return;
    let div = document.createElement('div');
    a = document.querySelector("#dialogspace");
    div.id = "dir_side";
    div.style.position = "absolute";
    div.style.top = "100px";
    document.body.insertBefore( div,a);
    div.style.height = "75vh";
    div.style.overflow = "auto auto";
    return div;
    }
