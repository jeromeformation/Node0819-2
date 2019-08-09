document.addEventListener("DOMContentLoaded", function(event) {
    const forms = document.querySelectorAll('form.to-confirm');
    forms.forEach(form => form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isOk = confirm('Toute suppression est irréversible. Êtes-vous sûr de supprimer cette recette ?');

        if(isOk) {
            console.log(e.target);
            e.target.submit();
        }
    }))
});