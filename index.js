var max = 36;
var prev = -1;
var toChange = -1;
main();

function main() {

    // initialize the storage array
    let start = JSON.parse(localStorage.getItem('data'));
    if (start == null) {
        start = new Array();
        for (let i = 0; i < max; i++) {
            start.push("");
        }
        localStorage.setItem('data', JSON.stringify(start));
    }

    // initialize the ordered list
    let orderedList = document.getElementById("listObj");
    while (orderedList.firstChild) {
        orderedList.removeChild(orderedList.firstChild);
    }

    let notes = JSON.parse(localStorage.getItem('data'));
    notes.forEach(function(item, array) {
        listItem = document.createElement("li");
        //listItem.addClass("ui-state-default");
        value = document.createTextNode(item);
        listItem.appendChild(value);
        orderedList.appendChild(listItem);
    });

    // make the ordered list object selectable 
    $(function() {
        $("#listObj").selectable();
    });

    // set index of note
    $("li").click(function() {
        if (toChange == $(this).index()) {
            prev = -1;
            toChange = -1;
        } else {
            prev = toChange;
            toChange = $(this).index();
        }
        
        // swap notes
        if (prev != -1) {
            swap(prev, toChange);
            prev = -1;
            toChange = -1;
        }
    });
    
    // deselect current item
    $("#listObj").bind( "mousedown", function(e) {
        e.metaKey = true;
    }).selectable();
    
    // deselect second item
    $("#listObj").selectable({
        selected: function(event, ui) { 
            $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");
        }                   
    }); 
    
    viewNote();
}

function editNote() {
    document.getElementById('edit').style.display = "block";
    document.getElementById('view').style.display = "none";

    let notes = JSON.parse(localStorage.getItem('data'));
    document.getElementById('field').value = notes[toChange];
}

function viewNote() {
    document.getElementById('edit').style.display = "none";
    document.getElementById('view').style.display = "block";
}

btnSave.onclick = function() {
    if (toChange == -1) {
        main();
    }
    const text = document.getElementById('field').value;
    saveNote(text);
}

btnCreate.onclick = function() {
    let notes = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < max; i++) {
        if (notes[i].normalize() == "".normalize()) {
            toChange = i;
            break;
        }
    }
    editNote();
}

btnEdit.onclick = function() {
    if (toChange != -1) {
        editNote();
    }
}

btnDelete.onclick = function() {
    if (toChange != -1) {
        deleteNote();
    }
}

function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem('data'));
    notes[toChange] = note;
    localStorage.setItem('data', JSON.stringify(notes));
    toChange = -1;
    main();
}

function deleteNote() {
    let notes = JSON.parse(localStorage.getItem('data'));
    notes[toChange] = "";
    localStorage.setItem('data', JSON.stringify(notes));
    toChange = -1;
    main();
}

function swap(a, b) {
    let notes = JSON.parse(localStorage.getItem('data'));
    const temp = notes[a];
    notes[a] = notes[b];
    notes[b] = temp;
    localStorage.setItem('data', JSON.stringify(notes));
    main();
}