export type Locale = 'en' | 'vi';

export type NavItem = {
  label: string;
  target: 'about' | 'expertise' | 'process' | 'projects' | 'contact';
};

export type Principle = {
  index: string;
  title: string;
  description: string;
};

export type ExpertiseGroup = {
  index: string;
  title: string;
  description: string;
  skills: readonly string[];
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export type Project = {
  id: 'tien-dat-audio' | 'toeic-master' | 'xtruyen' | 'mynotch';
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  detail: string;
  highlights: readonly string[];
  stack: readonly string[];
  repoUrl?: string;
  liveUrl?: string;
};

export type PortfolioContent = {
  nav: readonly NavItem[];
  common: {
    skip: string;
    menu: string;
    close: string;
    viewProject: string;
    collapseProject: string;
    source: string;
    live: string;
    privateRepo: string;
    next: string;
    previous: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    headline: string;
    intro: string;
    primary: string;
    secondary: string;
    availability: string;
    timezone: string;
    focusLabel: string;
    focusValue: string;
    terminal: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    quote: string;
    principles: readonly Principle[];
  };
  expertise: {
    eyebrow: string;
    title: string;
    lead: string;
    groups: readonly ExpertiseGroup[];
  };
  process: {
    eyebrow: string;
    title: string;
    lead: string;
    packet: string;
    steps: readonly ProcessStep[];
  };
  projects: {
    eyebrow: string;
    title: string;
    lead: string;
    hint: string;
    items: readonly Project[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    note: string;
    footer: string;
  };
};

export const portfolioContent = {
  en: {
    nav: [
      { label: 'About', target: 'about' },
      { label: 'Expertise', target: 'expertise' },
      { label: 'Process', target: 'process' },
      { label: 'Projects', target: 'projects' },
      { label: 'Contact', target: 'contact' },
    ],
    common: {
      skip: 'Skip to content',
      menu: 'Open navigation',
      close: 'Close navigation',
      viewProject: 'Open project details',
      collapseProject: 'Close project details',
      source: 'Source code',
      live: 'Live website',
      privateRepo: 'Private repository',
      next: 'Next project',
      previous: 'Previous project',
    },
    hero: {
      eyebrow: 'Backend Developer · 2 years of experience',
      title: 'Dat Truong',
      headline: 'Reliable APIs. Production-ready systems.',
      intro:
        'I build backend systems that stay clear under pressure—secure by default, observable in production, and ready to scale.',
      primary: 'Explore my work',
      secondary: 'View GitHub',
      availability: 'Open to meaningful backend opportunities',
      timezone: 'UTC+7 · Vietnam',
      focusLabel: 'Current focus',
      focusValue: 'API architecture · DevOps · Reliability',
      terminal: 'shipping dependable software',
      scroll: 'Scroll to trace the system',
    },
    about: {
      eyebrow: '01 / About',
      title: 'Simple by design. Solid in production.',
      lead:
        'I am a backend developer focused on turning product requirements into maintainable systems—from API contracts and business logic to deployment and monitoring.',
      body:
        'My work spans TypeScript and Node.js, PHP/Laravel, relational and document databases, containerized delivery, CI/CD, and cloud integrations. I care about small, deliberate solutions that remain secure and easy to operate.',
      quote: 'Reliability is not a final polish. It is an architectural decision.',
      principles: [
        {
          index: '01',
          title: 'Simple, not simplistic',
          description: 'Reduce accidental complexity while keeping the boundaries explicit.',
        },
        {
          index: '02',
          title: 'Reliability first',
          description: 'Design for visibility, predictable failure, and safe recovery.',
        },
        {
          index: '03',
          title: 'Automate the repeatable',
          description: 'Use CI/CD and tooling to make quality the default path.',
        },
        {
          index: '04',
          title: 'Learn in the open',
          description: 'Document decisions, share context, and improve through feedback.',
        },
      ],
    },
    expertise: {
      eyebrow: '02 / Expertise',
      title: 'The stack behind dependable delivery.',
      lead:
        'A practical toolkit for building APIs, managing data, securing workflows, and moving software from local development to production.',
      groups: [
        {
          index: 'A',
          title: 'Backend systems',
          description: 'Modular services, typed business logic, authentication, and integrations.',
          skills: ['TypeScript', 'Node.js', 'NestJS', 'Express.js', 'PHP', 'Laravel', 'Go', 'Python'],
        },
        {
          index: 'B',
          title: 'API & security',
          description: 'Clear contracts and defensive boundaries across services.',
          skills: ['REST', 'GraphQL', 'JWT', 'RBAC', 'Rate limiting', 'Webhooks', 'HMAC', '2FA'],
        },
        {
          index: 'C',
          title: 'Data & performance',
          description: 'Data models and access paths that remain understandable at scale.',
          skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'pgvector', 'Caching', 'Query profiling'],
        },
        {
          index: 'D',
          title: 'DevOps & cloud',
          description: 'Repeatable builds, guarded deployments, and observable runtimes.',
          skills: ['Docker', 'GitHub Actions', 'GitLab CI', 'Nginx', 'PM2', 'systemd', 'AWS', 'CloudWatch'],
        },
      ],
    },
    process: {
      eyebrow: '03 / Process',
      title: 'From request to reliable runtime.',
      lead:
        'Every system follows a traceable path. The details change; the discipline stays the same.',
      packet: 'request.packet',
      steps: [
        { index: '01', title: 'Understand', description: 'Clarify the user, constraints, and measurable outcome.' },
        { index: '02', title: 'Design', description: 'Define boundaries, contracts, data flow, and failure modes.' },
        { index: '03', title: 'Build', description: 'Implement focused business logic with secure defaults.' },
        { index: '04', title: 'Verify', description: 'Exercise the critical paths and document the evidence.' },
        { index: '05', title: 'Operate', description: 'Deploy safely, observe behavior, and iterate from feedback.' },
      ],
    },
    projects: {
      eyebrow: '04 / Selected work',
      title: 'Systems, products, and technical research.',
      lead:
        'Four products I built and run: a production commerce site, an AI study platform, a reading platform with a Go API, and a modular macOS app. The three web products are live on my own VPS behind Nginx and Cloudflare.',
      hint: 'Scroll, drag, or use the arrow keys',
      items: [
        {
          id: 'tien-dat-audio',
          index: '01',
          title: 'TienDatAudio',
          category: 'Commerce & content platform',
          year: '2025—26',
          summary:
            'The production website and CMS for an audio equipment business in Quang Ngai: catalog, combos, technical articles, lead capture, and an AI consultation assistant.',
          detail:
            'Built with the Next.js App Router and MongoDB, using the native driver with a JSON fallback. The admin CMS manages products, combos, posts, taxonomy, orders, SEO, and social posts behind HMAC-signed HTTP-only sessions and scrypt-hashed passwords. A DeepSeek-backed assistant answers customers from the catalog. The site runs as a systemd service behind Nginx on an Ubuntu VPS, with GitHub Actions for CI, atomic releases, and editorial publishing.',
          highlights: ['Admin CMS behind signed sessions', 'Catalog-grounded AI assistant', 'Atomic releases with GitHub Actions'],
          stack: ['Next.js', 'TypeScript', 'MongoDB', 'Cloudinary', 'DeepSeek', 'Nginx', 'GitHub Actions'],
          repoUrl: 'https://github.com/DattruongRyan1912/tien-dat-audio',
          liveUrl: 'https://tiendataudioquangngai.id.vn/',
        },
        {
          id: 'toeic-master',
          index: '02',
          title: 'TOEIC Master',
          category: 'AI learning platform',
          year: '2026',
          summary:
            'A Vietnamese TOEIC Listening & Reading study platform for software engineers aiming at 800–900+, with mock tests, a mistake log, spaced-repetition vocabulary, and an AI mentor.',
          detail:
            'A Next.js 16 front end over a FastAPI and SQLAlchemy back end. Every wrong answer is tagged with a root cause and comes back for review after 1, 3, and 7 days; flashcards use SM-2; dictation diffs word by word and shadowing is scored by Gemini. The AI mentor has 27 function-calling tools whose writes are logged and can be undone, falls back from Gemini to DeepSeek, and enforces daily per-user quotas. It ships as two Docker containers, with CI running pytest, type checks, lint, and the web build.',
          highlights: ['AI mentor with 27 undoable tools', 'Mistake log with 1/3/7-day review', 'Gemini to DeepSeek fallback'],
          stack: ['Next.js', 'FastAPI', 'Python', 'SQLAlchemy', 'SQLite', 'Gemini API', 'Docker'],
          repoUrl: 'https://github.com/DattruongRyan1912/toeic-lab',
          liveUrl: 'https://toeic.truongquocdat.id.vn/',
        },
        {
          id: 'xtruyen',
          index: '03',
          title: 'XTruyen',
          category: 'Reading platform',
          year: '2026',
          summary:
            'A Vietnamese web-novel reading platform with a server-rendered catalog, search, a chapter reader, reader accounts, and an editor CMS.',
          detail:
            'It began as an evidence-based study of a public reading site and grew into a working product: a Next.js 15 front end over a Go API built on the standard library, with PostgreSQL 16 and a Redis 7 cache that falls back to Postgres. Accounts use bcrypt, server-side sessions, CSRF tokens, and per-route rate limits, with reader, editor, moderator, and admin roles. It runs on Docker Compose behind Caddy, and CI runs Go tests, an integration job against Postgres and Redis, and the web build.',
          highlights: ['Go API on the standard library', 'Redis cache with Postgres fallback', 'Role-based editor CMS'],
          stack: ['Go', 'Next.js', 'PostgreSQL', 'Redis', 'Docker Compose', 'GitHub Actions'],
          repoUrl: 'https://github.com/DattruongRyan1912/xtruyen',
          liveUrl: 'https://xtruyen.truongquocdat.id.vn/',
        },
        {
          id: 'mynotch',
          index: '04',
          title: 'MyNotch',
          category: 'macOS product',
          year: '2026',
          summary:
            'A modular macOS app that turns the MacBook notch into a workspace for music, clipboard, calendar, to-dos, timers, battery, files, and AI agent status.',
          detail:
            'Built with Swift 6 and SwiftUI for macOS 26. Fourteen feature modules, from Clipboard and Media to Calendar, Screenshot, Translation, and AI agents, each live in their own Swift package behind one module contract, and no module imports another. A permission center asks only for what the enabled modules need, and no data leaves the device by default. The landing page shows real screen recordings of each module.',
          highlights: ['14 isolated feature modules', 'Permissions scoped per module', 'Local-first, no network by default'],
          stack: ['Swift 6', 'SwiftUI', 'AppKit', 'Swift Packages', 'Swift Testing', 'XcodeGen'],
          liveUrl: 'https://mynotch.truongquocdat.id.vn/',
        },
      ],
    },
    contact: {
      eyebrow: '05 / Contact',
      title: 'Have a hard backend problem?',
      body:
        'I am interested in backend roles and collaborations where clear architecture, reliable delivery, and thoughtful engineering matter.',
      cta: 'Start a conversation on GitHub',
      note: 'Public contact channel · No tracking form',
      footer: 'Designed and engineered by Dat Truong (Ryan).',
    },
  },
  vi: {
    nav: [
      { label: 'Giới thiệu', target: 'about' },
      { label: 'Năng lực', target: 'expertise' },
      { label: 'Quy trình', target: 'process' },
      { label: 'Dự án', target: 'projects' },
      { label: 'Liên hệ', target: 'contact' },
    ],
    common: {
      skip: 'Bỏ qua đến nội dung',
      menu: 'Mở điều hướng',
      close: 'Đóng điều hướng',
      viewProject: 'Mở chi tiết dự án',
      collapseProject: 'Đóng chi tiết dự án',
      source: 'Mã nguồn',
      live: 'Website thực tế',
      privateRepo: 'Repository riêng tư',
      next: 'Dự án tiếp theo',
      previous: 'Dự án trước',
    },
    hero: {
      eyebrow: 'Backend Developer · 2 năm kinh nghiệm',
      title: 'Dat Truong',
      headline: 'API tin cậy. Hệ thống sẵn sàng vận hành.',
      intro:
        'Tôi xây dựng hệ thống backend rõ ràng khi chịu tải—bảo mật mặc định, quan sát được trên production và sẵn sàng mở rộng.',
      primary: 'Khám phá dự án',
      secondary: 'Xem GitHub',
      availability: 'Sẵn sàng cho những cơ hội backend ý nghĩa',
      timezone: 'UTC+7 · Việt Nam',
      focusLabel: 'Đang tập trung',
      focusValue: 'Kiến trúc API · DevOps · Độ tin cậy',
      terminal: 'đưa phần mềm tin cậy lên production',
      scroll: 'Cuộn để theo dõi hệ thống',
    },
    about: {
      eyebrow: '01 / Giới thiệu',
      title: 'Đơn giản trong thiết kế. Vững vàng khi vận hành.',
      lead:
        'Tôi là một backend developer tập trung biến yêu cầu sản phẩm thành hệ thống dễ bảo trì—từ hợp đồng API và business logic đến triển khai và giám sát.',
      body:
        'Công việc của tôi trải rộng trên TypeScript và Node.js, PHP/Laravel, cơ sở dữ liệu quan hệ và tài liệu, container, CI/CD cùng tích hợp cloud. Tôi ưu tiên giải pháp nhỏ gọn, có chủ đích, bảo mật và dễ vận hành.',
      quote: 'Độ tin cậy không phải lớp đánh bóng cuối cùng. Đó là một quyết định kiến trúc.',
      principles: [
        {
          index: '01',
          title: 'Đơn giản, không đơn sơ',
          description: 'Giảm độ phức tạp không cần thiết nhưng giữ ranh giới hệ thống rõ ràng.',
        },
        {
          index: '02',
          title: 'Tin cậy là ưu tiên',
          description: 'Thiết kế để quan sát được, lỗi có kiểm soát và phục hồi an toàn.',
        },
        {
          index: '03',
          title: 'Tự động hóa phần lặp lại',
          description: 'Dùng CI/CD và tooling để chất lượng trở thành con đường mặc định.',
        },
        {
          index: '04',
          title: 'Học hỏi cởi mở',
          description: 'Ghi lại quyết định, chia sẻ ngữ cảnh và cải thiện qua phản hồi.',
        },
      ],
    },
    expertise: {
      eyebrow: '02 / Năng lực',
      title: 'Bộ công cụ phía sau một quy trình giao hàng tin cậy.',
      lead:
        'Nền tảng thực tế để xây API, quản lý dữ liệu, bảo vệ workflow và đưa phần mềm từ local lên production.',
      groups: [
        {
          index: 'A',
          title: 'Hệ thống backend',
          description: 'Dịch vụ module hóa, business logic có type, xác thực và tích hợp.',
          skills: ['TypeScript', 'Node.js', 'NestJS', 'Express.js', 'PHP', 'Laravel', 'Go', 'Python'],
        },
        {
          index: 'B',
          title: 'API & bảo mật',
          description: 'Hợp đồng rõ ràng và ranh giới phòng thủ giữa các dịch vụ.',
          skills: ['REST', 'GraphQL', 'JWT', 'RBAC', 'Rate limiting', 'Webhooks', 'HMAC', '2FA'],
        },
        {
          index: 'C',
          title: 'Dữ liệu & hiệu năng',
          description: 'Mô hình dữ liệu và đường truy cập dễ hiểu khi hệ thống mở rộng.',
          skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'pgvector', 'Caching', 'Query profiling'],
        },
        {
          index: 'D',
          title: 'DevOps & cloud',
          description: 'Build lặp lại được, triển khai có bảo vệ và runtime quan sát được.',
          skills: ['Docker', 'GitHub Actions', 'GitLab CI', 'Nginx', 'PM2', 'systemd', 'AWS', 'CloudWatch'],
        },
      ],
    },
    process: {
      eyebrow: '03 / Quy trình',
      title: 'Từ yêu cầu đến runtime tin cậy.',
      lead:
        'Mỗi hệ thống đều đi qua một hành trình có thể truy vết. Chi tiết thay đổi, kỷ luật kỹ thuật thì không.',
      packet: 'request.packet',
      steps: [
        { index: '01', title: 'Thấu hiểu', description: 'Làm rõ người dùng, ràng buộc và kết quả đo lường được.' },
        { index: '02', title: 'Thiết kế', description: 'Định nghĩa ranh giới, hợp đồng, luồng dữ liệu và tình huống lỗi.' },
        { index: '03', title: 'Xây dựng', description: 'Hiện thực business logic tập trung với bảo mật mặc định.' },
        { index: '04', title: 'Xác minh', description: 'Kiểm tra luồng quan trọng và ghi nhận bằng chứng.' },
        { index: '05', title: 'Vận hành', description: 'Triển khai an toàn, quan sát hành vi và cải tiến từ phản hồi.' },
      ],
    },
    projects: {
      eyebrow: '04 / Dự án chọn lọc',
      title: 'Hệ thống, sản phẩm và nghiên cứu kỹ thuật.',
      lead:
        'Bốn sản phẩm tôi tự xây và vận hành: một website thương mại production, một nền tảng học tập AI, một nền tảng đọc truyện với Go API và một ứng dụng macOS chia module. Ba sản phẩm web đang chạy trên VPS riêng của tôi, sau Nginx và Cloudflare.',
      hint: 'Cuộn, kéo hoặc dùng phím mũi tên',
      items: [
        {
          id: 'tien-dat-audio',
          index: '01',
          title: 'TienDatAudio',
          category: 'Nền tảng thương mại & nội dung',
          year: '2025—26',
          summary:
            'Website production và CMS cho doanh nghiệp thiết bị âm thanh tại Quảng Ngãi: catalog, combo, bài viết kỹ thuật, thu thập lead và trợ lý tư vấn AI.',
          detail:
            'Xây bằng Next.js App Router và MongoDB, dùng native driver kèm JSON fallback. CMS quản trị sản phẩm, combo, bài viết, taxonomy, đơn hàng, SEO và bài mạng xã hội, bảo vệ bằng session cookie HTTP-only ký HMAC và mật khẩu băm scrypt. Trợ lý dùng DeepSeek trả lời khách dựa trên catalog. Site chạy như một systemd service sau Nginx trên Ubuntu VPS, với GitHub Actions cho CI, release nguyên tử và xuất bản bài viết.',
          highlights: ['CMS sau session có ký', 'Trợ lý AI bám theo catalog', 'Release nguyên tử qua GitHub Actions'],
          stack: ['Next.js', 'TypeScript', 'MongoDB', 'Cloudinary', 'DeepSeek', 'Nginx', 'GitHub Actions'],
          repoUrl: 'https://github.com/DattruongRyan1912/tien-dat-audio',
          liveUrl: 'https://tiendataudioquangngai.id.vn/',
        },
        {
          id: 'toeic-master',
          index: '02',
          title: 'TOEIC Master',
          category: 'Nền tảng học tập AI',
          year: '2026',
          summary:
            'Nền tảng tự học TOEIC Listening & Reading bằng tiếng Việt cho kỹ sư phần mềm nhắm 800–900+, gồm đề thi thử, sổ lỗi sai, từ vựng lặp lại ngắt quãng và AI mentor.',
          detail:
            'Frontend Next.js 16 trên backend FastAPI và SQLAlchemy. Mỗi câu sai được gắn nguyên nhân gốc và quay lại ôn sau 1, 3 và 7 ngày; flashcard dùng SM-2; chép chính tả so sánh từng từ, còn shadowing được Gemini chấm. AI mentor có 27 tool function-calling, mọi thao tác ghi đều được lưu vết và hoàn tác được, tự chuyển từ Gemini sang DeepSeek khi lỗi và giới hạn lượt dùng mỗi ngày cho từng người. Ứng dụng chạy bằng hai container Docker, CI chạy pytest, kiểm tra type, lint và build web.',
          highlights: ['AI mentor 27 tool hoàn tác được', 'Sổ lỗi sai ôn lại sau 1/3/7 ngày', 'Gemini chuyển sang DeepSeek khi lỗi'],
          stack: ['Next.js', 'FastAPI', 'Python', 'SQLAlchemy', 'SQLite', 'Gemini API', 'Docker'],
          repoUrl: 'https://github.com/DattruongRyan1912/toeic-lab',
          liveUrl: 'https://toeic.truongquocdat.id.vn/',
        },
        {
          id: 'xtruyen',
          index: '03',
          title: 'XTruyen',
          category: 'Nền tảng đọc truyện',
          year: '2026',
          summary:
            'Nền tảng đọc truyện chữ tiếng Việt với catalog render phía server, tìm kiếm, trình đọc theo chương, tài khoản độc giả và CMS cho biên tập viên.',
          detail:
            'Bắt đầu từ một nghiên cứu dựa trên bằng chứng về một site đọc truyện công khai, rồi phát triển thành sản phẩm chạy thật: frontend Next.js 15 trên Go API viết bằng thư viện chuẩn, PostgreSQL 16 và cache Redis 7 có fallback về Postgres. Tài khoản dùng bcrypt, session phía server, CSRF token và rate limit theo route, với các vai trò độc giả, biên tập, kiểm duyệt và quản trị. Hệ thống chạy bằng Docker Compose sau Caddy, CI chạy test Go, integration test với Postgres và Redis, và build web.',
          highlights: ['Go API dùng thư viện chuẩn', 'Cache Redis có fallback Postgres', 'CMS biên tập phân quyền'],
          stack: ['Go', 'Next.js', 'PostgreSQL', 'Redis', 'Docker Compose', 'GitHub Actions'],
          repoUrl: 'https://github.com/DattruongRyan1912/xtruyen',
          liveUrl: 'https://xtruyen.truongquocdat.id.vn/',
        },
        {
          id: 'mynotch',
          index: '04',
          title: 'MyNotch',
          category: 'Sản phẩm macOS',
          year: '2026',
          summary:
            'Ứng dụng macOS chia module, biến notch của MacBook thành chỗ làm việc cho nhạc, clipboard, lịch, việc cần làm, hẹn giờ, pin, khay file và trạng thái AI agent.',
          detail:
            'Xây bằng Swift 6 và SwiftUI cho macOS 26. Mười bốn module tính năng, từ Clipboard, Media đến Lịch, Ảnh chụp, Dịch và AI agents, mỗi module là một Swift package riêng sau cùng một hợp đồng module, và không module nào import module khác. Trung tâm quyền chỉ xin những quyền mà module đang bật cần, và mặc định không có dữ liệu nào rời khỏi máy. Trang giới thiệu dùng bản quay màn hình thật của từng module.',
          highlights: ['14 module tính năng độc lập', 'Quyền tách theo từng module', 'Ưu tiên local, mặc định không gửi dữ liệu'],
          stack: ['Swift 6', 'SwiftUI', 'AppKit', 'Swift Packages', 'Swift Testing', 'XcodeGen'],
          liveUrl: 'https://mynotch.truongquocdat.id.vn/',
        },
      ],
    },
    contact: {
      eyebrow: '05 / Liên hệ',
      title: 'Bạn có một bài toán backend khó?',
      body:
        'Tôi quan tâm đến các vị trí backend và cơ hội cộng tác đề cao kiến trúc rõ ràng, delivery tin cậy và kỹ thuật có chiều sâu.',
      cta: 'Bắt đầu trao đổi trên GitHub',
      note: 'Kênh liên hệ công khai · Không dùng form theo dõi',
      footer: 'Thiết kế và phát triển bởi Dat Truong (Ryan).',
    },
  },
} as const satisfies Record<Locale, PortfolioContent>;
