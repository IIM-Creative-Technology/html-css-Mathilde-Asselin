
//- - - - - - - Javascript pour apparition du Pop-up - - - - - - - - - -

document.getElementById('Valider').addEventListener('click', function() {

	document.getElementById('Pop-Up').style.display = 'none';
	document.getElementById('MainSondage').style.visibility = 'visible';

	//Permet de récupérer le nom indiqué dans Pop-up
	var prenom = document.getElementById('prenom').value;

	//Permet d'afficher le nom indiqué dans Pop-up
	var titre = document.getElementsByTagName('span')[0];
	titre.innerHTML = prenom;



//- - - - - - - Javascript pour apparition du Sondage - - - - - - - - - - 

(function(){

  // Fonctions

  function buildQuiz(){

    // Stocker le HTML

    const output = [];

    // Pour chaque question...

    myQuestions.forEach(

      (currentQuestion, questionNumber) => {

        // Variable qui determine le nombre de questions...
        const answers = [];

        // et pour chaque question des réponses ...
        for(letter in currentQuestion.answers){

          // ... ajoute un bouton HTML
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // Ajoute questions et réponses à la sortie
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // Combiner notre liste de sortie en une chaîne HTML et la mettre sur la page

    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // Rassembler réponses

    const answerContainers = quizContainer.querySelectorAll('.answers');

    // Mettre nombre de bonnes réponses à 0

    let numCorrect = 0;

    // Pour chaque question ...

    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // Trouver bonne réponse

      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // Si la réponse est juste

      if(userAnswer === currentQuestion.correctAnswer){

        // Augmenter nombre de bonne réponse à la fin

        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';

      }
      // Si réponse fausse ou vide

      else{

        // color the answers red

        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // Indique le nombre de bonnes réponses
    resultsContainer.innerHTML = `Nombre de bonnes réponses : ${numCorrect} sur ${myQuestions.length}`;

      	function calculer(){

		var Pourcentage = (numCorrect / myQuestions) * 100;
		 
		alert(Pourcentage + '% ont dit oui !');
	}
  }

  // ShowSlide pour passer d'une slide à l'autre

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables et questions du sondage 

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Ou se déroule la 5eme saison des Marseillais vs le reste du monde ?",
      answers: {
        a: "Palma de Majorque",
        b: "Marbella",
        c: "Les Adrets-de-l'Estérel",
        d: "Portugal"
      },
      correctAnswer: "c"
    },
    {
      question: "Qui sera la bookeuse de cette année ?",
      answers: {
        a: "David Lantin",
        b: "Catalina Rasami",
        c: "Ariane Carletti"
      },
      correctAnswer: "b"
    },
    {
      question: "Qui sera la vainqueur de cette saison ?",
      answers: {
        a: "Marseillais",
        b: "Le reste du monde",
        c: "Ils seront ex aequo"
      },
      correctAnswer: "a"
    }
  ];

  // - - - - - - - - - - - - -

  buildQuiz();

  // Pagination

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Montre la première slide du SlideShow

  showSlide(currentSlide);

  // Différents boutons et leurs fonctions

  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

});
