var ativo = document.querySelector('#botao').disabled = true;

var botao = document.querySelector('#botao')
botao.disabled;
var input_username = document.querySelector('#input_user');
var input_email = document.querySelector('#input_email');
var input_pass = document.querySelector('#input_pass');
var input_confirm_pass = document.querySelector('#input_confirm_pass');
var user;
var email;
var password;
var confPass;
var confirm;

    // faz a validação a cada chance
	input_username.addEventListener("change", e => {
           validaUserName(input_username.value);
            console.log(input_username.value);        	
    });
    
    input_email.addEventListener("change", e => {
        validaUserEmail(input_email.value);
		console.log(input_email.value)
    });
    
    input_pass.addEventListener("change", e => {
        validaUserPass(input_pass.value);
		console.log(input_pass.value)
    });
    
    input_confirm_pass.addEventListener("change", e => {
        validaUserConfPass(input_confirm_pass.value);
		console.log(input_confirm_pass.value)
    });

    //funções de validação
    
    function validaUserName(param) {
        let avisoUser = document.querySelector('.aviso_user');
        let userValidacao = param;
    
            if(userValidacao.length >=6 && userValidacao.length <= 20){
                user = true;
                avisoUser.innerHTML ="Ok.";
            //    console.log(user);
            } else {
                user = false;
                avisoUser.innerHTML ="Deve conter entre 6 e 20 caracteres.";
            //    console.log(user);
            };
    };
    
    function validaUserEmail(param) {
        let avisoEmail = document.querySelector('.aviso_email');
        let emailValidacao = param;     

            if (emailValidacao.includes("@") == false && emailValidacao.includes(".") == false){
                avisoEmail.innerHTML ="O email precisa de um @ e . para o domínio.";
                email = false;
            //    console.log(email);
                
            } else {
                email = true;
                avisoEmail.innerHTML = "Ok.";
            //    console.log(email);
            }

            if (emailValidacao.length < 10 || emailValidacao.length > 50){
                email = false;
                avisoEmail.innerHTML ="email deve conter no mínimo 10 caracteres.";
            } 
        }
    
    function validaUserPass(param) {
        let avisoPassConfirm = document.querySelector('.aviso_pass');
        let passValidacao = param;
    
            if (passValidacao.length < 6 || passValidacao.length > 18){
                avisoPassConfirm.innerHTML = "Senha inválida, deve conter entre 6 e 18 caracteres.";
                password = false;
    
            } else {
                password = true;
                confirm = passValidacao;
                avisoPassConfirm.innerHTML = "Ok.";
                
            };
    };

    function validaUserConfPass(param) {
        let avisoPassConfirm = document.querySelector('.aviso_passConfirm');
        let passConfirmValidacao = param;

            if (passConfirmValidacao == confirm){
                confPass = true;
                avisoPassConfirm.innerHTML = "Ok.";

                } else {
                avisoPassConfirm.innerHTML = "As senhas não coindidem!";
                confPass = false;
    //          console.log(confPass);

            };
            if ( user == true && email == true && password == true &&  confPass == true) {
                var desativado = document.querySelector('#botao').disabled = false;
            };
    };

