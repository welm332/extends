codes = {}
window.addEventListener('DOMContentLoaded', ()=>{
    palette_commands["insert RLO"] = 'pos = txt_editor.getCursorPosition();codes[`${pos.row}:${pos.column+1}`] = "RLO";txt_editor.session.insert(txt_editor.getCursorPosition()," ")';
});
if(palette_commands !== null){
    palette_commands["start uncode session"] = `
        console.log(saveFile);
    
    copy = saveFile;
    saveFile = (value) => {
        txt_editor.session.replace
        
        fs.writeFileSync("unicodetest1.js",uncode_replace(value))
        saveFile = copy;
        copy(value,false);
    }
    `
}

    // palette_commands["insert RLO"] = \'pos = txt_editor.getCursorPosition();codes[\`${pos.row}:${pos.column+1}\`] = "\u202E";txt_editor.session.insert(txt_editor.getCursorPosition(),"[U:RLO]")\'
    // palette_commands["insert LRI"] = \'pos = txt_editor.getCursorPosition();codes[\`${pos.row}:${pos.column+1}\`] = "\u2066";txt_editor.session.insert(txt_editor.getCursorPosition(),"[U:LRI]")\'
    // palette_commands["insert PDI"] = \'pos = txt_editor.getCursorPosition();codes[\`${pos.row}:${pos.column+1}\`] = "\u2069";txt_editor.session.insert(txt_editor.getCursorPosition(),"[U:PDI]")\'


// window.api.create_local_shk("Backspace");
// window.api.on("Backspace", ()=>{
//     pos = txt_editor.getCursorPosition();
//     delete codes[`${pos.row}:${pos.column}`];
// });


function uncode_replace(value){
    value = value.replaceAll("[U:RLO]", "\u202E");
    value = value.replaceAll("[U:LRI]", "\u2066");
    value = value.replaceAll("[U:PDI]", "\u2069");
    return value
    
}

// window.addEventListener("load",()=>{
//     console.log(saveFile);
    
//     copy = saveFile;
//     saveFile = (value) => {
//         txt_editor.session.replace
        
//         fs.writeFileSync("unicodetest1.js",uncode_replace(value))
//         saveFile = copy;
//         copy(value,false);
//     }
// })