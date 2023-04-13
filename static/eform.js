function ready(fn) {
    if (document.readyState !== 'loading') {
        console.log('loading')
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {
    document.querySelectorAll(".eForm").forEach((el, i) => {
        el.onsubmit = function (event) {
            event.preventDefault();
            let loader = document.createElement("img")
            loader.src = "https://electis.ru/static/loader.gif";
            el.submit.after(loader);
            let data = Object.fromEntries(new FormData(el));
            grecaptcha.ready(function () {
                grecaptcha.execute(data['_recaptcha'], {action: 'submit'}).then(
                    async function (token) {
                        data['_token'] = token;
                        await fetch('https://direct.electis.ru/inform', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer uKkcYq5v3h'
                            },
                            body: JSON.stringify(data),
                        }).then((response) => {
                            loader.remove();
                            if (response.ok) {
                                el.submit.innerText = 'Отправлено';
                                el.submit.disabled = true;
                            } else if (response.status === 406) {
                                el.submit.innerText = 'Ошибка проверки капчи';
                            } else {
                                el.submit.innerText = 'Ошибка ответа';
                            }
                        }).catch((error) => {
                            loader.remove();
                            el.submit.innerText = 'Ошибка отправки';
                            console.log(error)
                        });
                    });
            });
        };
    });
})
