(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  const searchForm = document.getElementById('search')
  const searchInput = document.getElementById('search-input')
  const genreLink = document.querySelector('.nav-link')
  const genreList = document.getElementById('genre-list')
  const genrePair = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  let genreNum = 1

  //get API data
  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      getGenreData(data, genreNum)
      getGenreList()
    })
    .catch((err) => {
      console.log('Error!')
    })

  //listen to search bar
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    let results = []
    const regex = new RegExp(searchInput.value, 'i')
    results = data.filter(movie => movie.title.match(regex))
    displayDataList(results)
  })

  // listen to pagination click event
  genreList.addEventListener('click', event => {
    genreNum = event.target.dataset.genre
    getGenreData(data, genreNum)
    console.log(genreNum)
  })


  /*-----------------Function here------------------*/
  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap" data-id=${item.id}>
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h6>      
            </div>  
          </div>
        </div>`
    })
    dataPanel.innerHTML = htmlContent
  }

  //draw genre nav
  function getGenreList() {
    let genreNav = Object.values(genrePair)
    let genreNavList = ""
    for (let i = 0; i < genreNav.length; i++) {
      genreNavList += `
      <a class="nav-link" data-genre="${i + 1}" href="#">${genreNav[i]}</a>`
    }
    genreList.innerHTML = genreNavList
  }

  //click genre to see movie list
  function getGenreData(data, genreNum) {
    let genreData = []
    data.forEach(function (item) {
      if (item.genres.includes(parseInt(genreNum))) {
        genreData.push(item)
      }
    })
    displayDataList(genreData)
  }

})()