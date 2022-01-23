
							// MANAGING LANGUAGE PREFERENCE WITH COOKIES
	function set_fr(){
			localStorage.setItem("lang_pref", "FR");
	}
	function set_en() {
			localStorage.setItem("lang_pref", "EN");
		}

	function set_lang(){

		if(localStorage.getItem("lang_pref") === "FR"){
			window.location.href = "#FR";
		}
		else if (localStorage.getItem("lang_pref") === "EN") {
			window.location.href = "#EN";
		} else {
			window.location.href = "#FR";
		}
		detect_lang_change();
	}
				// SETTING VARIABLES
	var dataReload = document.querySelectorAll("[data-reload]");
	var language = {
		fr: {
			visionPage: "Music Dealers croit que le succès de la culture urbaine marocaine serait collectif ou ne serait jamais. Produire des artistes en donnant une propre identité musicale est notre mission, qui fait la paire avec notre vision dont donner la visibilité à plusieurs genres musicaux et imposer nos sonorités au-delà des frontières. Aidez à montrer au monde la puissance de notre culture et le potentiel de notre mouvement, en équipe.",
			labelIntro : "Rapper plus pour gagner plus. Nous sommes la voix de la rue, le son d'une fraternité, un label où la fidélité aux racines passe avant tout. Nos artistes sont plus que de simples artistes, ce sont des visionnaires, des innovateurs qui partagent leurs histoires et leurs ambiances à travers la musique qu'ils créent, et notre travail en tant que label est de s'assurer que vous, le public, obtenez l'expérience complète et s'intégrer dans notre univers. Les histoires, que nous racontons, méritent d'être bien entendues, et 7 est notre conférencier."
				},
		en: {
			visionPage: "We here at music dealers believe that the success of the Moroccan urban culture depends on collectives. We help push artists from all genres, with different visions and ideas, to help impose the marginalized and break the sonic boundaries that hold them in place. Help show the world the power of our culture and the potential of our movement, as a team.",

			labelIntro : "Rap more to earn more. We are the voice of the street, the sound of a brotherhood, a label where loyalty to roots comes first. Our artists are more than just artists, they are visionaries, innovators who share their stories and moods through the music they create, and our job as a label is to make sure that you, the audience, get the full experience and fit into our universe. The stories we tell deserve to be heard, and 7 is our speaker."
		}
	};

				// ON CLICK ACTION TO CHANGE LANGUAGE
	function detect_lang_change(){

	if (window.location.hash) {
		if (window.location.hash === "#FR") {
				document.getElementById("captcha_api").setAttribute("src","https://www.google.com/recaptcha/api.js?hl=fr");
				set_fr();
				document.getElementById("lang").setAttribute("value","fr-FR");
				visionInfo.textContent = language.fr.visionPage
				labelIntro.textContent = language.fr.labelIntro
				document.getElementById("nom").placeholder = "Nom";
				document.getElementById("email").placeholder = "Adresse Email";
				document.getElementById("subject").placeholder = "Sujet";
				document.getElementById("message").placeholder = "Ecrivez-nous ici !";
				document.getElementById("submit_btn").value = "Envoyer";
				
				
		};
		if (window.location.hash === "#EN") {
				document.getElementById("captcha_api").setAttribute("src","https://www.google.com/recaptcha/api.js?hl=en");
				set_en();
				document.getElementById("lang").setAttribute("value","en-US");
				visionInfo.textContent = language.en.visionPage;
				labelIntro.textContent = language.en.labelIntro
				document.getElementById("nom").placeholder = "Name";
				document.getElementById("email").placeholder = "E-mail";
				document.getElementById("subject").placeholder = "Subject";
				document.getElementById("message").placeholder = "Write us here !";
				document.getElementById("submit_btn").value = "Send";

			
			
		};
	};
				// RELOAD AFTER SELECTION
	for (i = 0; i <= dataReload.length - 1; i++) {
		dataReload[i].onclick = function () {
			setTimeout(function () {
				location.reload(true);
			}, 500) // adjust the timer that works for you (1000 = 1 second)
		}
	}
}
			detect_lang_change();


						// CONTACT FORM ERRORS AND LANGUAGE PREFERENCES AND BUTTON ACTION

 		
							var recaptcha_response = '';
							
							function submitUserForm() {
								if (recaptcha_response.length == 0) {

									if (document.getElementById("lang").getAttribute("value") === "en-US") {
										document.getElementById('response-output').innerHTML = '<span style="color:red;">This field is required.</span>';

									} else if (document.getElementById("lang").getAttribute("value") === "fr-FR") {
										document.getElementById('response-output').innerHTML = '<span style="color:red;">Ce champ est requis.</span>';
									}

									return false;
								}
								if (document.getElementById("lang").getAttribute("value") === "en-US") {

									document.getElementById("submit_btn").value = "Sent !";
									document.getElementById("submit_btn").style.background = 'rgb(180, 227, 61)';


									setTimeout(function () {
										document.getElementById("submit_btn").value = "Send";
										document.getElementById("submit_btn").style.background = '#fff'
									}, 4000);
								}
								else if (document.getElementById("lang").getAttribute("value") === "fr-FR") {

									document.getElementById("submit_btn").value = "Envoyé !";
									document.getElementById("submit_btn").style.background = 'rgb(180, 227, 61)';


									setTimeout(function () {
										document.getElementById("submit_btn").value = "Envoyer";
										document.getElementById("submit_btn").style.background = '#fff'
									}, 4000);
								}

								setTimeout(function () {
									document.getElementById("contactForm").reset();
									grecaptcha.reset();
								}, 2000);
								return true;
							}

							function verifyCaptcha(token) {
								recaptcha_response = token;
								document.getElementById('response-output').innerHTML = '';
							}