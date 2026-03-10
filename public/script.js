const users = [
  { avatar: "https://randomuser.me/api/portraits/women/12.jpg", user: "Emma Thompson", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/men/45.jpg", user: "Liam Carter", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/women/33.jpg", user: "Sophia Martinez", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/men/67.jpg", user: "Noah Anderson", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/women/54.jpg", user: "Olivia Brown", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/men/22.jpg", user: "James Wilson", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/women/76.jpg", user: "Ava Taylor", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/men/90.jpg", user: "Benjamin Thomas", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/women/81.jpg", user: "Isabella Moore", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/men/14.jpg", user: "Lucas Jackson", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/women/19.jpg", user: "Mia White", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/men/31.jpg", user: "Henry Harris", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/women/63.jpg", user: "Charlotte Martin", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/men/73.jpg", user: "Alexander Thompson", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/women/41.jpg", user: "Amelia Garcia", role: "Member" },
  { avatar: "https://randomuser.me/api/portraits/men/55.jpg", user: "Daniel Martinez", role: "Member" },
]

const container = document.getElementById('cardContainer');
const searchInput = document.getElementById('searchInput');

function createCard(user){

  const card = document.createElement("li");

  card.className =
    "user-card bg-cyan-300 shadow-lg rounded-xl p-5 text-center transition-all duration-300 hover:scale-105"

  card.innerHTML = `
    <img src="${user.avatar}" class="w-28 h-28 rounded-full mx-auto mb-4">
    <h2 class="text-xl">${user.user}</h2>
    <p class="role opacity-100 text-gray-500 mb-4 transition-all duration-500 ease-in-out">${user.role}</p>
    <div class="flex justify-center gap-3">
    <button class="promote bg-blue-600 text-white px-3 py-1 rounded hover:opacity-85 active:scale-95 cursor-pointer">
    Promote
    </button>
    <button class="remove bg-red-600 text-white px-3 py-1 rounded hover:opacity-85 active:scale-95 cursor-pointer">
    Remove
    </button>
    </div>
    `;

  container.appendChild(card);
}

function renderUsers(list){
  container.innerHTML = "";
  list.forEach(user => createCard(user))
}

renderUsers(users)

container.addEventListener("click", e => {

  const card = e.target.closest(".user-card")
  if(!card) return
  if(e.target.classList.contains("remove")){
    card.classList.add("opacity-0", "scale-75")
    setTimeout(() => {
    card.remove()
    },300)
  }


  if(e.target.classList.contains("promote")){
    const role = card.querySelector(".role");
    role.style.opacity = '0';
    setTimeout(() => {
      if (role.innerText === "Member") {
        role.innerText = "Senior Member";
        role.classList.add("text-green-600");
      } else if (role.innerText === "Senior Member") {
        role.innerText = "Veteran";
        role.classList.add("text-green-600");
        e.target.disabled = true;
        e.target.classList.add("opacity-50", "cursor-not-allowed"); 
        e.target.classList.remove('hover:opacity-85','active:scale-95');
      }
      role.style.opacity = "1";
    }, 500);
  }

});

searchInput.addEventListener("input", function() {
  const value = this.value.toLowerCase();
  const filtered = users.filter(user =>
    user.user.toLowerCase().includes(value)
  );

  container.className = "w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 m-auto gap-6 py-10";

  if (filtered.length === 0) {
    container.classList.add('h-80', 'flex', 'justify-center', 'items-center'); 
    container.classList.remove('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-4', 'gap-6');
    container.textContent = `No members with names that include "${this.value}"`;
    return;
  }

  renderUsers(filtered);
});