//jQuery da form nome:
jQuery.noConflict()
$(document).ready(function(){
  console.log("deu certo")
})

$(function(){
$('.trocar').on('click', function(){

	var valor = $('input').attr('name', 'nome').val();

	$("#form").html(valor);


})
})
//*****************************************************************************
//sorteio do dado: funcionando
userDice = "";
userRoll = function() {
  diceSides = 6
  userDice = Math.floor((Math.random() * diceSides )+1);
  document.getElementById("diceresult").innerHTML = userDice;
  }
document.getElementById("diceroll").addEventListener("click", userRoll );
document.getElementById("diceroll").disabled = true

// Jogador: funcionando
function User(name) {

	var coins = 10;
	var pv = 10;
  var pf = 2;

	this.getCoins = function() { return coins; }
	this.setCoins = function(x) { coins += x; }

	this.getPV = function() { return pv; }
	this.setPV = function(x) { pv += x; }

  this.getPF = function() { return pf; }
	this.setPF = function(x) { pf += x; }
}

var user = new User(name);

//exibir as moedas:
var changeCoins = function() {
  document.getElementById("usercoins").innerHTML = user.getCoins();
};
changeCoins();
//apenas para teste
console.log(userPV);
//exibir os PV:
var changePV = function() {
  document.getElementById("userPV").innerHTML = user.getPV();
};
changePV();
//apenas para teste
console.log(userPF);
//exibir os PV:
var changePF = function() {
  document.getElementById("userPF").innerHTML = user.getPF();
};
changePF();


//Página inicial:
function noButtons() {
    document.getElementById("bfight").style.display = "none";
    document.getElementById("bpay").style.display = "none";
    document.getElementById("brun").style.display = "none";
}
noButtons();
var introduction = "Seja bem vindo ao Lute, pague ou corra! <br>\
<br> Clique no botão abaixo para começar!"
document.getElementById("story").innerHTML = introduction;
//Primeira página

function changePage1() {
    var page1 = "Vamos explicar como funciona. <br>\
    Ao longo de sua jornada, você irá encontrar agressores terríveis, e para \
    combatê-los, poderá lutar, comprar um adicional (pagar) ou tentar fugir. <br>\
    Para lutar, role o dado. Seu dado + seus pontos de força = dano.\
    <br> Os adicionais se somam aos seus pontos de força, ok? <br> Já para \
    fugir... Vai ter que tirar 6. :( Tire 1 ou 2 e é morte na certa. 3, 4 ou 5,\
    você perde metade dos seus pontos de vida. Vai arriscar? Clique em Começar \
    novamente para >realmente< começar!"
    document.getElementById("story").innerHTML = page1;
    document.getElementById("start").addEventListener("click", changePage2 );
};

document.getElementById("start").addEventListener("click", changePage1 );
//Primeira fase
function comeBackButtons(){
  document.getElementById("bfight").style.display = "inline-block";
  document.getElementById("bpay").style.display = "inline-block";
  document.getElementById("brun").style.display = "inline-block";
  document.getElementById("start").style.display = "none";
}

function Fight(){
  document.getElementById("diceroll").disabled = false
  var text = "Clique para rolar o dado e boa sorte!"
  document.getElementById("story").innerHTML = text;
  function Fight2(){
  var totalDamage = userDice + user.getPF();
  console.log(totalDamage);

  if (totalDamage >= beholderPV) {
    //mensagem de você venceu
    var totalCoins = user.setCoins(beholderCoins);
    console.log(user.getCoins())
    changeCoins();
    changePage3();
  } else {
    //msg de você perdeu
    user.setPV(totalDamage - beholder.getPV());
    console.log(user.getPV())
    changePV();
    changePage4();
    if (user.getPV() <= 0) {
    //msg de game over
    changePV();
    changePage5();
    }
  }
}
document.getElementById("diceroll").addEventListener("click", Fight2 );
}

