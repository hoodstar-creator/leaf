document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const appContent = document.getElementById('app-content');
    const infoSheet = document.getElementById('info-sheet');
    const body = document.body;

    // --- 1. Loading Screen Logic ---
    setTimeout(() => {
        loadingScreen.classList.remove('active');
        appContent.classList.add('active');

        // --- 2. Info Sheet Animation Logic ---
        // After the app content is visible, wait 0.5s and then slide up the sheet.
        setTimeout(() => {
            // Add class to body to hide initial elements
            document.documentElement.classList.add('sheet-visible');
            
            // Activate the info sheet to slide it up
            infoSheet.classList.add('active');
        }, 2500); // 0.5 second delay

    }, 1500); // 1.5 second initial loading time
});
