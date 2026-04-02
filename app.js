let visor = document.getElementById("visor");
let historico = document.getElementById("historico");

/* ========================= */
/* HISTÓRICO */
/* ========================= */

historico.innerHTML = localStorage.getItem("historico") || "";

reativarEventosHistorico();

function reativarEventosHistorico(){

document.querySelectorAll(".linha-historico").forEach(function(linha){

let estrela = linha.querySelector(".estrela");

estrela.onclick = function(e){

e.stopPropagation();

if(estrela.classList.contains("favorito")){

estrela.classList.remove("favorito");
estrela.innerHTML="☆";
historico.appendChild(linha);

}else{

estrela.classList.add("favorito");
estrela.innerHTML="★";
historico.prepend(linha);

}

salvarHistorico();

};

linha.onclick=function(){

let texto = linha.innerText.split("|")[1];
let partes = texto.split("=");

visor.value = partes[0].trim();

};

});

}

function salvarHistorico(){
localStorage.setItem("historico",historico.innerHTML);
}

/* ========================= */
/* CALCULADORA */
/* ========================= */

function adicionar(valor){
visor.value += valor;
}

function apagarChar(){
visor.value = visor.value.slice(0,-1);
}

function limparVisor(){
visor.value="";
}

function potencia(){ visor.value+="²"; }
function raiz(){ visor.value+="√"; }
function porcentagem(){ visor.value+="%"; }

function calcular(){

if(visor.value==="") return;

try{

let expressaoOriginal = visor.value;
let expressao = visor.value;

expressao = expressao.replace(/\.(?=\d{3})/g,"");
expressao = expressao.replace(/,/g,".");

while(/(\d+(\.\d+)?)\s*([\+\-])\s*(\d+(\.\d+)?)%/.test(expressao)){

expressao = expressao.replace(
/(\d+(\.\d+)?)\s*([\+\-])\s*(\d+(\.\d+)?)%/,
function(match,num1,_,operador,num2){

let porcentagem = (num1*num2)/100;
return num1 + operador + porcentagem;

});

}

expressao = expressao.replace(
/(\d+(\.\d+)?)\s*\*\s*(\d+(\.\d+)?)%/g,
function(match,num1,_,num2){
return num1*(num2/100);
});

expressao = expressao.replace(
/(\d+(\.\d+)?)\s*\/\s*(\d+(\.\d+)?)%/g,
function(match,num1,_,num2){
return num1/(num2/100);
});

expressao = expressao.replace(/√(\d+(\.\d+)?)/g,"Math.sqrt($1)");
expressao = expressao.replace(/√\(/g,"Math.sqrt(");

expressao = expressao.replace(/(\d+(\.\d+)?)²/g,"Math.pow($1,2)");

let resultado = eval(expressao);

if(!isFinite(resultado)){

visor.value="Erro";
return;

}

resultado = Number(resultado.toFixed(8));

let resultadoFormatado = resultado.toLocaleString("pt-BR");

adicionarHistorico(`${expressaoOriginal} = ${resultadoFormatado}`);

visor.value = resultadoFormatado;

}catch{

visor.value="Erro";

}

}

function adicionarHistorico(texto){

let agora = new Date();
let hora = agora.toLocaleTimeString();

let linha = document.createElement("div");

linha.classList.add("linha-historico");

linha.innerHTML=`
<span class="estrela">☆</span>
${hora} | ${texto}
`;

let estrela = linha.querySelector(".estrela");

estrela.onclick=function(e){

e.stopPropagation();

if(estrela.classList.contains("favorito")){

estrela.classList.remove("favorito");
estrela.innerHTML="☆";
historico.appendChild(linha);

}else{

estrela.classList.add("favorito");
estrela.innerHTML="★";
historico.prepend(linha);

}

salvarHistorico();

};

linha.onclick=function(){

let partes = texto.split("=");
visor.value = partes[0].trim();

};

historico.appendChild(linha);

salvarHistorico();

}

function apagarUltimo(){

let linhas = historico.querySelectorAll(".linha-historico");

if(linhas.length>0){

linhas[linhas.length-1].remove();

}

salvarHistorico();

}

function limparHistorico(){

historico.innerHTML="";
salvarHistorico();

}

/* ========================= */
/* TECLADO */
/* ========================= */

document.addEventListener("keydown",function(e){

if(e.key==="Enter") calcular();

if(e.key==="Escape") limparVisor();

});

/* ========================= */
/* TEMA */
/* ========================= */

function alternarTema(){
document.body.classList.toggle("light");
}

/* ========================= */
/* GATO API */
/* ========================= */

async function carregarGato(){

let resposta = await fetch("https://api.thecatapi.com/v1/images/search");

let dados = await resposta.json();

document.getElementById("gatinho").src = dados[0].url;

}

carregarGato();
setInterval(carregarGato,6000);


/* ========================= */
/* BLOCO DE NOTAS */
/* ========================= */

let bloco=document.getElementById("blocoNotas");

if(bloco){

bloco.value=localStorage.getItem("notas")||"";

bloco.addEventListener("input",function(){

localStorage.setItem("notas",bloco.value);

});

}

function tocarSom(){
    let som = new Audio("audio/Miad0.mp3");
    som.volume = 0.05;
    som.play();

     setTimeout(() => {
        som.pause();
        som.currentTime = 0;
    }, 1000); // 1 segundo
}

document.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON"){
        tocarSom();
    }
});

let numerosRodape = [7,1,5,4,9,3,8,6,2];
let indexRodape = 0;

let elRodape = document.getElementById("numero-rodape");

setInterval(() => {

    elRodape.classList.add("girar");

    elRodape.innerText = numerosRodape[indexRodape];

    setTimeout(() => {
        elRodape.classList.remove("girar");
    }, 300);

    indexRodape++;

    if(indexRodape >= numerosRodape.length){
        indexRodape = 0;
    }

}, 500);

let banner = document.getElementById("bannerNumeros");

// duplica automaticamente o conteúdo
banner.innerHTML += banner.innerHTML;