function Pay(){
  noButtons();
  var text = "Se você quiser, pode pagar 10 moedas para aumentar 2 pontos de \
  força. Você deseja pagar? <br> <span id='sim'>Sim!</span> <br> <span id='nao'>\
  Não...</span> <br> <span id='continue'> Clique para voltar </span>"
  document.getElementById("story").innerHTML = text;
  document.getElementById("sim").addEventListener("click", payyes )
  document.getElementById("nao").addEventListener("click", payno )
  function payyes (){
    user.setCoins(-10);
    user.setPF(2);
    console.log(user.getCoins());
    changeCoins();
    console.log(user.getPF());
    changePF();
    document.getElementById("continue").addEventListener("click", changePage2 )
  }
  function payno (){
    document.getElementById("continue").addEventListener("click", changePage2 )
  }
}
function Run(){
    document.getElementById("diceroll").disabled = false
    var text = "Você deve estar numa situação bem ruim.... Clique no dado para\
    rolar e boa sorte!"
  document.getElementById("story").innerHTML = text;
  function Run2(){
  console.log(userDice)
  if (userDice === 6) {
    var text2 = text + "<br> OH MY VOCÊ CONSEGUIU!!!!! <span id='continuar'>Clique\
    para continuar no jogo</span>"
    document.getElementById("story").innerHTML = text2;
    document.getElementById("continuar").addEventListener("click", changePage2 );
  } else if (userDice === 1){
    changePage5();
  } else if (userDice === 2){
    changePage5();
  } else {
    var text3 = text + "<br> OUCH. Perdeu metade da vida heim... Mas\
    <span id='continuar'>clique para continuar no jogo</span>"
    document.getElementById("story").innerHTML = text3;
    document.getElementById("continuar").addEventListener("click", changePage2 );
    user.setPV((user.getPV())/2*-1)
    changePV();
  }
}
document.getElementById("diceroll").addEventListener("click", Run2 );
}

//funcionando:
function Monster(name, coins, pv) {
  this.name = name;
  var coins = coins;
  var pv = pv;

  this.getCoins = function () { return coins; }
  this.getPV = function() { return pv; }
}
//exemplo:
var beholder = new Monster("Beholder", 10, 5);
var beholderPV = beholder.getPV();
var beholderCoins = beholder.getCoins();
//só pra nao confundir, alterei até aqui /\
function changePage2() {
  comeBackButtons();
  var page2 = "> Querido jogador, essa é a primeira versão do jogo, só existe\
  essa fase por enquanto. < Você estava andando pela mesa do escritório quando\
   de repente, surge um GRAMPEADOR querendo te matar! E aí, vai fazer o que? "


  document.getElementById("story").innerHTML = page2;
  document.getElementById("bfight").addEventListener("click", Fight )
  document.getElementById("bpay").addEventListener("click", Pay )
  document.getElementById("brun").addEventListener("click", Run )
}

function changePage3() {
  document.getElementById("usercoins").innerHTML = user.getCoins();
  var page3 = "Parabéeens, você derrotou o monstro GRAMPEADOR e ganhou o jogo!\
  Atualize a página para jogar do início ou clique em começar para lutar\
  novamente!"
  document.getElementById("story").innerHTML = page3;
  document.getElementById("start").addEventListener("click", changePage2 );
  noButtons();
  document.getElementById("start").style.display = "inline-block"

}
function changePage4() {
  var page3 = "Infelizmente o GRAMPEADOR te atingiu e te machucou um pouco :( \
    Se ainda tiver vida e coragem suficiente, clique em começar para lutar \
    novamente. Se quiser começar de novo, atualize a página!"
  document.getElementById("story").innerHTML = page3;
  document.getElementById("start").addEventListener("click", changePage2 );
  noButtons();
  document.getElementById("start").style.display = "inline-block"
}
function changePage5() {
  var page3 = "O GRAMPEADOR é um monstro muito forte e infelizmente te matou..\
  Espero que você descanse em paz e atualize a página para jogar de novo!"
  document.getElementById("story").innerHTML = page3;
  noButtons();
}
