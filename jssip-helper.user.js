// ==UserScript==
// @name           JsSIP Helper 
// @namespace      http://jssip 
// @author         jmort253 (http://stackoverflow.com/users/552792)
// @description    Adds a "memory" to the JsSIP demo so we don't have to keep re-entering our credentials over and over and over again.
// @homepage       http://
// @copyright      2013, James Mortensen (http://stackoverflow.com/users/552792/jmort253) 
// @license        MIT License or BSD License
// @version        1.4
// @include        http://tryit.jssip.net*
// @history        1.0 initial release to the public
// @history        1.1 fixed bug where fields showed "undefined" if pressing enter key after logging in.
// @history        1.2 limit script to only run on the TryIt Demo website
// @history        1.3 bug in Chrome userscript platform - include/exclude headers are ignored, so we filter out * manually.
// @history        1.4 removed exclude header; bind keypress to login form only to avoid running when using dynamic accounts.
// @history        1.4 also cleared value of dynamic account form on Firefox reload.
// @history        1.4 changed license to MIT License to be 100% compatible with JsSIP.
// ==/UserScript==


// bug: exclude/include userscript headers don't work in Chrome, so we filter manually
if(window.location.hostname == "tryit.jssip.net") {

	function with_jquery(f) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.textContent = "(" + f.toString() + ")(jQuery)";
		document.body.appendChild(script);
	};


	with_jquery(function($) {

        /*  this could be added to init.js at the beginning of document.ready
         *  to integrate script with tryit.jssip.net, then run rememberLogin() 
         */
        function rememberLogin() {
        
            /* Firefox automatically remembers input values on refresh, so we clear
             * this out explicitly.
             */
            $('#login-form-from-invitation input.display_name').val("");

			var display_name = window.localStorage.getItem("display_name");
			var sip_uri = window.localStorage.getItem("sip_uri");
			var sip_password = window.localStorage.getItem("sip_password");
			var ws_uri = window.localStorage.getItem("ws_servers");

		

			if(sip_uri != null) {

				$('#display_name').val(display_name);
				$('#sip_uri').val(sip_uri);
				$('#sip_password').val(sip_password);
				$('#ws_servers').val(ws_uri);

			}
		

			$('#login-form').keypress(function(e) { 
				//console.log(e.keyCode);
				if(e.keyCode == 13) {
			
					window.localStorage.setItem("display_name", $('#display_name').val());
					window.localStorage.setItem("sip_uri", $('#sip_uri').val());
					window.localStorage.setItem("sip_password", $('#sip_password').val());
					window.localStorage.setItem("ws_servers", $('#ws_servers').val());
				} 
			});
        }
        
        // run this in document.ready in init.js, right after defining the above function.
        rememberLogin();
         
	});
}
