let atividadeEntregue = false
let diaFinalEntregue = 19
let mensagemPrabens = "Prabéns, pnc"
if(atividadeEntregue == true){
  console.log("")
  if(diaFinalEntregue <= 13){
   console.log("Entregou a atividade na data, não fez mais que a obrigação")
  }
else{
    console.log("Entregou a atividade fora da data, infelizmente você reprovou. Obrigado")
  }
   //true
}

else if(atividadeEntregue == false){
    console.log("Ops, vai pra merda você não entregou") // false
}
else{
    console.log("Você inseriu uma informação invalida animal")
}

let nota = 6.9
// se a nota for igual ou acima de 7 então o aluno passou na materia 
// se não se a nota for menor ou igual a 6.9 o aluno vai ficar de recuperação 
if(nota >= 7){

   console.log("Passou na materia")
}else{
  console.log(" Vai ficar de recuperação")
}

nota >= 7 ? console.log("Passou na materia") : console.log("Vai ficar de recuperação")

