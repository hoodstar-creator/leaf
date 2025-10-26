document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const screens = {
        loading: document.getElementById('loading-screen'),
        app: document.getElementById('app-content'),
        mate: document.getElementById('mate-screen'),
        neighbor: document.getElementById('neighbor-screen'),
        bangackang: document.getElementById('bangackang-screen'),
        more: document.getElementById('more-screen'),
    };
    const infoSheet = document.getElementById('info-sheet');
    const sheetOriginalContent = document.getElementById('sheet-original-content');
    const sheetInterestsContent = document.getElementById('sheet-interests-content');
    const appContentArea = screens.app?.querySelector('.content-area');
    const navLinks = document.querySelectorAll('.nav-item');

    const navItems = {
        home: document.getElementById('nav-home'),
        mate: document.getElementById('nav-mate'),
        neighbor: document.getElementById('nav-neighbor'),
        bangackang: document.getElementById('nav-bangackang'),
        more: document.getElementById('nav-more'),
    };

    const goToNeighborBtn = document.getElementById('go-to-neighbor');

    // Mate screen tab selectors
    const tabFindBundles = document.getElementById('tab-find-bundles');
    const tabMyBundles = document.getElementById('tab-my-bundles');
    const findBundlesContent = document.getElementById('find-bundles-content');
    const myBundlesContent = document.getElementById('my-bundles-content');

    // Neighbor screen filter selectors
    const neighborFilters = {
        all: document.getElementById('filter-all'),
        online: document.getElementById('filter-online'),
        birthday: document.getElementById('filter-birthday'),
    };
    const neighborCountEl = document.getElementById('neighbor-count');
    const allNeighborCards = document.querySelectorAll('.neighbor-card');

    const allScreenElements = Object.values(screens).filter(Boolean);
    const allNavItems = Object.values(navItems).filter(Boolean);

    // --- Core Functions ---

    const updateUIForScreen = (activeScreen, activeNavItem) => {
        allScreenElements.forEach(screen => screen.classList.remove('active'));
        allNavItems.forEach(item => {
            if (!item) return;
            const img = item.querySelector('img');
            if (img) img.style.opacity = '0.5';
        });

        if (activeScreen) activeScreen.classList.add('active');
        if (activeNavItem) {
            const img = activeNavItem.querySelector('img');
            if (img) img.style.opacity = '1';
        }

        document.documentElement.classList.toggle('sheet-visible', 
            infoSheet?.classList.contains('active') && activeScreen === screens.app
        );
    };
    
    const setupNavigation = () => {
        Object.entries(navItems).forEach(([key, navItem]) => {
            navItem?.addEventListener('click', (e) => {
                e.preventDefault();
                const screenKey = key === 'home' ? 'app' : key;
                updateUIForScreen(screens[screenKey], navItem);
            });
        });
        goToNeighborBtn?.addEventListener('click', (e) => { e.preventDefault(); updateUIForScreen(screens.neighbor, navItems.neighbor); });
    };

    const setupMateTabs = () => {
        const tabs = [tabFindBundles, tabMyBundles];
        const contents = [findBundlesContent, myBundlesContent];

        tabs.forEach((tab, index) => {
            tab?.addEventListener('click', (e) => {
                e.preventDefault();
                tabs.forEach(t => t?.classList.remove('active'));
                contents.forEach(c => c?.classList.remove('active'));
                tab.classList.add('active');
                contents[index]?.classList.add('active');
            });
        });
    };

    const filterNeighbors = (filterType) => {
        let visibleCount = 0;
        allNeighborCards.forEach(card => {
            const status = card.dataset.status;
            const isBirthday = card.dataset.birthday === 'true';
            let shouldShow = false;

            switch (filterType) {
                case 'online': shouldShow = status === 'online'; break;
                case 'birthday': shouldShow = isBirthday; break;
                case 'all': default: shouldShow = true; break;
            }

            card.style.display = shouldShow ? 'flex' : 'none';
            if (shouldShow) visibleCount++;
        });
        if (neighborCountEl) {
             neighborCountEl.textContent = filterType === 'birthday' ? `생일인 이웃 ${visibleCount}` : `이웃 ${visibleCount}`;
        }
    };

    const setupNeighborFilters = () => {
        const filterLinks = [neighborFilters.all, neighborFilters.online].filter(Boolean);
        
        const setActiveFilterLink = (activeLink) => {
            filterLinks.forEach(link => link.classList.remove('active'));
            if (activeLink) activeLink.classList.add('active');
        };

        neighborFilters.all?.addEventListener('click', (e) => { e.preventDefault(); filterNeighbors('all'); setActiveFilterLink(neighborFilters.all); });
        neighborFilters.online?.addEventListener('click', (e) => { e.preventDefault(); filterNeighbors('online'); setActiveFilterLink(neighborFilters.online); });
        neighborFilters.birthday?.addEventListener('click', (e) => { e.preventDefault(); filterNeighbors('birthday'); setActiveFilterLink(null); });
        
        if (neighborCountEl) neighborCountEl.textContent = `이웃 ${allNeighborCards.length}`;
    };

    const setupInfoSheetInteraction = () => {
        if (!infoSheet || !sheetOriginalContent || !sheetInterestsContent || !appContentArea) return;

        const expandSheet = () => {
            if (infoSheet.classList.contains('sheet-expanded')) return;
            infoSheet.classList.add('sheet-expanded');
            sheetOriginalContent.style.opacity = '0';
            setTimeout(() => {
                sheetOriginalContent.style.display = 'none';
                sheetInterestsContent.style.display = 'block';
                sheetInterestsContent.style.opacity = '1';
            }, 300); 
        };

        const collapseSheet = () => {
            if (!infoSheet.classList.contains('sheet-expanded')) return;
            infoSheet.classList.remove('sheet-expanded');
            sheetInterestsContent.style.opacity = '0';
            setTimeout(() => {
                sheetInterestsContent.style.display = 'none';
                sheetOriginalContent.style.display = 'block';
                sheetOriginalContent.style.opacity = '1';
            }, 300);
        };

        infoSheet.addEventListener('click', (event) => {
            if (!infoSheet.classList.contains('sheet-expanded')) {
                expandSheet();
            }
            event.stopPropagation();
        });

        document.body.addEventListener('click', (event) => {
            if (infoSheet.classList.contains('sheet-expanded') && !infoSheet.contains(event.target)) {
                collapseSheet();
            }
        });
    };
        //추가된부분------------    
            const initCalendar = () => {
            const calendarContainer = document.getElementById('more-screen');
            if (!calendarContainer) return;

            const monthYearElement = document.getElementById('month-year');
            const calendarDaysElement = document.getElementById('calendar-days');
            const prevMonthButton = document.getElementById('prev-month');
            const nextMonthButton = document.getElementById('next-month');
            const scheduleDateTextElement = document.getElementById('schedule-date-text');

            let currentDate = new Date(2025, 9, 1); // 2025년 10월

            const renderCalendar = () => {
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                monthYearElement.textContent = `${year} ${month + 1}월`;
                calendarDaysElement.innerHTML = '';

                const firstDayIndex = new Date(year, month, 1).getDay();
                const lastDate = new Date(year, month + 1, 0).getDate();
                const prevLastDate = new Date(year, month, 0).getDate();

                // 이전 달의 날짜 표시
                for (let i = firstDayIndex; i > 0; i--) {
                    const day = document.createElement('span');
                    day.textContent = prevLastDate - i + 1;
                    day.classList.add('other-month');
                    calendarDaysElement.appendChild(day);
                }

                // 이번 달의 날짜 표시
                for (let i = 1; i <= lastDate; i++) {
                    const day = document.createElement('span');
                    day.textContent = i;
                    if (i === 16 || i === 26) day.classList.add('has-event');
                    day.addEventListener('click', () => {
                        const selected = calendarDaysElement.querySelector('.selected');
                        if (selected) selected.classList.remove('selected');
                        day.classList.add('selected');
                        scheduleDateTextElement.textContent = `${month + 1}월 ${i}일에`;
                    });
                    calendarDaysElement.appendChild(day);
                }

                // 다음 달의 앞부분 날짜 채우기
                const totalDays = calendarDaysElement.children.length;
                const nextDays = (7 - (totalDays % 7)) % 7;
                for (let i = 1; i <= nextDays; i++) {
                    const day = document.createElement('span');
                    day.textContent = i;
                    day.classList.add('other-month');
                    calendarDaysElement.appendChild(day);
                }

                // 초기 선택 (26일)
                if (!calendarDaysElement.querySelector('.selected')) {
                    scheduleDateTextElement.textContent = `${month + 1}월 26일에`;
                    const day26 = Array.from(calendarDaysElement.querySelectorAll('span:not(.other-month)'))
                        .find(d => d.textContent === '26');
                    if (day26) day26.classList.add('selected');
                }
            };

            // 이전/다음 버튼
            prevMonthButton.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });
            nextMonthButton.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });

            // ✅ 캘린더 최초 렌더링 추가
            renderCalendar();
        };

    // --- Initialization ---

    if (screens.loading && screens.app && infoSheet) {
        setTimeout(() => {
            screens.loading.style.opacity = '0';
            screens.loading.addEventListener('transitionend', () => screens.loading.style.display = 'none');
            updateUIForScreen(screens.app, navItems.home);

            setTimeout(() => {
                if (screens.app.classList.contains('active')) {
                    infoSheet.classList.add('active');
                    updateUIForScreen(screens.app, navItems.home); 
                }
            }, 500);
        }, 1500);
    }

    setupNavigation();
    setupMateTabs();
    setupNeighborFilters();
    setupInfoSheetInteraction();
    initCalendar(); // Initialize the calendar functionality
});

