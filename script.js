const items = [{
        title: "Боди",
        description: "В комплекте 3 шт.",
        tags: ["boy", "girl"],
        price: 50,
        img: "./img/1.jpg",
        rating: 4.5,
    },
    {
        title: "Набор ложка и вилка",
        description: "Поможет Вашему малышу научиться самостоятельно кушать.",
        tags: ["boy", "girl"],
        price: 30,
        img: "./img/2.jpg",
        rating: 4.6,
    },
    {
        title: "Нагрудник",
        description: "Убережет от загрязнений.",
        tags: ["boy", "girl"],
        price: 35,
        img: "./img/3.jpg",
        rating: 4.5,
    },
    {
        title: "Пирамидка",
        description: "Развивает мышление, логику.",
        tags: ["boy", "girl"],
        price: 40,
        img: "./img/4.jpeg",
    },
    {
        title: "Поильник",
        description: "Удобно пить из трубочки.",
        tags: ["boy", "girl"],
        price: 45,
        img: "./img/5.jpg",
        rating: 4.9,
    },
    {
        title: "Муслиновое одеяло",
        description: "Согреет малыша, размер 70х70.",
        tags: ["boy", "girl"],
        price: 75,
        img: "./img/6.jpg",
        rating: 4.7,
    },
    {
        title: "Пустышка Bibs",
        description: "Размеры 1(0-6 месяцев) и 2(6-18 месяцев).",
        tags: ["boy", "girl"],
        price: 27,
        img: "./img/7.jpeg",
        rating: 4.8,
    },
    {
        title: "Набор шарф и снуд",
        description: "Для теплой осени-весны.",
        tags: ["boy", "girl"],
        price: 45,
        img: "./img/8.jpg",
        rating: 4.8,
    },
    {
        title: "Силиконовая тарелка с секциями",
        description: "Для первого прикорма.",
        tags: ["boy", "girl"],
        price: 45,
        img: "./img/9.jpg",
        rating: 4.9,
    }
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function cardShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;

    const ratingContainer = item.querySelector(".rating");
    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector(".tags");

    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    return item;
}

function separateItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
        itemsContainer.append(cardShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

separateItems(currentState.sort((a, b) => sortByAlphabet(a, b)));


const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));

    separateItems(currentState);

    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    separateItems(currentState);
});