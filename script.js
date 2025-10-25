document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const loadingScreen = document.getElementById('loading-screen');
    const appContent = document.getElementById('app-content');
    const mateScreen = document.getElementById('mate-screen');
    const neighborScreen = document.getElementById('neighbor-screen');
    const bangackangScreen = document.getElementById('bangackang-screen'); // 방앗간 화면 추가
    const moreScreen = document.getElementById('more-screen');         // 더보기 화면 추가
    const infoSheet = document.getElementById('info-sheet');

    const navItems = {
        home: document.getElementById('nav-home'),
        mate: document.getElementById('nav-mate'),
        neighbor: document.getElementById('nav-neighbor'),
        bangackang: document.getElementById('nav-bangackang'),
        more: document.getElementById('nav-more'),
    };

    const goToNeighborBtn = document.getElementById('go-to-neighbor');

    const tabFindBundles = document.getElementById('tab-find-bundles');
    const tabMyBundles = document.getElementById('tab-my-bundles');
    const findBundlesContent = document.getElementById('find-bundles-content');
    const myBundlesContent = document.getElementById('my-bundles-content');

    // 모든 화면 요소를 배열에 포함
    const allScreens = [appContent, mateScreen, neighborScreen, bangackangScreen, moreScreen];
    const allNavItems = Object.values(navItems);

    // --- Core Functions ---

    const updateUIForScreen = (activeScreen, activeNavItem) => {
        allScreens.forEach(screen => screen?.classList.remove('active'));
        allNavItems.forEach(item => {
            if(item) {
                const img = item.querySelector('img');
                if (img) img.style.opacity = '0.5';
            }
        });

        if (activeScreen) activeScreen.classList.add('active');
        if (activeNavItem) {
            const img = activeNavItem.querySelector('img');
            if (img) img.style.opacity = '1';
        }

        const isSheetActive = infoSheet?.classList.contains('active');
        const isHomeScreenActive = activeScreen === appContent;
        document.documentElement.classList.toggle('sheet-visible', isSheetActive && isHomeScreenActive);
    };

    const setupNavigation = () => {
        navItems.home?.addEventListener('click', (e) => {
            e.preventDefault();
            updateUIForScreen(appContent, navItems.home);
        });

        navItems.mate?.addEventListener('click', (e) => {
            e.preventDefault();
            updateUIForScreen(mateScreen, navItems.mate);
        });

        navItems.neighbor?.addEventListener('click', (e) => {
            e.preventDefault();
            updateUIForScreen(neighborScreen, navItems.neighbor);
        });

        goToNeighborBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            updateUIForScreen(neighborScreen, navItems.neighbor);
        });

        // '방앗간' 버튼 클릭 시 '방앗간' 화면 표시
        navItems.bangackang?.addEventListener('click', (e) => {
            e.preventDefault();
            updateUIForScreen(bangackangScreen, navItems.bangackang);
        });

        // '더보기' 버튼 클릭 시 '더보기' 화면 표시
        navItems.more?.addEventListener('click', (e) => {
            e.preventDefault();
            updateUIForScreen(moreScreen, navItems.more);
        });
    };

    const setupMateTabs = () => {
        if (!tabFindBundles || !tabMyBundles || !findBundlesContent || !myBundlesContent) return;

        const tabs = [tabFindBundles, tabMyBundles];
        const contents = [findBundlesContent, myBundlesContent];

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                contents[index].classList.add('active');
            });
        });
    };

    // --- Initialization ---

    if (loadingScreen && appContent && infoSheet) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            updateUIForScreen(appContent, navItems.home);

            setTimeout(() => {
                if (appContent.classList.contains('active')) {
                    infoSheet.classList.add('active');
                    updateUIForScreen(appContent, navItems.home);
                }
            }, 500);

        }, 1500);
    }

    setupNavigation();
    setupMateTabs();
});
