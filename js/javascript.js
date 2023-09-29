const textToType = {
    ru: {
        title: `Биография`,
        content: `<img src="https://github.com/kod3ima/kod3ima/blob/main/assets/logo.gif?raw=true" /> Привет! Меня зовут Kodzima, и я - разработчик фулл-стек с горячей страстью к созданию бекенд-решений. Моя история в мире программирования началась не так давно, но с тех пор я смог достичь определенных высот и приобрести обширный опыт.

        Я в настоящее время учусь в колледже, где углубляюсь в изучение компьютерных наук и смежных технологий. Моя академическая база исключительно важна для меня, так как она помогает мне постоянно совершенствовать свои навыки и быть в курсе последних тенденций в сфере разработки.
        
        Опыт работы - это еще одна важная часть моей биографии. У меня есть более чем 2 года стажа работы в сфере разработки. За это время я работал над разнообразными проектами, от веб-приложений до корпоративных решений, и приобрел ценный опыт в создании эффективных и надежных бекенд-систем.
        
        Моя страсть к программированию и разработке позволяет мне постоянно развиваться и стремиться к новым достижениям. Я уверен, что в будущем моя карьера будет продолжать развиваться, и я буду продолжать учиться и совершенствоваться в мире технологий.
        
        Спасибо за то, что ознакомились с моей биографией, и я надеюсь, что у меня есть возможность внести свой вклад в мир разработки программного обеспечения и создать что-то по-настоящему удивительное.`
    },
    en: {
        title: `Biography`,
        content: `<img src="https://github.com/kod3ima/kod3ima/blob/main/assets/logo.gif?raw=true" /> Hello! My name is Kodzima, and I am a full-stack developer with a burning passion for creating backend solutions. My journey in the world of programming began not so long ago, but since then I have been able to achieve certain heights and gain extensive experience.

        I am currently studying in college, where I delve into the study of computer science and related technologies. My academic foundation is extremely important to me, as it helps me constantly improve my skills and stay up-to-date with the latest trends in the development field.
        
        Work experience is another crucial part of my biography. I have more than 2 years of experience in the development sector. During this time, I have worked on various projects, from web applications to corporate solutions, and have gained valuable experience in building efficient and reliable backend systems.
        
        My passion for programming and development allows me to continually evolve and strive for new achievements. I am confident that in the future my career will continue to progress, and I will keep learning and improving in the world of technology.
        
        Thank you for taking the time to read my biography, and I hope that I have the opportunity to contribute to the world of software development and create something truly amazing. 214124123`
    }
};

const outputElement = document.getElementById("output");

function getBrowserLanguageContent() {
    let lang = navigator.language.split('-')[0];  // Get only the primary language part

    if (lang !== 'ru' && lang !== 'en') {
        lang = 'en';  // Default to English for unsupported languages or Chinese
    }
    
    return textToType[lang];
}

const textContent = getBrowserLanguageContent();

document.title = textContent.title;

function updateProgressBar(index, total) {
    const percentage = (index / total) * 100;
    document.getElementById("progressBar").style.width = `${percentage}%`;
    localStorage.setItem('typingProgress', index);  // сохраняем прогресс в localStorage
}

function typeText(text, index) {
    if (index < text.length) {
        updateProgressBar(index, text.length);

        if (index < text.length) {
            updateProgressBar(index, text.length);

            if (text.charAt(index) === '<') { 
                let tagCloseIndex = text.indexOf('>', index);
                let nextTagOpenIndex = text.indexOf('<', index + 1);
                
                while (nextTagOpenIndex !== -1 && nextTagOpenIndex < tagCloseIndex) {
                    tagCloseIndex = text.indexOf('>', tagCloseIndex + 1);
                    nextTagOpenIndex = text.indexOf('<', nextTagOpenIndex + 1);
                }

                outputElement.insertAdjacentHTML('beforeend', text.substring(index, tagCloseIndex + 1));
                setTimeout(() => typeText(text, tagCloseIndex + 1), 20);
                return;
            }

            outputElement.insertAdjacentHTML('beforeend', text.charAt(index)); 
            setTimeout(() => typeText(text, index + 1), 20);
        } else {
            updateProgressBar(text.length, text.length);
            updateProgressBar(text.length, text.length);
            localStorage.removeItem('typingProgress');  // удаляем сохраненный прогресс, когда текст полностью напечатан
        }
    } else {
        updateProgressBar(text.length, text.length);
        localStorage.removeItem('typingProgress');  // удаляем сохраненный прогресс, когда текст полностью напечатан
    }
}

// При загрузке страницы проверяем, есть ли сохраненный прогресс
// При загрузке страницы проверяем, есть ли сохраненный прогресс
const savedProgress = parseInt(localStorage.getItem('typingProgress') || '0');

// Если есть сохраненный прогресс, вставляем уже напечатанный текст
if (savedProgress > 0) {
    outputElement.innerHTML = textContent.content.substring(0, savedProgress);
}

typeText(textContent.content, savedProgress);
