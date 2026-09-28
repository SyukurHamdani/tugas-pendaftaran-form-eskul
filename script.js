let data = [];
let editIndex = -1;

const form = document.querySelector("form");

const nama = document.getElementById("nama");

const kelas = document.getElementsByName("kelas");

const jurusan = document.getElementById("jurusan");

const ekskul = document.getElementById("daftar ekskul");

const tabel = document.querySelector("table");

const btnDaftar = document.getElementById("btntambah");

const btnEdit = document.getElementById("btnedit");


// ==========================
// TOMBOL AWAL
// ==========================

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


    // Tambah data baru
    if (editIndex === -1) {

        data.push(siswa);

    }


    tampilkanData();

    form.reset();


    // Balik ke tombol DAFTAR
    btnDaftar.style.display = "inline-block";

    btnEdit.style.display = "none";

});


// ==========================
// MENAMPILKAN DATA
// ==========================

function tampilkanData() {

    // Hapus isi tabel lama
    while (tabel.rows.length > 1) {

        tabel.deleteRow(1);

    }


    // Masukkan data
    for (let i = 0; i < data.length; i++) {

        let baris = tabel.insertRow();


        // NO
        baris.insertCell(0).innerHTML = i + 1;


        // NAMA
        baris.insertCell(1).innerHTML = data[i].nama;


        // KELAS
        baris.insertCell(2).innerHTML = data[i].kelas;


        // JURUSAN
        baris.insertCell(3).innerHTML = data[i].jurusan;


        // EKSKUL
        baris.insertCell(4).innerHTML = data[i].ekskul;


        // AKSI
        let aksi = baris.insertCell(5);


        // ==========================
        // TOMBOL EDIT
        // ==========================

        let tombolEdit = document.createElement("button");

        tombolEdit.type = "button";

        tombolEdit.innerHTML = "EDIT";

        tombolEdit.className = "btn-edit";


        tombolEdit.onclick = function() {

            editData(i);

        };


        // ==========================
        // TOMBOL DELETE
        // ==========================

        let tombolDelete = document.createElement("button");

        tombolDelete.type = "button";

        tombolDelete.innerHTML = "DELETE";

        tombolDelete.className = "btn-delete";


        tombolDelete.onclick = function() {

            hapusData(i);

        };


        aksi.appendChild(tombolEdit);

        aksi.appendChild(tombolDelete);

    }

}


// ==========================
// EDIT DATA
// ==========================

function editData(index) {

    let siswa = data[index];


    // Nama
    nama.value = siswa.nama;


    // Kelas
    for (let i = 0; i < kelas.length; i++) {

        kelas[i].checked = kelas[i].value === siswa.kelas;

    }


    // Jurusan
    for (let i = 0; i < jurusan.options.length; i++) {

        if (jurusan.options[i].text === siswa.jurusan) {

            jurusan.selectedIndex = i;

        }

    }


    // Ekskul
    for (let i = 0; i < ekskul.options.length; i++) {

        if (ekskul.options[i].text === siswa.ekskul) {

            ekskul.selectedIndex = i;

        }

    }


    // Simpan index data yang diedit
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


    // Update data
    data[editIndex] = {

        nama: nama.value,

        kelas: kelasDipilih,

        jurusan: jurusan.options[jurusan.selectedIndex].text,

        ekskul: ekskul.options[ekskul.selectedIndex].text

    };


    // Keluar dari mode edit
    editIndex = -1;


    // Tampilkan data terbaru
    tampilkanData();


    // Kosongkan form
    form.reset();


    // Sembunyikan EDIT
    btnEdit.style.display = "none";


    // Tampilkan DAFTAR
    btnDaftar.style.display = "inline-block";

});


function hapusData(index) {

    data.splice(index, 1);

    tampilkanData();

}