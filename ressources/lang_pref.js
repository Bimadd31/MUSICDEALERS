
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
			window.location.href = "#EN";
		}
		detect_lang_change();
	}
				// SETTING VARIABLES
	var dataReload = document.querySelectorAll("[data-reload]");
	var language = {
		fr: {
			visionPage: "PUT FRENCH VERSION TEXT"
				},
		en: {
			visionPage: "PUT ENGLISH VERSION TEXT"
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