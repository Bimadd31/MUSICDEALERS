
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
			set_fr();
			visionInfo.textContent = language.fr.visionPage;
		};
		if (window.location.hash === "#EN") {
			set_en();
			visionInfo.textContent = language.en.visionPage;
		};
	};
				// RELOAD AFTER SELECTION
	for (i = 0; i <= dataReload.length - 1; i++) {
		dataReload[i].onclick = function () {
			setTimeout(function () {
				location.reload(true);
			}, 1000) // adjust the timer that works for you (1000 = 1 second)
		}
	}
}
			detect_lang_change();