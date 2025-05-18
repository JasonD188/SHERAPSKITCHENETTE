 ScrollReveal().reveal('.reveal', {
          delay: 300,
          distance: '50px',
          origin: 'bottom',
          duration: 1000,
          easing: 'ease-in-out'
        });
      
        const SUPABASE_URL = 'https://ypnxvddfxubgbqogxmuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwbnh2ZGRmeHViZ2Jxb2d4bXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTAzNDIsImV4cCI6MjA1OTY2NjM0Mn0.J-ggygd9rFO8mSEMmJ7o_EasckNGUAXhoffGQKuEZEg';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      
     
        document.addEventListener("DOMContentLoaded", function () {
          const commentForm = document.querySelector(".form-comment");
          const commentPopup = document.getElementById("commentPopup");
          const closePopupBtn = document.getElementById("closePopupBtn");
      

          function showPopup() {
            commentPopup.style.display = "flex";
            setTimeout(() => {
              commentPopup.style.opacity = 1;
            }, 50);
          }
      
  
          closePopupBtn.addEventListener("click", function () {
            commentPopup.style.opacity = 0;
            setTimeout(() => {
              commentPopup.style.display = "none";
            }, 300);
          });
      
         
          commentForm.addEventListener("submit", async function (e) {
            e.preventDefault();
      
            const message = document.querySelector(".textarea").value.trim();
            const name = document.querySelector(".nme").value.trim();
            const email = document.querySelector(".emil").value.trim();
      
            if (!name || !email || !message) {
              alert("Please fill out all fields before submitting.");
              return;
            }
      
            const comment = {
              message,
              name,
              email,
              date: new Date().toLocaleString()
            };
      
          
            let comments = JSON.parse(localStorage.getItem("comments")) || [];
            comments.push(comment);
            localStorage.setItem("comments", JSON.stringify(comments));
    
            try {
              const { error } = await supabase.from("comments").insert([{
                user_name: name,
                user_email: email,
                comment_text: message
              }]);
      
              if (error) {
                alert("Error posting comment: " + error.message);
                return;
              }
      
              showPopup();
              commentForm.reset();
      
            } catch (err) {
              console.error("Unexpected error:", err);
              alert("An unexpected error occurred. Please try again.");
            }
          });
      
        
          window.addEventListener('storage', (event) => {
            if (event.key === 'supabase.auth.token') {
              location.reload();
            }
          });
        });

  document.addEventListener('DOMContentLoaded', function () {
  const popupContainer = document.getElementById('popup-container');
  const googleSigninBtn = document.getElementById('google-signin-btn');
  const closeBtn = document.getElementById('close-btn');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  const boxesToShow = 4;
  let currentTestimonialIndex = 0;

  const testimonials = [
    { name: 'Jason Luyas', image: 'picturesblog/kengpat.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/noisy.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/josh moji.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/wagniyuku.jpg', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/mark.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/mia.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/james.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/emma.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/david.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/sophia.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/david.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/david.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' },
    { name: 'KUPALOGS', image: 'picturesblog/david.png', description: 'hellow araw araw ako kumakain dito masarap ehh tang inamo' }
    //MAG ADD LANG NG MGA CONTENT COPY NYO LANG NASA TAAS TAPOS PASTE DAPAT MAY KAMA ',' PARA DI MAGKAERROR 

  ];

  
  function showPopup() {
    popupContainer.style.display = 'flex';
    updateTestimonialDisplay();
  }


  function closePopup() {
    popupContainer.style.display = 'none';
  }


  function showNextTestimonial() {
    if (currentTestimonialIndex + boxesToShow < testimonials.length) {
      currentTestimonialIndex += boxesToShow;
      updateTestimonialDisplay();
    }
  }


  function showPrevTestimonial() {
    if (currentTestimonialIndex - boxesToShow >= 0) {
      currentTestimonialIndex -= boxesToShow;
      updateTestimonialDisplay();
    }
  }

  function updateTestimonialDisplay() {
    const testimonialBoxes = document.querySelectorAll('.testimonial-box');
    testimonialBoxes.forEach((box, i) => {
      const tIndex = currentTestimonialIndex + i;
      if (tIndex < testimonials.length) {
        const t = testimonials[tIndex];
        box.querySelector('.avatar').src = t.image;
        box.querySelector('.avatar').alt = t.name;
        box.querySelector('h2').textContent = t.name;
        box.querySelector('.description').textContent = t.description;
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });
  }

  
  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation(); 
    closePopup();
  });

  nextBtn.addEventListener('click', showNextTestimonial);
  prevBtn.addEventListener('click', showPrevTestimonial);
  googleSigninBtn.addEventListener('click', showPopup);
});




const popup = document.getElementById("popup");
const telmeButton = document.getElementById("telme");
const closeBtns = document.querySelectorAll(".close-btns"); 
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");


const projects = [
    {
        title: "TRAVEL",
        description: "pakyu",
        imageUrl: "./picturesabout/familes.jpg"
    },
    {
        title: "TRAVEL",
        description: "pakiss",
        imageUrl: "./picturesabout/familys.jpg"
    },
    {
        title: "FAMILY",
        description: "Latest updates and trends in technology.",
        imageUrl: "./picturesabout/1.jpg"
    },
     {
        title: "PASKO",
        description: "Latest updates and trends in technology.",
        imageUrl: "./picturesabout/2.jpg"
    }, {
        title: "FAMILYS",
        description: "Latest updates and trends in technology.",
        imageUrl: "./picturesabout/3.jpg"
    }, {
        title: "FAMILSS",
        description: "Latest updates and trends in technology.",
        imageUrl: "./picturesabout/4.jpg"
    }
];

let currentIndex = 0;


telmeButton.addEventListener("click", () => {
    popup.style.display = "flex"; 
    updateContent(currentIndex); 
});


closeBtns.forEach(button => {
    button.addEventListener("click", () => {
        popup.style.display = "none"; 
    });
});


window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none"; 
    }
});

function updateContent(index) {
    const project = projects[index];
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-description").textContent = project.description;
    document.getElementById("project-image").src = project.imageUrl;
}

leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateContent(currentIndex); 
});

rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projects.length;
    updateContent(currentIndex); 
});
