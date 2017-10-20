const session = checkSession().session;
console.log(session);

function _initElements(){
	if(!session){
				$('.main_title').text('Login Page');
				$('.form_container').append(login_template);

				let loginBtn = $('#login_btn');
				let registerBtn = $('#register_btn');

				let loginEmpty = true;
				let passEmpty = true;

				function tryDisableBt(){
					if(!loginEmpty && !passEmpty){
						loginBtn.prop( "disabled", false );
						registerBtn.prop( "disabled", false );
					}
					else{
						loginBtn.prop( "disabled", true );
						registerBtn.prop( "disabled", true );
					}
				}

			   $("#loginInput").on('input',function() {
			  		if( $(this).val() ) {                      
				         loginEmpty = false;
				         tryDisableBt();
				    } else{
				    	loginEmpty = true;
				    	tryDisableBt();
				    }
				});
			   $("#passInput").on('input',function() {
			  		if( $(this).val() ) {                   
				         passEmpty = false;
				         tryDisableBt();
				    }
				    else{
				    	passEmpty = true;
				    	tryDisableBt();
				    }
				});

			   registerBtn.click(function(event){
			   	$('#errorId').remove();
			   	let login = $("#loginInput").val();
			   	let pass = $("#passInput").val().hashCode();
			   $.ajax
			    ({
			        type: "POST",
			        //the url where you want to sent the userName and password to
			        url: '/createAccount',
			        contentType : 'application/json',
			        async: false,
			        //json object to sent to the authentication url
			        data: JSON.stringify({login: login, password: pass}),
			        success: function (response) {
			        	$('.input_form').append("<div id=\"errorId\">User created!</div>");
			        },
			        error: function(){
					    $('.input_form').append("<div id=\"errorId\">Error, try again</div>");
					}
			    })
			   });


			   loginBtn.click(function(event){
			   	$('#errorId').remove();
			   	let login = $("#loginInput").val();
			   	let pass = $("#passInput").val().hashCode();
			   $.ajax
			    ({
			        type: "POST",
			        //the url where you want to sent the userName and password to
			        url: '/login',
			        contentType : 'application/json',
			        async: false,
			        //json object to sent to the authentication url
			        data: JSON.stringify({login: login, password: pass}),
			        success: function (response) {
			        	saveToLocalStorage({token: response.token,login: login});
			        	location.reload();
			        },
			        error: function(){
					    $('.input_form').append("<div id=\"errorId\">Bad credentials</div>");
					}
			    })
			   });

	}
	else{
					$('.main_title').text('Home Page');
					$('.form_container').append(home_template);
					getTexts((err,data)=>{
						$.each(data, function (i, item) {
    						$('#pub_select').append($('<option>', { 
							        value: item.id,
							        text : item.name 
							}));
						});
					});	
					
					$( "select" )
					  .change(function() {
					    $('.text_area').text('');
					    let str = "";
					    let id;
					    $( "select option:selected" ).each(function() {
					      str += $( this ).text() + " ";
					      id = $(this).val();
					    });
					    $(".name_text").text( str );
					    loadText(id,(err,text)=>{
					    	$('.text_area').text(text);
					    })
					  })
					  .trigger( "change" );


					let logOutBtn = $('#logut');
					logOutBtn.click(function(event){
				   		localStorage.clear();
				   		location.reload();

  					 });
	}
}
	

   

String.prototype.hashCode = function(){
    let hash = 0;
    for (let i = 0; i < this.length; i++) {
        let character = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


function saveToLocalStorage(response){
	for (let key in response){
		localStorage.setItem(key, response[key]);
	}

}

function checkSession() {
	const login = localStorage["login"];
	const token = localStorage["token"];
	return (login && token) ? {token: token, login: login, session: true} : {session: false};
}


function getTexts(callback){
	$.ajax
	    ({
	        type: "GET",
	        //the url where you want to sent the userName and password to
	        url: '/getAllTexts',
	        contentType : 'application/json',
	        async: false,
	        //json object to sent to the authentication url
	        success: function (response) {
	        	callback(null,response.texts);
	        },
	        error: function(err){
			   callback(err);
			}
	    });	
}

function loadText(id,callback){
	$.ajax
	    ({
	        type: "GET",
	        //the url where you want to sent the userName and password to
	        url: '/getText/?id='+id,
	        contentType : 'application/json',
	        async: false,
	        //json object to sent to the authentication url
	        success: function (response) {
	        	callback(null,response.text);
	        },
	        error: function(err){
			   callback(err);
			}
	    });	
}

$(function() {
    console.log( "ready!" );
    _initElements();
});


const login_template = `<div class="input_form">
 			<div class=input_div>
 				<span class="login_span">Login</span>
 				<input type="text" id="loginInput" class="input">
 			</div>
	 		<div class=input_div>
	 			<span class="login_span">Password</span>
	 			<input type="password" id="passInput" class="input">
	 		</div>
	 		<div class="but_div">
	 			<button disabled class="input_button" id="login_btn">Login</button>
	 			<button disabled  class="input_button" id="register_btn">Register</button>
	 		</div>
 		</div>`;

const home_template = `<div class="top">
 			<div class="panel">
	 			<button id="logut" class="button">LOGOUT</button>
	 			<button id="decode" class="button">DECODE</button>
 			</div>
 			<div class="content">
 			<span class="name_text"></span>
 			<div class="text_area"></div>
 			</div>
 			<div class="panel2">
	 			<span>Select text</span>
	 			<select class="select" id="pub_select"></select>
 			</div>
 		</div>`;