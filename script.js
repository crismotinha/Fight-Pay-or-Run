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
	var pv = 4;
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

//Monstros: funcionando
function Monster(name, coins, pv, pf) {
  this.name = name;
  var coins = coins;
  var pv = pv;
  var pf = pf;

  this.getCoins = function () { return coins; }
  this.getPV = function() { return pv; }
}
//Monstros:
var clips = new Monster ("Clips", 2, 1);
var beholder = new Monster("Beholder", 100, 4);

//
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

  if (totalDamage >= monsterPV) {
    var text ="Parabéns! Você derrotou o monstro! Sendo assim, você levou \
    " + monsterCoins + "moedas! <span id='continue'>Clique para continuar\
    !</span>"
    var totalCoins = user.setCoins(monsterCoins);
    console.log(user.getCoins())
    changeCoins();
    document.getElementById("story").innerHTML = text
    document.getElementById("continue").addEventListener("click", changePage2 )
  } else {
    var text ="Infelizmente você perdeu, e tomou um dano de " +
    (totalDamage - monsterPV) + "! Mas siga em frente, você consegue!\
    <span id='continue'>Clique para continuar!</span>"
    user.setPV(totalDamage - monterPV);
    console.log(user.getPV())
    changePV();
    document.getElementById("story").innerHTML = text
    document.getElementById("continue").addEventListener("click", changePage2 )
    if (user.getPV() <= 0) {
    //msg de game over
    changePV();
    changePageDie();
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
  } else if (userDice === 1 && userDice === 2 ) {
    changePageDie();
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
function changePage2() {
  comeBackButtons();
  var text = 'E quando você menos espera, um CLIPS vem pra cima de você!!!!\
  Pelo tamanho dele, não deve ser muito forte... E aí, o que você vai fazer?'
  var monsterCoins = clips.getCoins();
  var monsterPV = clips.getPV();
  document.getElementById("story").innerHTML = text;
  document.getElementById("bfight").addEventListener("click", Fight )
  document.getElementById("bpay").addEventListener("click", Pay )
  document.getElementById("brun").addEventListener("click", Run )
}

function changeFase1() {
  comeBackButtons();
  var page2 = "Você vai lutar com o Beholder pois é o unico que criei até agora.\
  <span id='teste5'></span>  "

  document.getElementById("story").innerHTML = page2;
  document.getElementById("bfight").addEventListener("click", Fight )
  document.getElementById("bpay").addEventListener("click", Pay )
  document.getElementById("brun").addEventListener("click", Run )
}

function changePageIntro() {

  var text = "Você acorda, e ao olhar para baixo, descobre que saiu do papel.\
  Você não entende como isso aconteceu, nem como criou consciência! Mas o fato\
   é que você é um boneco de palitos que criou vida. E não foi só você!<br> -Uma \
   bolsinha de moedas também, menos mal<br> você pensa, mesmo sem saber direito \
   pra que servem as moedas... Você continua seguindo pela mesa, explorando..\
   "
   document.getElementById("story").innerHTML = text ;
   document.getElementById("start").style.display = "inline-block"
   document.getElementById("start").addEventListener("click", changePage2 );
}

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
    document.getElementById("start").addEventListener("click", changePageIntro );
};

function changePageDie() {
  var text = "Infelizmente, o monstro te atacou ferozmente. Você não conseguiu\
  resistir aos ferimentos e faleceu. Meus pêsames :( <br> Caso queira jogar\
    de novo, basta atualizar a página! "
  document.getElementById("story").innerHTML = text;
  noButtons();
  document.getElementById("diceroll").disabled = true
}
