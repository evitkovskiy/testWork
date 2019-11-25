window.onload = function() {
    fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(res => {
            data = res.categories[0].videos;
            parseResults(data);
        })
        .catch(err => console.log(err));
};

function parseResults(data) {
    let section = document.querySelector('#main');
    
    section.innerHTML = data.map((item, i) => {
        return `
                <div class="video">
                    <h2 class="video__title">${item.title}</h2>
                    <h3 class="video__subtitle">${item.subtitle}</h3>
                    <div class="video__container">
                        <a class="video__container-link" href="${item.sources[0]}">
                            <picture>
                                <source srcset="${item.thumb}" type="image">
                                <img class="video__container-media" src="${item.thumb}" alt="${item.title}">
                            </picture>
                        </a>
                        <button class="video__container-button" type="button" aria-label="Запустить видео">
                            <svg width="68" height="48" viewBox="0 0 68 48">
                                <path class="video__container-button-shape" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path>
                                <path class="video__container-button-icon" d="M 45,24 27,14 27,34"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="video__description" id="${i+1}">${item.description}</div>
                    <button class="video__description-button" onclick="show()" id="${i+1}">hide</button>
                </div>
                `
        }).join('');
    
    findVideos();
}

function findVideos() {
    let videos = document.querySelectorAll('.video__container');

    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}

function setupVideo(video) {
    let link = video.querySelector('.video__container-link');
    let media = video.querySelector('.video__container-media');
    let button = video.querySelector('.video__container-button');

    video.addEventListener('click', () => {
        let src = null;
        
        data.forEach(item => {
            if (item.title === media.alt) src = item.sources[0];
        });
        
        let iframe = createIframe(src);

        link.remove();
        button.remove();
        video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
}

function createIframe(src) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', src);
    iframe.classList.add('video__container-media');

    return iframe;
}

function show() {
    let desc = document.getElementById(`${event.target.id}`);
    desc.style.display = desc.style.display === `none` ? `block` : `none`;
    event.target.innerHTML = desc.style.display === `none` ? `show` : `hide`;
}