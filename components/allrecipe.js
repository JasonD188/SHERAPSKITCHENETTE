const filterButtons = document.querySelectorAll(".filter-buttons button");
    const recipeCards = document.querySelectorAll(".recipe-card-container");

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.textContent.toLowerCase().replace(/\s/g, '-');
        recipeCards.forEach(card => {
          const categories = card.dataset.category?.split(" ") || [];
          if (filter === "all-recipes" || categories.includes(filter)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

  
    document.querySelectorAll('.toggle-button').forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.getElementById(button.dataset.target);
        if (modal) modal.style.display = "block";
      });
    });

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-overlay').style.display = 'none';
      });
    });

    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
      }
    });