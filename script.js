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
    const allScreenElements = Object.values(screens).filter(Boolean);
    const allNavItems = Object.values(navItems).filter(Boolean);

    // --- Data ---
    const neighborData = [
        { name: "권재현", subtitle: "스파크 팀장 권재현입니다", description: "떡잎 프로젝트의 팀장을 맡고 있습니다.", profilePic: "1202.png", location: "서울특별시 마포구 양화로", job: "일러스트레이터", date: "2023년 6월", interests: ["자전거", "독서", "강아지"], mbti: "INFJ", email: "rkdskdzhd@gmail.com", online: false },
        { name: "나기찬", subtitle: "스파크 기획 나기찬입니다", description: "떡잎 서비스의 기획을 담당합니다.", profilePic: "1206.png", location: "서울시 성동구", job: "UX 디자이너", date: "2024년 1월", interests: ["고양이", "커피", "산책"], mbti: "INFP", email: "nakichan@example.com", online: true },
        { name: "박근우", subtitle: "스파크 개발 박근우입니다", description: "떡잎 앱의 프론트엔드 개발을 맡았습니다.", profilePic: "1207.png", location: "경기도 안산시", job: "프론트엔드 개발자", date: "2023년 11월", interests: ["코딩", "게임", "음악감상"], mbti: "ISTP", email: "geunwoo@example.com", online: true },
        { name: "이규원", subtitle: "스파크 발표 이규원입니다", description: "떡잎 프로젝트의 발표와 디자인을 담당합니다.", profilePic: "1218.png", location: "경기도 과천시", job: "UI/UX 디자이너", date: "2023년 8월", interests: ["디자인", "여행", "사진"], mbti: "ENFP", email: "kyuwon@example.com", online: false },
        { name: "조율희", subtitle: "KDMHS 24DC", description: "24기디컨 조율희 입니다.", profilePic: "1224.png", location: "경기도 시흥시", job: "학생", date: "2024년 3월", interests: ["그림", "영상편집", "영화"], mbti: "INTP", email: "yulhee@example.com", online: true },
        { name: "최서연", subtitle: "데이터 분석가 지망생", description: "파이썬과 R을 공부하고 있습니다. 같이 성장해요!", profilePic: "1218.png", location: "인천광역시 연수구", job: "데이터 분석가", date: "2024년 2월", interests: ["데이터분석", "머신러닝", "독서"], mbti: "ISTJ", email: "seoyeon@example.com", online: false },
        { name: "강지훈", subtitle: "백엔드 개발자", description: "Spring Boot와 JPA를 다룹니다. 커피챗 환영!", profilePic: "https://static.solved.ac/uploads/profile/360x360/hoodstar1018-picture-1759662779491.png", location: "서울특별시 강남구", job: "백엔드 개발자", date: "2023-09-01", interests: ["알고리즘", "커피", "헬스"], mbti: "ENTJ", email: "jihun@example.com", online: true },
        { name: "윤채원", subtitle: "iOS 개발자", description: "SwiftUI로 예쁜 앱 만드는 것을 좋아해요.", profilePic: "1218.png", location: "서울특별시 서초구", job: "iOS 개발자", date: "2024-04-15", interests: ["SwiftUI", "애니메이션", "클라이밍"], mbti: "ENFP", email: "chaewon@example.com", online: true },
        { name: "김규진", subtitle: "알고리즘 풀이 중", description: "백준 루비를 목표로 달리는 중입니다.", profilePic: "https://static.solved.ac/uploads/profile/360x360/magic_spirit-picture-1730540336652.png", location: "대전광역시 유성구", job: "대학생", date: "2023-03-02", interests: ["PS", "LOL", "보드게임"], mbti: "INTP", email: "gyujin@example.com", online: false },
        { name: "조은우", subtitle: "PM이 되고 싶어요", description: "기획과 프로젝트 관리에 대한 이야기를 나눠요.", profilePic: "https://static.solved.ac/uploads/profile/360x360/ho991217-picture-1646121336321.png", location: "부산광역시 해운대구", job: "기획자", date: "2023-12-20", interests: ["기획", "독서모임", "영화감상"], mbti: "ESFJ", email: "eunwoo@example.com", online: false }
    ];

    // --- Profile Modal --- 
    const profileModal = document.getElementById('neighbor-profile-modal');
    const closeModal = document.querySelector('.close-button');

    const setupProfileModal = () => {
        const neighborCards = document.querySelectorAll('.neighbor-card');
        neighborCards.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('h3').textContent;
                const data = neighborData.find(n => n.name === name);
                if (!data) return;

                document.getElementById('modal-profile-pic').src = data.profilePic;
                document.getElementById('modal-profile-name').textContent = data.name;
                document.getElementById('modal-profile-subtitle').textContent = data.subtitle;
                document.getElementById('modal-profile-description').textContent = data.description;
                document.getElementById('modal-profile-location').textContent = `📍 ${data.location}`;
                document.getElementById('modal-profile-job').textContent = `💼 ${data.job}`;
                document.getElementById('modal-profile-date').textContent = `📅 ${data.date}`;
                document.getElementById('modal-profile-mbti').textContent = `mbti: ${data.mbti}`;
                document.getElementById('modal-profile-email').textContent = `email: ${data.email}`;

                const interestsContainer = document.getElementById('modal-profile-interests');
                interestsContainer.innerHTML = '';
                data.interests.forEach(interest => {
                    const interestTag = document.createElement('span');
                    interestTag.textContent = interest;
                    interestsContainer.appendChild(interestTag);
                });

                profileModal.classList.remove('hidden');
            });
        });

        closeModal?.addEventListener('click', () => profileModal.classList.add('hidden'));
        profileModal?.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                profileModal.classList.add('hidden');
            }
        });
    };


    // --- Core Functions ---
    const updateUIForScreen = (activeScreen, activeNavItem) => {
        allScreenElements.forEach(screen => screen.classList.remove('active'));
        allNavItems.forEach(item => {
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
    
    const setupInfoSheetInteraction = () => {
        if (!infoSheet || !sheetOriginalContent || !sheetInterestsContent) return;

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
            if (!monthYearElement || !calendarDaysElement) return;

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            monthYearElement.textContent = `${year} ${month + 1}월`;
            calendarDaysElement.innerHTML = '';

            const firstDayIndex = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();
            const prevLastDate = new Date(year, month, 0).getDate();

            for (let i = firstDayIndex; i > 0; i--) {
                const day = document.createElement('span');
                day.textContent = prevLastDate - i + 1;
                day.classList.add('other-month');
                calendarDaysElement.appendChild(day);
            }

            for (let i = 1; i <= lastDate; i++) {
                const day = document.createElement('span');
                day.textContent = i;
                if (i === 16 || i === 26) day.classList.add('has-event');
                day.addEventListener('click', () => {
                    const selected = calendarDaysElement.querySelector('.selected');
                    if (selected) selected.classList.remove('selected');
                    day.classList.add('selected');
                    if (scheduleDateTextElement) scheduleDateTextElement.textContent = `${month + 1}월 ${i}일에`;
                });
                calendarDaysElement.appendChild(day);
            }

            const totalDays = calendarDaysElement.children.length;
            const nextDays = (7 - (totalDays % 7)) % 7;
            for (let i = 1; i <= nextDays; i++) {
                const day = document.createElement('span');
                day.textContent = i;
                day.classList.add('other-month');
                calendarDaysElement.appendChild(day);
            }
            
            if (scheduleDateTextElement && !calendarDaysElement.querySelector('.selected')) {
                scheduleDateTextElement.textContent = `${month + 1}월 26일에`;
                const day26 = Array.from(calendarDaysElement.querySelectorAll('span:not(.other-month)'))
                    .find(d => d.textContent === '26');
                if (day26) day26.classList.add('selected');
            }
        };

        prevMonthButton?.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        nextMonthButton?.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        renderCalendar();
    };

    // --- Initialization ---
    const handleInitialLoad = () => {
        const hash = window.location.hash.substring(1);
        
        if (screens.loading && screens.app && infoSheet) {
            setTimeout(() => {
                screens.loading.style.opacity = '0';
                screens.loading.addEventListener('transitionend', () => screens.loading.style.display = 'none');
                
                let activeScreen = screens.app;
                let activeNavItem = navItems.home;

                if (hash && screens[hash] && navItems[hash]) {
                    activeScreen = screens[hash];
                    activeNavItem = navItems[hash];
                }

                updateUIForScreen(activeScreen, activeNavItem);

                setTimeout(() => {
                    if (infoSheet && activeScreen === screens.app) {
                        infoSheet.classList.add('active');
                        updateUIForScreen(screens.app, navItems.home);
                    }
                }, 500);

            }, 1500);
        } 
    };
    
    handleInitialLoad();
    setupNavigation();
    setupMateTabs();
    setupProfileModal(); // <-- setupNeighborCards() 대신 호출
    setupInfoSheetInteraction();
    initCalendar();
});
