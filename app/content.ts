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
  id: 'dev-english' | 'tien-dat-audio' | 'chat-realtime' | 'xtruyen' | 'mynotch';
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
      privateRepo: 'Private repository · In development',
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
        'Four public projects and one product in development, showing how I approach backend architecture, delivery, real-time systems, evidence-driven product analysis, and modular native apps.',
      hint: 'Scroll, drag, or use the arrow keys',
      items: [
        {
          id: 'dev-english',
          index: '01',
          title: 'Dev-English',
          category: 'AI learning system',
          year: '2026',
          summary:
            'A focus-first technical English learning system that turns real developer work into adaptive practice.',
          detail:
            'Built around a Go modular monolith, Flutter client, PostgreSQL/pgvector, and bounded AI provider integrations. The product includes adaptive missions, spaced repetition, roleplay, vocabulary memory, authenticated sessions, and usage controls.',
          highlights: ['Adaptive learning loop', 'Secure AI provider boundaries', 'PostgreSQL + pgvector'],
          stack: ['Go', 'Flutter', 'PostgreSQL', 'pgvector', 'Docker', 'Azure Speech'],
          repoUrl: 'https://github.com/DattruongRyan1912/Dev-English',
        },
        {
          id: 'tien-dat-audio',
          index: '02',
          title: 'TienDatAudio',
          category: 'Commerce & content platform',
          year: '2025—26',
          summary:
            'A production website and content-management surface for an audio equipment business in Quang Ngai.',
          detail:
            'The Next.js and MongoDB system supports the public catalog, product content, lead capture, admin workflows, media delivery, and SEO. Its delivery path uses Cloudinary, Nginx, systemd, and GitHub Actions.',
          highlights: ['Public catalog + admin', 'MongoDB with local fallback', 'Guarded CI/CD workflow'],
          stack: ['Next.js', 'TypeScript', 'MongoDB', 'Cloudinary', 'Nginx', 'GitHub Actions'],
          repoUrl: 'https://github.com/DattruongRyan1912/TienDatAudio',
          liveUrl: 'https://tiendataudioquangngai.id.vn/',
        },
        {
          id: 'chat-realtime',
          index: '03',
          title: 'ChatRealtime',
          category: 'Real-time architecture',
          year: '2025',
          summary:
            'A full-stack chat architecture with authenticated sessions, presence, conversations, and real-time messaging.',
          detail:
            'The repository combines NestJS and Next.js with Socket.IO, MongoDB, Redis, and S3-compatible object storage. It documents direct and group messaging, read state, optimistic delivery, pagination, rate limits, and containerized operations.',
          highlights: ['Socket.IO event model', 'JWT + multi-device sessions', 'Redis-backed real-time features'],
          stack: ['NestJS', 'Next.js', 'Socket.IO', 'MongoDB', 'Redis', 'MinIO'],
          repoUrl: 'https://github.com/DattruongRyan1912/ChatRealtime',
        },
        {
          id: 'xtruyen',
          index: '04',
          title: 'XTruyen Research',
          category: 'Product research',
          year: '2026',
          summary:
            'An evidence-backed public product study translated into a build-ready implementation specification.',
          detail:
            'The research maps information architecture, routes, user flows, UI components, reader and audio behavior, data concepts, responsive gaps, SEO, and edge cases. Findings explicitly distinguish observed, inferred, unknown, and blocked evidence.',
          highlights: ['Evidence-indexed findings', '21-part implementation spec', 'Clear observed/inferred boundaries'],
          stack: ['Product analysis', 'System design', 'UX research', 'Technical writing'],
          repoUrl: 'https://github.com/DattruongRyan1912/xtruyen',
        },
        {
          id: 'mynotch',
          index: '05',
          title: 'MyNotch',
          category: 'macOS product',
          year: '2026',
          summary:
            'A modular macOS app that turns the MacBook notch into a workspace for music, clipboard, calendar, timers, battery, files, and AI agent status.',
          detail:
            'Built with Swift 6 and SwiftUI for macOS 26. Fourteen feature modules, from Clipboard and Media to Calendar, Screenshot, Translation, and AI agents, each live in their own Swift package behind one module contract, and no module imports another. A permission center asks only for what the enabled modules need, and no data leaves the device by default.',
          highlights: ['14 isolated feature modules', 'Permissions scoped per module', 'Local-first, no network by default'],
          stack: ['Swift 6', 'SwiftUI', 'AppKit', 'Swift Packages', 'Swift Testing', 'XcodeGen'],
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
      privateRepo: 'Repository riêng tư · Đang phát triển',
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
        'Bốn dự án công khai và một sản phẩm đang phát triển, thể hiện cách tôi tiếp cận kiến trúc backend, delivery, hệ thống realtime, phân tích sản phẩm dựa trên bằng chứng và ứng dụng native chia module.',
      hint: 'Cuộn, kéo hoặc dùng phím mũi tên',
      items: [
        {
          id: 'dev-english',
          index: '01',
          title: 'Dev-English',
          category: 'Hệ thống học tập AI',
          year: '2026',
          summary:
            'Hệ thống học tiếng Anh kỹ thuật ưu tiên tập trung, biến công việc thật của developer thành bài luyện thích ứng.',
          detail:
            'Sản phẩm được xây quanh Go modular monolith, Flutter, PostgreSQL/pgvector và ranh giới tích hợp AI có kiểm soát. Các luồng gồm nhiệm vụ thích ứng, lặp lại ngắt quãng, roleplay, bộ nhớ từ vựng, phiên đăng nhập và kiểm soát usage.',
          highlights: ['Vòng lặp học thích ứng', 'Ranh giới AI an toàn', 'PostgreSQL + pgvector'],
          stack: ['Go', 'Flutter', 'PostgreSQL', 'pgvector', 'Docker', 'Azure Speech'],
          repoUrl: 'https://github.com/DattruongRyan1912/Dev-English',
        },
        {
          id: 'tien-dat-audio',
          index: '02',
          title: 'TienDatAudio',
          category: 'Nền tảng thương mại & nội dung',
          year: '2025—26',
          summary:
            'Website production và bề mặt quản trị nội dung cho doanh nghiệp thiết bị âm thanh tại Quảng Ngãi.',
          detail:
            'Hệ thống Next.js và MongoDB hỗ trợ catalog công khai, nội dung sản phẩm, thu thập lead, workflow admin, media và SEO. Luồng delivery sử dụng Cloudinary, Nginx, systemd và GitHub Actions.',
          highlights: ['Catalog + quản trị', 'MongoDB với local fallback', 'Quy trình CI/CD có bảo vệ'],
          stack: ['Next.js', 'TypeScript', 'MongoDB', 'Cloudinary', 'Nginx', 'GitHub Actions'],
          repoUrl: 'https://github.com/DattruongRyan1912/TienDatAudio',
          liveUrl: 'https://tiendataudioquangngai.id.vn/',
        },
        {
          id: 'chat-realtime',
          index: '03',
          title: 'ChatRealtime',
          category: 'Kiến trúc realtime',
          year: '2025',
          summary:
            'Kiến trúc chat full-stack với phiên xác thực, presence, conversation và nhắn tin thời gian thực.',
          detail:
            'Repository kết hợp NestJS và Next.js với Socket.IO, MongoDB, Redis và object storage tương thích S3. Tài liệu bao phủ chat trực tiếp/nhóm, read state, optimistic delivery, pagination, rate limit và vận hành bằng container.',
          highlights: ['Mô hình sự kiện Socket.IO', 'JWT + phiên đa thiết bị', 'Tính năng realtime dùng Redis'],
          stack: ['NestJS', 'Next.js', 'Socket.IO', 'MongoDB', 'Redis', 'MinIO'],
          repoUrl: 'https://github.com/DattruongRyan1912/ChatRealtime',
        },
        {
          id: 'xtruyen',
          index: '04',
          title: 'XTruyen Research',
          category: 'Nghiên cứu sản phẩm',
          year: '2026',
          summary:
            'Nghiên cứu sản phẩm công khai dựa trên bằng chứng, được chuyển thành đặc tả triển khai có thể bắt tay xây dựng.',
          detail:
            'Nghiên cứu lập bản đồ kiến trúc thông tin, route, user flow, UI component, hành vi reader/audio, khái niệm dữ liệu, khoảng trống responsive, SEO và edge case. Mọi phát hiện phân biệt rõ observed, inferred, unknown và blocked.',
          highlights: ['Phát hiện gắn evidence', 'Đặc tả triển khai 21 phần', 'Ranh giới observed/inferred rõ ràng'],
          stack: ['Product analysis', 'System design', 'UX research', 'Technical writing'],
          repoUrl: 'https://github.com/DattruongRyan1912/xtruyen',
        },
        {
          id: 'mynotch',
          index: '05',
          title: 'MyNotch',
          category: 'Sản phẩm macOS',
          year: '2026',
          summary:
            'Ứng dụng macOS chia module, biến notch của MacBook thành chỗ làm việc cho nhạc, clipboard, lịch, hẹn giờ, pin, khay file và trạng thái AI agent.',
          detail:
            'Xây bằng Swift 6 và SwiftUI cho macOS 26. Mười bốn module tính năng, từ Clipboard, Media đến Lịch, Ảnh chụp, Dịch và AI agents, mỗi module là một Swift package riêng sau cùng một hợp đồng module, và không module nào import module khác. Trung tâm quyền chỉ xin những quyền mà module đang bật cần, và mặc định không có dữ liệu nào rời khỏi máy.',
          highlights: ['14 module tính năng độc lập', 'Quyền tách theo từng module', 'Ưu tiên local, mặc định không gửi dữ liệu'],
          stack: ['Swift 6', 'SwiftUI', 'AppKit', 'Swift Packages', 'Swift Testing', 'XcodeGen'],
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
