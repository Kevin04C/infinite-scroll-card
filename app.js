const sectionUsers = document.querySelector(".users");
document.addEventListener("DOMContentLoaded", (e) => {
  showData();
});

const showData = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=15");
    if (!response.ok)
      throw new Error(`Error ${response.status} ${response.statusText}`);

    const { results } = await response.json();
    printData(results);
  } catch (err) {
    console.log(err);
  }
};

const printData = async (users = []) => {
  setTimeout(() => {
    clearSkeletons();
    users.forEach((user) => {
      const {
        cell,
        gender,
        name,
        location: { country, postcode },
        dob: { age },
      } = user;
      const avatar = user.picture.medium;
      sectionUsers.innerHTML += `
      <div class="card ${cardTheme(age)}">
      <div class="content">
        <div class="balls">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="content__main">
          <div class="content__avatar">
          <img
            src="${avatar}"
            alt=""
          />
        </div>
        <div class="content__body">
          <div class="body__profile">
            <p class="profile__name">${name.first} ${name.last}</p>
            <p class="profile__number">${cell}</p>
          </div>
          <div class="body__statistics">
            <div class="statistics__genero">
              <p class="genero__text">${gender}</p>
              <p class="genero__title">Genero</p>
            </div>
            <div class="statistics__country">
              <p class="country__text">${country}</p>
              <p class="country__title">Country</p>
            </div>
            <div class="statistics__postcode">
              <p class="postcode__text">${postcode}</p>
              <p class="postcode__title">Postcode</p>
            </div>
          </div>
        </div>
        <div class="content__ranking">
          <div class="raking__number">
            <p class="number__text">${age}</p>
            <p class="number__title">Age</p>
          </div>
        </div>
      </div>
        </div>
      </div>
      `;
    });
  }, 1000);
};
const cardTheme = (age) => {
  if (age >= 60) return "gold";
  if (age >= 40 && age < 60) return "pro";
  if (age >= 30 && age < 40) return "lightpurple";
  if (age >= 20 && age < 30) return "lightred";
  else return "lightblue";
};

const clearSkeletons = () => {
  const skeletons = document.querySelectorAll(".skeleton");
  skeletons.forEach((skeleton) => {
    skeleton.remove();
  });
};

window.addEventListener("scroll" ,e => {
 const {scrollHeight, clientHeight, scrollTop} = document.documentElement;

 if (clientHeight + scrollTop >= scrollHeight) {
    showData();
 }
})

