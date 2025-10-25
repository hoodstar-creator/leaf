document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const loadingScreen = document.getElementById('loading-screen');
    const appContent = document.getElementById('app-content');
    const mateScreen = document.getElementById('mate-screen');

    // Bottom Sheet
    const infoSheet = document.getElementById('info-sheet');

    // Main Navigation
    const navHome = document.getElementById('nav-home');
    const navMate = document.getElementById('nav-mate');

    // Mate Screen Tabs & Content
    const tabFindBundles = document.getElementById('tab-find-bundles');
    const tabMyBundles = document.getElementById('tab-my-bundles');
    const findBundlesContent = document.getElementById('find-bundles-content');
    const myBundlesContent = document.getElementById('my-bundles-content');

    // --- 1. Initial Loading Logic ---
    setTimeout(() => {
        loadingScreen.classList.remove('active');
        appContent.classList.add('active');

        // --- 2. Info Sheet Animation on Home Screen ---
        setTimeout(() => {
            if (document.documentElement && infoSheet) {
                document.documentElement.classList.add('sheet-visible');
                infoSheet.classList.add('active');
            }
        }, 500); // Adjusted delay for better UX

    }, 1500);

    // --- 3. Main Screen Navigation Logic ---
    navHome.addEventListener('click', (e) => {
        e.preventDefault();
        if (!appContent.classList.contains('active')) {
            mateScreen.classList.remove('active');
            appContent.classList.add('active');
        }
    });

    navMate.addEventListener('click', (e) => {
        e.preventDefault();
        if (!mateScreen.classList.contains('active')) {
            appContent.classList.remove('active');
            mateScreen.classList.add('active');
        }
    });

    // --- 4. Mate Screen Tab Logic (Final & Stable) ---
    if (tabFindBundles && tabMyBundles && findBundlesContent && myBundlesContent) {
        tabFindBundles.addEventListener('click', (e) => {
            e.preventDefault();
            if (!tabFindBundles.classList.contains('active')) {
                tabMyBundles.classList.remove('active');
                myBundlesContent.classList.remove('active');
                
                tabFindBundles.classList.add('active');
                findBundlesContent.classList.add('active');
            }
        });

        tabMyBundles.addEventListener('click', (e) => {
            e.preventDefault();
            if (!tabMyBundles.classList.contains('active')) {
                tabFindBundles.classList.remove('active');
                findBundlesContent.classList.remove('active');

                tabMyBundles.classList.add('active');
                myBundlesContent.classList.add('active');
            }
        });
    }
});
