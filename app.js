var mainlist;
var items = [];

timer = setInterval(updatesettings, 100);

function update() {
    mainlist = document.getElementById("mainlist")
    mainlist.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        //mainlist.innerHTML += '<li id="' + i + '"><form><span id="' + i + 's' + '">' + items[i] + '</span><button type="button" id="' + i + 'b' + '"onClick="del(this.id)">X</button></form></li>'
        mainlist.innerHTML += '<li><form><span id="' + i + 's' + '">' + items[i] + '</span><button type="button" id="' + i + '"onClick="del(this.id)" class="listbutton">X</button></form></li>'
    }
    save()
}

function del(id) {
    var name = document.getElementById(id + "s");
    items.splice(items.indexOf(name.innerHTML), 1);
    update();
}

function save() {
    localStorage.setItem("save", items)
}

function load() {
    if (!(localStorage.length == 0)) {
        var u = localStorage.getItem("save");
        var spli = u.split(",");
        if (!(spli[0] == "")) {
            items = spli;
            update();
        }
    }
}

function add() { //Adds an Item to the List
    f = document.getElementById("additem").value;
    if (f.length == 0) {
        alert(json["errors"]["add_items"]["empty"]);
        document.getElementById("additem").value = "";
    } else if (!(items.indexOf(f) == -1)) {
        alert(json["errors"]["add_items"]["alredy_there"])
        document.getElementById("additem").value = "";
    } else {
        items.push(f);
        update()
        document.getElementById("additem").value = "";
    }
}

function exp() { //Downloads the Current List as csv File
    if (items.length == 0) {
        alert(json["errors"]["exp"]["empty"])
    } else {
        var rows = "Entries:";
        rows += "\r\n"
        items.forEach(element => {
            rows += element;
            rows += "\r\n"
        });
        var blob = new Blob([rows], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "mylist.csv")
    }
}

function imp() {
    var mf = document.getElementById("myfile")
    if (mf.value == mf.defaultValue) {
        alert(json["errors"]["file_upload"]["no_sellection"]);
    }

    const input = document.getElementById('myfile');

    let files = input.files;
    if (files.length == 0) return;
    const file = files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        const filee = e.target.result;
        if (file["size"] > json["valid_file"]["max_size"]) {
            alert(json["errors"]["file_upload"]["too_large"]);
        } else if (!(file["type"] == "text/csv")) {
            alert(json["error"]["file_upload"]["wrong_format"])
        } else {
            var lines = filee.split('\n')
            items = [];
            for (i = 1; i < lines.length - 1; i++) {
                var a = lines[i].substring(0, lines[i].length - 1)
                items.push(a)
                update()
            }
        }
        var mf = document.getElementById("myfile")
        mf.value = mf.defaultValue;
    };
    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
}

function clr() {
    items = []
    update()
}

function updatesettings() {
    var settings_title = document.getElementById("settings_title");
    settings_title.innerHTML = json["labels"]["settings_title"];

    var settingstitle = document.getElementById("title");
    title.innerHTML = json["labels"]["title"];

    var listbox_title = document.getElementById("listbox_title");
    if (items.length == 0) {
        listbox_title.innerHTML = json["labels"]["list"]["empty"];
    } else {
        listbox_title.innerHTML = json["labels"]["list"]["items"];
    }

    var add_item = document.getElementById("add_item");
    add_item.innerHTML = json["labels"]["buttons"]["add_item"];

    var imp_list = document.getElementById("imp_list");
    imp_list.innerHTML = json["labels"]["buttons"]["imp_list"];

    var exp_list = document.getElementById("exp_list");
    exp_list.innerHTML = json["labels"]["buttons"]["exp_list"];

    var clear = document.getElementById("clear");
    clear.innerHTML = json["labels"]["buttons"]["clear"];

}

if (items.length == 0) {
    load()
}

update()