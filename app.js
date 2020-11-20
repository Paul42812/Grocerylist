var mainlist;
var selected;
var selectedlist;
var usedonelist = true;
var items = [];
var doneitems = [];

//timer = setInterval(updatescroller, 10);
//clearInterval(timer);

function update() {
    mainlist = document.getElementById("mainlist")
    mainlist.innerHTML = "";

    donelist = document.getElementById("donelist")
    donelist.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        mainlist.innerHTML +=
            `<li>
            <form id="` + i + `">
                <span>` + items[i] + `</span>
                <button type="button" onClick="del(this.parentElement.id, 0)" class="listbutton">X</button>
                <button type="button" onClick="rename(this.parentElement.id, 0)" class="changebutton">Y</button>
            </form>
        </li>`
    }

    for (let i = 0; i < doneitems.length; i++) {
        donelist.innerHTML +=
            `<li>
            <form id="` + i + `">
                <span id="` + i + 'o' + '">' + doneitems[i] + `</span>
                <button type="button" onClick="del(this.parentElement.id, 1)" class="listbutton">X</button>
                <button type="button" onClick="rename(this.parentElement.id, 1)" class="changebutton">Y</button>
            </form>
        </li>`
    }
    save()

    var r = document.querySelector(':root');
    if (items.length == 0) {
        r.style.setProperty('--show-main', "none");
    } else {
        r.style.setProperty('--show-main', "block");
    }

    if (doneitems.length == 0) {
        r.style.setProperty('--show-done', "none")
    } else {
        r.style.setProperty('--show-done', "block")
    }
}

function del(id, listid) {
    if (usedonelist) {
        breakch();
        if (listid == 0) {
            doneitems.push(items[id]);
            items.splice(id, 1);
        }
        if (listid == 1) {
            doneitems.splice(id, 1);
        }
        update();
    } else {
        breakch();
        items.splice(id, 1);
        update();
    }
}

function save() {
    localStorage.setItem("items", items);
    localStorage.setItem("doneitems", doneitems);
}

function load() {
    if (!(localStorage.length == 0)) {
        var u = localStorage.getItem("doneitems");
        var spli = u.split(",");
        if (!(spli[0] == "")) {
            doneitems = spli;
        }

        var u = localStorage.getItem("items");
        var spli = u.split(",");
        if (!(spli[0] == "")) {
            items = spli;
        }
        update();
    }
}

function add() { //Adds an Item to the List
    breakch();
    f = document.getElementById("additem").value;
    if (f.length == 0) {
        alert(json["errors"]["add_items"]["empty"]);
        document.getElementById("additem").value = "";
    } else if (!(items.indexOf(f) == -1)) {
        alert(json["errors"]["add_items"]["alredy_there"]);
        document.getElementById("additem").value = "";
    } else {
        items.push(f);
        update()
        document.getElementById("additem").value = "";
        document.getElementById("additem").focus();
    }
}

function exp() { //Downloads the Current List as csv File
    breakch();
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
    breakch();
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
    breakch();
    items = [];
    doneitems = [];
    update();
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

function updatescroller() {
    var r = document.querySelector(':root');
    var scroll = Math.round(window.scrollY);
    var srr = (scroll + 10).toString() + "px";
    r.style.setProperty('--top-c', srr);
}

function rename(id, listid) {
    breakch();
    selected = id;
    selectedlist = listid;
    updatescroller()
    timer = setInterval(updatescroller, 10);
    var main = document.getElementById("main");

    main.innerHTML +=
        `<div id='ch'>
        <form>
            <input type='text' id='chname' onkeypress='return changename(event)'>
            <button type='button' onclick='breakch()' class='button' id='brk'>X</button>
        </form>
    </div>`

    if (listid == 0) {
        document.getElementById("chname").value = items[id];
    } else {
        document.getElementById("chname").value = doneitems[id];
    }
    document.getElementById("chname").focus();

}

function changename(e) {
    e = e || window.event;
    var key = e.keyCode;
    if (key == 13) { //Enter
        var value = document.getElementById("chname").value;
        if (items.includes(value)) {
            alert(json["errors"]["add_items"]["alredy_there"])
        } else {
            if (selectedlist == 0) {
                items[selected] = value;
            } else {
                doneitems[selected] = value;
            }
            document.getElementById("ch").remove();
            update();
        }
        return false;
    }
}

function eadd(e) {
    e = e || window.event;
    var key = e.keyCode;
    if (key == 13) { //Enter
        add();
        return false;
    }
}

function breakch() {
    try {
        clearInterval(timer);
    } catch (e) {}
    var g = document.getElementById("ch");
    try {
        g.remove();
    } catch (e) {}
}

load();
update();
updatesettings();