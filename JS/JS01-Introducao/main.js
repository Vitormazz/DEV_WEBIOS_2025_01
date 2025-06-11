var idade
// JavaScript
console.log("Hello World") //apresentar uma mensagem
console.clear() //limpar


// Variaveis
 var numero1 = 192 //inicializar uma variavel
 console.log(numero1)
 

 var num1 = 4
 var num2 = 4

 console.log(num1 + num2)


 idade = 89 // iniciar a variavel em outra parte do codigo
 console.log(idade)

 // textos
var nome1 = "Vitor Augusto "
var nome2 = "Everton Santana "
var nome3 = "123456789 " // texto
console.log(nome1)
console.log(nome2)
console.log(nome3)


console.log("Olá" + "papai") // concatenar
console.log("Aluno " + nome1 + "e Aluno " + nome2 + "Tem um total de " + nome3 + "dinheiros")

//templete String
console.log(`Aluno ${nome1} e Aluno ${nome2} Tem um total de ${nome3} dinheiros`) 

//operadores
var valor1 = 5
var valor2 = 5
console.log(valor1 + valor2)
console.log(valor1 - valor2)
console.log(valor1 * valor2)
console.log(valor1 / valor2)
console.log(valor1 ** valor2)


//operador relacionais 
console.log(5 == 5)
console.log(5 > 5)
console.log(22 < 8)
console.log(22 >= 22)
console.log(22 != 23)
console.log("Ana" == "ana")
console.log(true == "true")
console.log(true === "true" )
console.log(true != "false")

let temCamisa = false 
let temCracha = true
console.log(temCamisa)
console.log(temCracha)
console.log(temCamisa == true && temCracha == true) // &&  false    == true = barrado
console.log(temCamisa == true || temCracha == true) // false == true = flexivel deixa passar





//VAR // Flexivel e com menos regras (Posso alterar o valor inicial de uma var e recriar a mesma e outras partes dos codigo)

//LET // Voce não ppode recriar a mesma em outras partes do codigo com o mesmo nome, mas pode chamar e alterar o valor inicial

//CONST // Voce não pode recriar a mesma em outras partes do codigo e não pode alterar o valor inicial dela garantindo  confiança do dado que está sendo utilizado no decorrer do seu codigo  

// Operador de atribuição
var x = 3
var y = 2
x = x + y 
// x += y formato contraido
// x = 3 + 2 
console.log(x)


x = 720
console.log(x)


// log > para mostrar os resultados, mensagens do sistema 
// clear > limpar o console e deixar disponivel para nova mensagens 

console.clear()

console.log("Tecnology")
console.log("Filosofico")


console.error("Não use essa tela, você pode ser punido isso")
console.warn("Mas apresenta uma mensagem em amarelo")

