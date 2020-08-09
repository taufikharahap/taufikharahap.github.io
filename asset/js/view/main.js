document.addEventListener("DOMContentLoaded", function() {

    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
    const idParam = urlParams.get("id");
    const btnSave = document.getElementById("save");

    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';
        // ambil artikel lalu tampilkan
        getSavedTeamById();
    } else {
        const getDataById = getInfoTeamById();
        const readDataDB = getAll()

        // Hide fab jika team sudah tersimpan
        readDataDB.then(function(teams) {
            console.log(teams);
            teams.map(function(team){
                if(team.id == idParam){
                btnSave.style.display = 'none';
                } 
            })
        })

        // tombol save(penyimpan team ke page saved) di page info-html
        btnSave.onclick = function() {
            console.log("Tombol FAB di klik.");
            getDataById.then(function(team) {
            saveForLater(team);

            let notifikasi = document.getElementById("notifikasi");
            notifikasi.innerHTML=`
                <div class="alert">
                <span class="closebtn" id="close" onclick="this.parentElement.style.display='none';">&times;</span>  
                <strong>Success!</strong> Team telah disimpan ke halaman saved.
                </div>`;
            });
        };
    }

});