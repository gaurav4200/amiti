document.addEventListener('DOMContentLoaded', function () {
    let navbar = document.getElementById('navbar');
    let menuIcon = document.querySelector('.nav-left i');
    let navLeft = document.querySelector('.nav-left');
    let loginBtn = document.querySelector('.login-btn');
    let signupBtn = document.querySelector('.signup-btn');
    let overlay = document.getElementById('overlay'); // Reference to the overlay

    // Change navbar background on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Open or close the sidebar when clicking the menu icon
    menuIcon.addEventListener('click', function () {
        toggleSidebar();
    });

    function toggleSidebar() {
        let sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");

        // If the sidebar is open, listen for clicks outside
        if (sidebar.classList.contains('open')) {
            overlay.style.display = 'block'; 
        } else {
            overlay.style.display = 'none';
        }
    }

    // Close the sidebar if clicked outside
    overlay.addEventListener('click', function () {
        toggleSidebar();
    });

    loginBtn.addEventListener('click', function () {
        window.location.href = 'signup.html';
    });
    
    signupBtn.addEventListener('click', function () {
        window.location.href = 'signup.html';
    });
});
