//window.alert("Digite um número de 1 a 10")

//window.prompt("Digite um némero de um 1 a 10")

//window.setTimeout(mensagem, 2500)

function Mensagem(){
    alert("Aprendendo DOM com JS")
    alert(Date())
}




let tagh1 = document.createElement("h1")
// innerHTML > para adicionar uma informação dentro das tags do html
tagh1.innerHTML = "Olá Mundo, crie você"
// A quem ela vai pertencer 
document.body.appendChild(tagh1)