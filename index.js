let data = [];
let editIndex = -1;

const form = document.querySelector("form");
const nama = document.getElementById("name");
const kelas = document.getElementsByName("kelas");
const jurusan = document.querySelector(".jurusan select");
const ekskul = document.getElementById("ekskul");
const tabel = document.querySelector("table");

const btnDaftar = document.getElementById("btntambah");
const btnEdit = document.getElementById("btnedit");


// AWAL: hanya tombol DAFTAR
btnDaftar.style.display = "inline-block";
btnEdit.style.display = "none";


// ==========================
// TAMBAH DATA
// ==========================
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let kelasDipilih = "";

    for (let i = 0; i < kelas.length; i++) {
        if (kelas[i].checked) {
            kelasDipilih = kelas[i].value;
        }
    }

    if (nama.value.trim() === "") {
        return;
    }

    if (kelasDipilih === "") {
        return;
    }

    let siswa = {
        nama: nama.value,
        kelas: kelasDipilih,
        jurusan: jurusan.options[jurusan.selectedIndex].text,
        ekskul: ekskul.options[ekskul.selectedIndex].text
    };

    if (editIndex === -1) {
        data.push(siswa);
    }

    tampilkanData();

    form.reset();

    // Kembali ke tombol DAFTAR
    btnDaftar.style.display = "inline-block";
    btnEdit.style.display = "none";
});


// ==========================
// MENAMPILKAN DATA
// ==========================
function tampilkanData() {

    while (tabel.rows.length > 1) {
        tabel.deleteRow(1);
    }

    for (let i = 0; i < data.length; i++) {

        let baris = tabel.insertRow();

        baris.insertCell(0).innerHTML = i + 1;
        baris.insertCell(1).innerHTML = data[i].nama;
        baris.insertCell(2).innerHTML = data[i].kelas;
        baris.insertCell(3).innerHTML = data[i].jurusan;
        baris.insertCell(4).innerHTML = data[i].ekskul;

        let aksi = baris.insertCell(5);


        // ==========================
        // BUTTON EDIT
        // ==========================
        let tombolEdit = document.createElement("button");

        tombolEdit.type = "button";
        tombolEdit.innerHTML = "EDIT";

        // CLASS UNTUK WARNA EDIT
        tombolEdit.className = "btn-edit";

        tombolEdit.onclick = function() {
            editData(i);
        };


        // ==========================
        // BUTTON DELETE
        // ==========================
        let tombolDelete = document.createElement("button");

        tombolDelete.type = "button";
        tombolDelete.innerHTML = "DELETE";

        // CLASS UNTUK WARNA DELETE
        tombolDelete.className = "btn-delete";

        tombolDelete.onclick = function() {
            hapusData(i);
        };


        aksi.appendChild(tombolEdit);
        aksi.appendChild(tombolDelete);
    }
}


// ==========================
// MASUK MODE EDIT
// ==========================
function editData(index) {

    let siswa = data[index];

    nama.value = siswa.nama;


    // Pilih kelas
    for (let i = 0; i < kelas.length; i++) {
        kelas[i].checked = kelas[i].value === siswa.kelas;
    }


    // Pilih jurusan
    for (let i = 0; i < jurusan.options.length; i++) {

        if (jurusan.options[i].text === siswa.jurusan) {
            jurusan.selectedIndex = i;
        }

    }


    // Pilih ekskul
    for (let i = 0; i < ekskul.options.length; i++) {

        if (ekskul.options[i].text === siswa.ekskul) {
            ekskul.selectedIndex = i;
        }

    }


    editIndex = index;


    // Sembunyikan DAFTAR
    btnDaftar.style.display = "none";

    // Tampilkan EDIT
    btnEdit.style.display = "inline-block";
}


// ==========================
// SIMPAN HASIL EDIT
// ==========================
btnEdit.addEventListener("click", function() {

    let kelasDipilih = "";

    for (let i = 0; i < kelas.length; i++) {

        if (kelas[i].checked) {
            kelasDipilih = kelas[i].value;
        }

    }


    if (nama.value.trim() === "") {
        return;
    }

    if (kelasDipilih === "") {
        return;
    }


    data[editIndex] = {

        nama: nama.value,

        kelas: kelasDipilih,

        jurusan: jurusan.options[jurusan.selectedIndex].text,

        ekskul: ekskul.options[ekskul.selectedIndex].text

    };


    editIndex = -1;

    tampilkanData();

    form.reset();


    // Sembunyikan EDIT
    btnEdit.style.display = "none";

    // Tampilkan DAFTAR
    btnDaftar.style.display = "inline-block";
});


// ==========================
// HAPUS DATA
// ==========================
function hapusData(index) {

    data.splice(index, 1);

    tampilkanData();
}
