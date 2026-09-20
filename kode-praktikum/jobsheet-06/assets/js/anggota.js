// Mengambil & menampilkan Daftar Anggota secara asinkron dari data/anggota.json
async function muatDaftarAnggota(urlJson, keys) {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const res = await fetch(urlJson);
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const dataList = await res.json();

        dataList.forEach(function (item) {
            const tr = document.createElement("tr");
            let cellContent = "";
            keys.forEach(function (key) {
                cellContent += "<td>" + (item[key] !== undefined ? item[key] : "") + "</td?";
            });

            cellContent += `
                <td>
                    <button type="button" class="btn-edit">Edit</button>
                    <button type="button" class="btn-hapus">Hapus</button>
                </td>`;

            tr.innerHTML = cellContent;
            tbody.appendChild(tr);
            
        });
    } catch (err) {
        tbody.innerHTML = 
            `<tr><td colspan="${keys.length + 1}">Gagal memuat data: ${err.message}</td></tr>`;
    } finally {
        if (loading) loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    muatDataTabel("../data/anggota.json", ["no_anggota", "nama", "alamat", "no_hp"]);
});
