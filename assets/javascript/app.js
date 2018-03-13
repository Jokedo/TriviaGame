var panel = $('#quiz-area');
var countStartNumber = 30;


//CLICK EVENTS


$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Left: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

//Questions

var questions = [{
  question: "What character wears a red hat with the letter M on it?",
  answers: ["Link", "Mario", "Wario", "Sonic"],
  correctAnswer: "Mario",

}, {
  question: "Who is the main character from Metroid?",
  answers: ["Ash", "Kirby", "Zelda", "Samus"],
  correctAnswer: "Samus",
 
}, {
  question: "What is the name of Donkey Kong's sidekick??",
  answers: ["David Kong", "Bobby Kong", "Diddy Kong", "Daisy"],
  correctAnswer: "Diddy Kong",

}, {
  question: 'Which 2D side scroller had a hero with VFX Powers?"?',
  answers: ["Megaman", "Castlevania", "Viewtiful Joe", "Super Mario Bros"],
  correctAnswer: "Viewtiful Joe",

}, {
  question: 'How many Pokemon is a trainer allow to carry on them?',
  answers: ["11", "6", "4", "8"],
  correctAnswer: "6",

}, {
  question: 'Who is the main villian in the Megaman Series?',
  answers: ["Dr Light", "Dr Right", "Dr Wily", "Captian Smiley"],
  correctAnswer: "Dr Wily",

}, {
  question: "Who is the hero in the Series The Legend of Zelda?",
  answers: ["Zelda", "Ganondorf", "Link", "David"],
  correctAnswer: "Link",

}, {
  question: "What does Mario eat to grow?",
  answers: ["Mushrooms", "Avocado", "Spinach", "Pizza"],
  correctAnswer: "Mushrooms",

}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('GAME OVER');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>No Time Left!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
   

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All Done, heres your score!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.incorrectAnswer();
    }
  },
  incorrectAnswer: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
  

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
   
    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};