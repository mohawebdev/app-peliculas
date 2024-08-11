'use strict';

let deferredInstallPrompt= null;

const installButton= document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(event) {
    deferredInstallPrompt = event;
    installButton.removeAttribute('hidden');
}

function installPWA(evt){
    deferredInstallPrompt.prompt();
    evt.srcElement.setAttribute('hidden', true);
    deferredInstallPrompt.userChoice.then((choice)=>{
        if(choice.outcome === 'accepted'){
            console.log('aceptado', choice)
        }else{
            console.log('No aceptado', choice)
        }
        deferredInstallPrompt= null;
    })
}

window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(evt){
    console.log('Pelis instalada', evt);
}