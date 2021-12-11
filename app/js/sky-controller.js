const { json } = require("body-parser");
const functions = require("firebase-functions");

module.exports = function(context) {
    
    //window.location.replace("https://sky-studio33.web.app/");

    var firebase = require("firebase/app");
    require("firebase/auth");
    const firebaseConfig = {
        apiKey: functions.config().tokens.apikey,
        authDomain: functions.config().tokens.authdomain,
        projectId: functions.config().tokens.projectid,
        storageBucket: functions.config().tokens.storagebucket,
        messagingSenderId: functions.config().tokens.messagingsenderid,
        appId: functions.config().tokens.appid,
        measurementId: functions.config().tokens.measurementid,
      };
    firebase.initializeApp(firebaseConfig);
    
    const templates = require('./templates')  

    const mainContent = document.querySelector("#main-content") //div principal
    
    let HashChangers = document.getElementsByClassName("navbar-HashChanger")  //btns do header 
    for (var i = 0; i < HashChangers.length; i++) { 
        HashChangers[i].onclick = BtnHomeOnClick
    }

    /*firebase.auth().onAuthStateChanged(function(user) {
        console.log("b")
        const authContent = document.querySelector("#auth-content")
        if (user) {
          // User is signed in.
            console.log("name=" + user.displayName + " email=" + user.email + " verified=" + user.emailVerified)
            authContent.innerHTML = templates.loggedIn(user)
            document.querySelector("#logoutBtn").onclick = BtnLogoutOnClick               


        } else {
          // User is signed out.
            console.log("no user")
            authContent.innerHTML = templates.loggedOut()
        }
    });*/

    function BtnLogoutOnClick(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }

    return states = {
        homepage: homepage,
        services: services,
        studio: studio,
        projects: projects,
        contact: contact,
        about: about,
        //login: login,
        //signup: signup,
        //drive: drive
    }


    // #homepage
    function homepage() {  
        mainContent.innerHTML = templates.homepage()    
        let HashChangers = document.getElementsByClassName("HashChanger")   
        
        for (var i = 0; i<HashChangers.length; i++) { 
            HashChangers[i].onclick = BtnHomeOnClick
        }

        document.getElementById("btn-homepage").onclick = toContactPage
        
        function toContactPage() {
            window.location.hash = "contact"
            window.scrollTo(0, 0)
        }

        window.addEventListener('resize', handleCss);

        function buildThresholdList() {
            let thresholds = [];
            let numSteps = 100;
          
            for (let i = 1.0; i <= numSteps; i++) {
              let ratio = i/numSteps;
              thresholds.push(ratio);
            }
          
            thresholds.push(0);
            return thresholds;
          }
          const thresholds = buildThresholdList()

        //Pode dar problemas para safari???
        var observer = new IntersectionObserver(function(entries) {
            // isIntersecting is true when element and viewport are overlapping
            // isIntersecting is false when element and viewport don't overlap
            entries.forEach(entry => {
                const doc = entry.target
                const img = doc.getElementsByClassName('imgContent')[0]

                if (window.innerWidth >= 769) {
                    if (entry.isIntersecting === true) {                    
                        doc.style.transition = 'width 2s'
                        doc.style.width = '30%'                     
                        img.style.transition = '2s ease-in-out'
                        img.style.transform = 'scale(0.3)'
                    } else {
                        doc.style.width = '100%'
            
                        img.style.transform = 'scale(1)'
                    }
                } 
            })
                
        }, { threshold: 0.40 });
        
        const content = document.querySelectorAll(".imgBx")
        content.forEach(element => observer.observe(element))
    }

    function handleCss() {
        const content = document.querySelectorAll(".imgBx")
        const imgs = document.querySelectorAll('.imgContent')
        if (window.innerWidth < 769) {
            content.forEach(box => {
                box.style.transition = 'none'
                box.style.width = '100%'
            })
            imgs.forEach(image => {
                image.style.transition = 'none'
                image.style.transform = 'scale(1)'
            })

        } else {
            content.forEach(box => {
                // Se box estiver no centro do ecrã e não numa intersecção, também precisa de iniciar animação
                // Verificar se a animação já ocorreu
                const measures = box.getBoundingClientRect()
                if (measures.top > 0 && measures.bottom < window.innerHeight) {
                    if (box.style.width == '100%') {
                        box.style.transition = 'width 2s'
                        box.style.width = '30%'  
                        box.childNodes[1].style.transition = '2s ease-in-out'
                        box.childNodes[1].style.transform = 'scale(0.3)'                
                    }           
                }
            })
        }
    }

    // #services
    function services(...args) {
        mainContent.innerHTML = templates.services()
        
        if(args.length == 1){
            sleep(75).then(__ =>{
                const scrollto = document.querySelector('#services-' + args[0]) //div principal
                if (scrollto != null) {
                        scrollto.scrollIntoView({block: "start", behavior: "smooth"})  
                }
            })
        }
        else {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }

        let servicesHashChangers = document.getElementsByClassName("HashChanger")   
        for (var i = 0; i < servicesHashChangers.length; i++) { 
            servicesHashChangers[i].onclick = BtnHomeOnClick
        }
    }


    // #studio
    function studio() {
        mainContent.innerHTML = templates.studio()
        let HashChange = document.getElementsByClassName("HashChange")
        HashChange[0].onclick = BtnHomeOnClick
    
    }
    
     // #contact
     function contact(...args) {
        mainContent.innerHTML = templates.contact()
        const texts = require('./contactInfoText')
        document.querySelector("#contacts-select-options").onchange = changeInfo

        if(args.length == 1){
            document.getElementById("contacts-select-options").value = args[0];
            let aux = { value: args[0]}
            changeInfo(aux)
        }
        
        function changeInfo(info){
            if (!info.value) info.value = info.target.value

            if (info.value === 'geral') {
                document.getElementById('info-text').innerHTML = `<p>${texts.geral_text}</p>`;
            } else if(info.value === 'podcast') {
                document.getElementById('info-text').innerHTML = `<p>${texts.podcast_text}</p>`;
            } else if(info.value === 'producao') {
                document.getElementById('info-text').innerHTML = `<p>${texts.production_text}</p>`;
            } else if(info.value === 'mistura') {
                console.log(texts)
                document.getElementById('info-text').innerHTML = `<p>${texts.master_text}</p>`;
            } else if(info.value === 'aulas') {
                document.getElementById('info-text').innerHTML = `<p>${texts.teaching_text}</p>`;
            }
        }            


        document.getElementById("btn-submit").onclick = sendMessageRequestHandler

        function sendMessageRequestHandler() {

            document.getElementById("btn-submit").disabled = true;
            setTimeout(function() {
                document.getElementById("btn-submit").disabled = false;
            }, 3000);

            const name = document.getElementById("input-name").value
            const email = document.getElementById("input-email").value
            const option = document.getElementById("contacts-select-options").value
            const message = document.getElementById("input-message").value

            if (name && email && option && message) {
                let data = {
                    name: name,
                    email: email,
                    option: option,
                    message: message
                }
                const messageDoc = document.getElementById("success-contact")
                messageDoc.style.display = 'block'
                document.getElementById("success-contact-text").innerHTML = `A mensagem foi enviada com sucesso,<br>de: ${email}<br>para: skyestudio33@gmail.com`
                // !!!
                // You may see this message if you send an email to a total of more than 500 recipients in a single email 
                // and or more than 500 emails sent in a day.
                // !!
    
                // Retorna os dados enviados
                fetch('https://us-central1-sky-estudio33.cloudfunctions.net/sendEmail', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(() => {
                    /*alert(`Um email foi enviado de: ${email}\npara: skyestudio33@gmail.com`)*/
                    document.getElementById("success-contact").style.display = 'block'
                    document.getElementById("success-contact-text").innerHTML= `A mensagem foi enviada com sucesso de: ${email}\npara: skyestudio33@gmail.com`
                })
                .catch(err => { console.log(err) })
            } else {
                const errorDiv = document.getElementById("contact-error");
                errorDiv.style.display = 'block'
                errorDiv.scrollIntoView();
            }
        }



    }

    // #login
    function login() {
        mainContent.innerHTML = templates.login()
        let HashChange = document.getElementsByClassName("HashChange")
        HashChange[0].onclick = BtnHomeOnClick
        document.getElementById("login-loginBtn").onclick = BtnLogin
        document.getElementById("login-resetPwd").onclick = btnResetPassword

        function BtnLogin() {
            const email = document.getElementById("login-email").value
            const password = document.getElementById("login-password").value
            let sessionPersistence
            
            if (document.getElementById("log-checkbox").checked) {
                sessionPersistence = firebase.auth.Auth.Persistence.SESSION
            } else {
                sessionPersistence = firebase.auth.Auth.Persistence.NONE
            }

            firebase.auth().setPersistence(sessionPersistence)
            .then(() => {
               // Existing and future Auth states are now persisted if local.
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .then(() => {
                window.location.hash = "homepage"
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                handleError(errorMessage)
                // ...
            });

        }

        function btnResetPassword() {
            var auth = firebase.auth();
            var emailAddress = document.getElementById("login-email").value
            if (emailAddress) {
                auth.sendPasswordResetEmail(emailAddress).then(function() {
                        // Email sent.
                        alert(`Email enviado para ${emailAddress}`)
                    }).catch(function(error) {
                        // An error happened.
                        handleError(error)
                    });
            } else {
                handleError('Preencha um email válido')
            }          
        }

        function handleError(message) {
            document.querySelector("#log-error").style.display = "flex"
            document.querySelector("#err-text").textContent = message
        }
    }

    // #signup
     function signup() {
        mainContent.innerHTML = templates.signup()
        let HashChange = document.getElementsByClassName("HashChange")
        HashChange[0].onclick = BtnHomeOnClick
        document.getElementById("createAccBtn").onclick = BtnCreateAccOnClick

        function BtnCreateAccOnClick() {
            let userid = document.getElementById("idAccText").value
            let email = document.getElementById("emailAccText").value
            let password = document.getElementById("passAccText").value
            let repeatPassword = document.getElementById("RePassAccText").value            

            if (userid && email && password && repeatPassword) { 
                if (password.length >= 6) {
                    if (password != repeatPassword) {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            window.location.hash = "homepage"
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            const errorCode = error.code
                            const errorMessage = error.message
                            handleError(errorMessage)                    
                        });
                    } else {
                        handleError('Repetição da palavra-passe é diferente à original')
                    }
                } else {
                    handleError('Palavra-passe tem que conter mais do que 6 caracteres')
                }
            } else {
                handleError('Todos os campos devem estar preenchidos')
            }
        }

        function handleError(message) {
            document.querySelector("#signup-error").style.display = "flex"
            document.querySelector("#error-text").textContent = message
        }
    }

    // #about
    function about() {
        mainContent.innerHTML = templates.about()
    }

    // #projects
    function projects(...args) {
        mainContent.innerHTML = templates.projects()

        if(args.length == 1){
            sleep(25).then(__ =>{
                const scrollto = document.querySelector('#projects-' + args[0]) //div principal
                if (scrollto != null) {
                        scrollto.scrollIntoView({block: "start", behavior: "smooth"})  
                }
            })
        }
        else {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    //Mudar o hash para os botoes do header
    function BtnHomeOnClick() { 
        let elements = document.getElementsByClassName("navbar-HashChanger")
       //document.querySelector("#navbarDropdown").style.borderBottom = "1px solid rgb(52, 58, 64)"
        for (let i = 0; i < elements.length; i++) { 
            elements[i].style.borderBottom = "1px solid rgb(52, 58, 64)"
        }
        document.getElementById('navbarDropdown services').style.borderBottom = "1px solid rgb(52, 58, 64)"

        if (this.id == 'navbar-services') {
            document.getElementById('navbarDropdown services').style.borderBottom = "1px solid #fcfcfc"
        } else {
            document.getElementById(this.id).style.borderBottom = "1px solid #fcfcfc"
        }
        
        let hash = this.id.slice(7) 
        let name = this.name;
        if (name != ""){
            hash = hash + '/' + name
        }
        window.location.hash = hash 
    }
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    // #drive
    /*function drive() {
        mainContent.innerHTML = templates.drive()
        
            
    }*/
}       
