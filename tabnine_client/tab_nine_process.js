// const i = require(`${window.requires.dirname}/../extends/tabnine_client/get_tabnine_path.js`);
// console.log(i);
// txt_editor.set

completes = [];
function create_editor(element){
  const editor = ace.edit(element);
  editor.setTheme("ace/theme/twilight");
  ace.require("ace/ext/language_tools");
  editor.session.setMode("ace/mode/python");
//   editor.setOptions({
//       enableBasicAutocompletion: [{
//         getCompletions: (editor, session, pos, prefix, callback) => {
//             console.log(callback)
//         // note, won't fire if caret is at a word that does not have these letters
//         callback(null,completes,u=1);
//         },
//     }],
//     enableSnippets:true,
//     enableLiveAutocompletion:true,
//     highlightActiveLine:true,
//     highlightSelectedWord:true,
//     enableLinking: true
//   });
  
    // var session = editor.getSession();
    // var pos = editor.getCursorPosition();
    // var prefix = 0;//util.getCompletionPrefix(editor);

    var matches = [];
    // var total = editor.completers.length;

    // editor.completers.forEach(function(completer, i) {
        // completer.getCompletions(editor, session, pos, prefix, function(err, results) {
            // if (!err && results)
                // matches = matches.concat(results);
            // callback(null, {
                // prefix: 0,
                // matches: results,
                // finished: (--total === 0)
            // });
        // });
    // });

  ace.require('ace/ext/settings_menu').init(txt_editor);
    return editor;
}
async function connect_tabnine(){
    const userprofile = await window.api.env("USERPROFILE");
window.api.create_process_shell(get_tabnine_path(userprofile+"/Desktop/program/portfolio/150819_electron_text_editor/test/TabNine/binaries"), "Tabnine");
window.api.on("child_process_session::Tabnine",(event,value)=>{
    // console.log(value.data);
    try{
        data = window.requires.iconv.decode(value.data, "utf-8");
        console.log(data);
        ary = JSON.parse(data)["results"];
        console.log(ary);
        console.log(ary.map((em)=>em["new_prefix"]))
        if(ary.map((em)=>em["new_prefix"]).indexOf(null) === -1){
            create_popup(ary.map((em)=>em["new_prefix"]+"\tTabnine"),JSON.parse(data)["old_prefix"])
        }
    }
    catch{}
    
})
  default_onchange = Onchange;
  Onchange = async()=>{
        default_onchange();
        if(popups[tab_opend_path] !== undefined){
            popups[tab_opend_path].hide();
        }
        curpos = txt_editor.getCursorPosition();
        line = txt_editor.session.getLine(curpos.row);
        line = line.substring(0, curpos.column);
        console.log(line);
        await window.api.child_process_session_stdin(`{"version": "1.0.0", "request": {"Autocomplete": {"before": "${line.trim()}","after": "", "region_includes_beginning": true, "region_includes_end": true, "filename": "${window.requires.path.basename(tab_opend_path)}"}}}\n`,"Tabnine");
      
  }


}
connect_tabnine()

// const spawn =window.requires.exe.spawn;
// const spawnTest = (() => {
//   const dir = spawn(get_tabnine_path("Desktop/program/portfolio/150819_electron_text_editor/test/TabNine/binaries"), {shell: true});       // <== shell: true option
//   dir.stdout.on('data', (data) => {
//     console.log(`spawn stdout: ${data}`);
//   });

//   dir.stderr.on('data', (data) => {
//     console.log(`spawn stderr: ${data}`);
//   });

//   dir.on('error', (code) => {
//     console.log(`spawn error: ${code}`);
//   });

//   dir.on('close', (code) => {
//     console.log(`spawn child process closed with code ${code}`);
//   });

//   dir.on('exit', (code) => {
//     console.log(`spawn child process exited with code ${code}`);
//   });
//   default_onchange = Onchange;
//   Onchange = ()=>{
//       default_onchange();
//       dir.stdin.write(`{"version": "1.0.0", "request": {"Autocomplete": {"before": "${txt_editor.session.getValue()}","after": "", "region_includes_beginning": true, "region_includes_end": true, "filename": "test.js"}}}\n`);
      
//   }
// })();




function parse_semver(v1,v2){
    v1ary = [];
    v2ary = [];
    // try{
        for(const  x of v1.split('.')){
            v1ary.push(Number(x));
        }
        for(const  x of v2.split('.')){
            v2ary.push(Number(x));
        }
        console.log(v1ary)
        console.log(v2ary)
        for(let i=0,len=Math.min(v1ary.length,v2ary.length);i<len;i++){
            if(v1ary[i] !== v2ary[i]){
                return v2ary[i] - v1ary[i];
            }
        }
        return ary
    // }
    // catch{
    //     return [];
    // }
};


function get_tabnine_path(binary_dir){
    const fs = window.requires.fs;
    const path = window.requires.path;
    function join_path(...args){
        return path.join(binary_dir, ...args);
    }

    translation = {
        "linux:x32": "i686-unknown-linux-musl/TabNine",
        "linux:x64": "x86_64-unknown-linux-musl/TabNine",
        "osx:x64": "x86_64-apple-darwin/TabNine",
        "osx:arm64": "aarch64-apple-darwin/TabNine",
        "windows:x32": "i686-pc-windows-gnu/TabNine.exe",
        "windows:x64": "x86_64-pc-windows-gnu/TabNine.exe",
    }

    platform_key = "windows:x64"
    platform = translation[platform_key]

    versions = []

    //  if a .active file exists and points to an existing binary than use it
    active_path = join_path(binary_dir, ".active")
    // print(active_path)
    if(fs.existsSync(active_path)){
        version = fs.readFileSync(active_path, "utf-8").trim()
        version_path = join_path(binary_dir, version)
        active_tabnine_path = join_path(version_path, platform)
        if(fs.existsSync(active_tabnine_path)){
            versions = [version_path]
            }
        }

    if (versions.length == 0){
        versions = fs.readdirSync(binary_dir)
        console.log(versions)
        versions.sort(key=parse_semver)
        console.log(versions)
    }
    i = ["1.1","1.2"]
    console.log(parse_semver(i[0],i[1]))
    i.sort(parse_semver)
    console.log(i);
    for (const version of versions){
        console.log(version)
        console.log(platform);
        paths = join_path(version, platform)
        // var stats = fs.statSync(paths);
        // console.log(paths)
        // console.log(stats)
        if (! window.api.isDirs([paths])[0]) {
            // console.log('This is a directory');
            console.log("Tabnine: starting version", version);
            return paths;
        }

    }
}
// exports["get_tabnine_path"] = get_tabnine_path;
// console.log(get_tabnine_path("/Desktop/program/portfolio/150819_electron_text_editor/test/TabNine/binaries").replaceAll("\\","/"))
// itor/test/TabNine/binaries").replaceAll("\\","/"))
