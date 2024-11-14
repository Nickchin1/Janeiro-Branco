function mostrar(){
    let cmt = document.getElementById("cmt").value;
    let email = document.getElementById("email").value;

    let nome = document.getElementById("nome").value;

    document.getElementById("com").innerHTML = cmt +nome +email;

    }
    