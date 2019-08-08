$(function(){
    console.log('Chargement du JS côté navigateur');
    // On cache le tchat
    const tchat = $("#tchat");
    tchat.hide();

    // Etablissement du lien entre le navigateur et le serveur
    let socket = io(); // émettre l'événement "connection"

    // Gestion connexion au tchat
    $('#tchatConnection').on('submit', tchatConnection);

    // Nom d'utilisateur
    let username;

    /**
     * Gestion du formulaire de connexion au tchat
     * - On envoie le nom d'utilisateur au serveur
     * @param event
     */
    function tchatConnection(event) {
        // On empêche le rechargement de la page (envoi des données)
        event.preventDefault();
        // Récupération du nom de l'utilisateur
        username = $("#username").val();
        // Envoi du nom d'utilisateur au serveur
        socket.emit('tchatConnection', {username: username});
        // Lorsque que le serveur est ok : il nous répond
        socket.on('initTchat', initTchat);
    }

    /**
     * Cache le formulaire de connexion et affichage le tchat
     * todo : afficher les derniers messages envoyés
     * @param datas
     */
    function initTchat(datas) {
        // On cache le formulaire et on affiche le tchat
        $('#tchatConnection').fadeOut(() => tchat.fadeIn());
        // On prépare l'envoi du message au serveur
        $('.msg_send_btn').on('click', sendMessage);
        // On écoute le réception des messages
        socket.on('broadcast-message', displayNewMessage);
    }

    /**
     * Une fois que l'utilisateur a saisi un message, on l'envoie au serveur
     * Le serveur devra diffuser le message à tous les utilisateurs connectés
     */
    function sendMessage() {
        // Récupération de la valeur du message
        const input = $('.write_msg');
        const message = input.val();
        // On vide l'input pour l'envoi du prochain message
        input.val('');
        // Emission d'un nouvel événement : "nouveau-message"
        // On envoie un objet qui contient le message et le nom d'utilisateur
        socket.emit('nouveau-message', {
            message: message,
            username: username
        });
    }

    /**
     * Affiche le message reçu dans le tchat
     */
    function displayNewMessage(datas) {
        const container = $('.msg_history');
        container.append(`
        <div class="incoming_msg">
            <div class="incoming_msg_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div class="received_msg">
                <div class="received_withd_msg">
                    <span class="time_date">${datas.username}</span>
                    <p>${datas.message}</p>
                </div>
            </div>
        </div>
        `);
    }
});