// script.js - основная логика приложения
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Telegram Web App
    let tg = window.Telegram.WebApp;
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Получаем элементы DOM
    const generateBtn = document.getElementById('generate-btn');
    const saltInput = document.getElementById('salt');
    const passwordInput = document.getElementById('password');
    const loadingIndicator = document.getElementById('loading');
    const resultElement = document.getElementById('result');
    const copyBtn = document.getElementById('copy-btn');
    const notification = document.getElementById('notification');
    
    // Обработчик нажатия на кнопку генерации
    generateBtn.addEventListener('click', async function() {
        const salt = saltInput.value;
        const password = passwordInput.value;
        
        if (!salt || !password) {
            alert('Пожалуйста, заполните оба поля!');
            return;
        }
        
        try {
            // Показываем индикатор загрузки
            loadingIndicator.style.display = 'block';
            generateBtn.disabled = true;
            copyBtn.style.display = 'none'; // Скрываем кнопку копирования при новой генерации
            
            // Вызываем функцию из generateHash.js
            const hash = await generateSecureHash(salt, password);
            
            // Отображаем результат
            resultElement.innerText = hash;
            
            // Показываем кнопку копирования
            copyBtn.style.display = 'block';
        } catch (error) {
            console.error('Ошибка генерации хэша:', error);
            alert('Произошла ошибка при генерации хэша');
        } finally {
            // Скрываем индикатор загрузки
            loadingIndicator.style.display = 'none';
            generateBtn.disabled = false;
        }
    });
    
    // Обработчик нажатия на кнопку копирования
    copyBtn.addEventListener('click', function() {
        const resultText = resultElement.innerText;
        
        if (resultText) {
            navigator.clipboard.writeText(resultText).then(function() {
                notification.classList.add('show');
                
                setTimeout(function() {
                    notification.classList.remove('show');
                }, 2000);
            }).catch(function(err) {
                console.error('Не удалось скопировать текст: ', err);
                alert('Не удалось скопировать текст. Возможно, ваш браузер не поддерживает эту функцию.');
            });
        }
    });
});