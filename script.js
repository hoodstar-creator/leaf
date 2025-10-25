document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const appContent = document.getElementById('app-content');

    // --- Start the loading process ---
    // 1. Set a timer for the splash screen duration
    setTimeout(() => {
        // 2. Remove 'active' class to trigger the fade-out transition
        loadingScreen.classList.remove('active');

        // 3. Listen for the end of the transition event
        loadingScreen.addEventListener('transitionend', function onTransitionEnd() {
            // 4. Once the fade-out is complete, hide the loading screen permanently
            loadingScreen.style.display = 'none';
            
            // 5. Activate the main app content to trigger its fade-in
            appContent.classList.add('active');

            // 6. Clean up the event listener to prevent it from firing again
            loadingScreen.removeEventListener('transitionend', onTransitionEnd);
        });

    }, 2500); // 2.5-second splash screen display time
});
