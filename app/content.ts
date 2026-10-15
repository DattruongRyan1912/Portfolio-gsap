export type Locale = 'en' | 'vi';

export const locales: readonly Locale[] = ['en', 'vi'];
export const LOCALE_COOKIE = 'portfolio-locale';

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'vi';
}

export type SiteCopy = {
  meta: { title: string; description: string };
  nav: { projects: string; stack: string; infra: string; contact: string; language: string };
  common: {
    skip: string;
    live: string;
    building: string;
    openSite: string;
    landingPage: string;
    source: string;
    privateRepo: string;
    allProjects: string;
    previous: string;
    next: string;
    role: string;
    timeline: string;
    stack: string;
    onThisPage: string;
    playVideo: string;
    sections: { problem: string; architecture: string; decisions: string; results: string; next: string };
    notFoundTitle: string;
    notFoundBody: string;
    backHome: string;
  };
  intro: {
    availability: string;
    timezone: string;
    name: string;
    headline: string;
    lead: string;
    primary: string;
    secondary: string;
  };
  stack: { title: string; groups: readonly { title: string; skills: readonly string[] }[] };
  infra: {
    title: string;
    lead: string;
    path: readonly { label: string; detail: string }[];
    hostsTitle: string;
    hosts: readonly { domain: string; runtime: string }[];
    facts: readonly string[];
  };
  about: {
    title: string;
    body: string;
    principles: readonly { index: string; title: string; description: string }[];
  };
  process: { title: string; steps: readonly { title: string; description: string }[] };
  contact: { title: string; body: string; cta: string; note: string };
  footer: string;
};

export const githubUrl = 'https://github.com/DattruongRyan1912';

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    meta: {
      title: 'Dat Truong (Ryan) — Backend Developer',
      description:
        'Backend developer with two years of experience. Four products I built, deployed, and run myself.',
    },
    nav: { projects: 'Projects', stack: 'Stack', infra: 'Infrastructure', contact: 'Contact', language: 'Language' },
    common: {
      skip: 'Skip to content',
      live: 'Live',
      building: 'In development',
      openSite: 'Open site',
      landingPage: 'Landing page',
      source: 'Source code',
      privateRepo: 'Private repository',
      allProjects: 'All projects',
      previous: 'Previous project',
      next: 'Next project',
      role: 'Role',
      timeline: 'Timeline',
      stack: 'Stack',
      onThisPage: 'On this page',
      playVideo: 'Play recording',
      sections: {
        problem: 'Problem',
        architecture: 'Architecture',
        decisions: 'Technical decisions',
        results: 'Results',
        next: 'Next up',
      },
      notFoundTitle: 'This page does not exist.',
      notFoundBody: 'The project may have moved. Everything I have built is on the home page.',
      backHome: 'Back to the home page',
    },
    intro: {
      availability: 'Open to backend roles',
      timezone: 'UTC+7 · Vietnam',
      name: 'Dat Truong',
      headline: 'Backend developer. Reliable APIs, systems that actually run.',
      lead: 'I build backend systems that stay clear under pressure, then deploy and operate them myself. Four of them are live below.',
      primary: 'See projects',
      secondary: 'GitHub',
    },
    stack: {
      title: 'Stack',
      groups: [
        { title: 'Backend', skills: ['Go', 'TypeScript', 'NestJS', 'Node.js', 'Laravel', 'Python', 'FastAPI'] },
        { title: 'API & security', skills: ['REST', 'GraphQL', 'JWT', 'RBAC', 'Rate limiting', 'CSRF', 'HMAC'] },
        { title: 'Data', skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite', 'pgvector'] },
        { title: 'DevOps', skills: ['Docker', 'GitHub Actions', 'Nginx', 'systemd', 'Cloudflare', 'Linux'] },
      ],
    },
    infra: {
      title: 'Self-run infrastructure',
      lead: 'Every live project here runs on one VPS that I set up and maintain.',
      path: [
        { label: 'Cloudflare', detail: 'DNS · proxy' },
        { label: 'Nginx edge', detail: 'TLS · routing' },
        { label: 'Services', detail: 'systemd · Docker' },
      ],
      hostsTitle: 'Running here now',
      hosts: [
        { domain: 'portfolio.truongquocdat.id.vn', runtime: 'Next.js · systemd' },
        { domain: 'tiendataudioquangngai.id.vn', runtime: 'Next.js · systemd' },
        { domain: 'toeic.truongquocdat.id.vn', runtime: 'FastAPI · Docker Compose' },
        { domain: 'xtruyen.truongquocdat.id.vn', runtime: 'Go · Docker Compose' },
        { domain: 'mynotch.truongquocdat.id.vn', runtime: 'static · nginx container' },
      ],
      facts: [
        'Ubuntu 24.04 VPS',
        'Let’s Encrypt, renewed every 12 hours',
        'Next.js under systemd, Go and FastAPI in Docker Compose',
        'PostgreSQL, MongoDB, Redis',
        'CI on GitHub Actions',
      ],
    },
    about: {
      title: 'About',
      body: 'I turn product requirements into systems that are easy to maintain, from API contracts and business logic to deployment and monitoring. I prefer small, deliberate solutions that stay secure and simple to operate.',
      principles: [
        { index: '01', title: 'Simple, not simplistic', description: 'Less accidental complexity, explicit boundaries.' },
        { index: '02', title: 'Reliability first', description: 'Visible behaviour, predictable failure, safe recovery.' },
        { index: '03', title: 'Automate the repeatable', description: 'CI and tooling make quality the default path.' },
        { index: '04', title: 'Learn in the open', description: 'Write decisions down, share context, take feedback.' },
      ],
    },
    process: {
      title: 'Process',
      steps: [
        { title: 'Understand', description: 'Users, constraints, a measurable outcome.' },
        { title: 'Design', description: 'Boundaries, contracts, data flow, failure modes.' },
        { title: 'Build', description: 'Focused logic with secure defaults.' },
        { title: 'Verify', description: 'Exercise the critical paths, keep the evidence.' },
        { title: 'Operate', description: 'Deploy safely, watch it, iterate.' },
      ],
    },
    contact: {
      title: 'Have a hard backend problem?',
      body: 'I am looking for backend roles and collaborations where clear architecture and reliable delivery matter.',
      cta: 'Talk to me on GitHub',
      note: 'Public channel, no tracking form.',
    },
    footer: 'Designed, built and hosted by Dat Truong (Ryan).',
  },
  vi: {
    meta: {
      title: 'Dat Truong (Ryan) — Backend Developer',
      description:
        'Backend developer với hai năm kinh nghiệm. Bốn sản phẩm tôi tự xây, tự deploy và tự vận hành.',
    },
    nav: { projects: 'Dự án', stack: 'Năng lực', infra: 'Hạ tầng', contact: 'Liên hệ', language: 'Ngôn ngữ' },
    common: {
      skip: 'Bỏ qua đến nội dung',
      live: 'Đang chạy',
      building: 'Đang phát triển',
      openSite: 'Mở site',
      landingPage: 'Trang giới thiệu',
      source: 'Mã nguồn',
      privateRepo: 'Repository riêng tư',
      allProjects: 'Tất cả dự án',
      previous: 'Dự án trước',
      next: 'Dự án tiếp',
      role: 'Vai trò',
      timeline: 'Thời gian',
      stack: 'Stack',
      onThisPage: 'Trên trang này',
      playVideo: 'Phát bản quay',
      sections: {
        problem: 'Bài toán',
        architecture: 'Kiến trúc',
        decisions: 'Quyết định kỹ thuật',
        results: 'Kết quả',
        next: 'Đang làm tiếp',
      },
      notFoundTitle: 'Trang này không tồn tại.',
      notFoundBody: 'Có thể dự án đã đổi địa chỉ. Mọi thứ tôi đã làm đều có ở trang chủ.',
      backHome: 'Về trang chủ',
    },
    intro: {
      availability: 'Sẵn sàng cho vị trí backend',
      timezone: 'UTC+7 · Việt Nam',
      name: 'Dat Truong',
      headline: 'Backend developer. API tin cậy, hệ thống chạy thật.',
      lead: 'Tôi xây hệ thống backend rõ ràng khi chịu tải, rồi tự deploy và vận hành chúng. Bốn sản phẩm đang chạy ngay bên dưới.',
      primary: 'Xem dự án',
      secondary: 'GitHub',
    },
    stack: {
      title: 'Năng lực',
      groups: [
        { title: 'Backend', skills: ['Go', 'TypeScript', 'NestJS', 'Node.js', 'Laravel', 'Python', 'FastAPI'] },
        { title: 'API & bảo mật', skills: ['REST', 'GraphQL', 'JWT', 'RBAC', 'Rate limiting', 'CSRF', 'HMAC'] },
        { title: 'Dữ liệu', skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite', 'pgvector'] },
        { title: 'DevOps', skills: ['Docker', 'GitHub Actions', 'Nginx', 'systemd', 'Cloudflare', 'Linux'] },
      ],
    },
    infra: {
      title: 'Hạ tầng tự vận hành',
      lead: 'Mọi dự án đang chạy ở đây đều nằm trên một VPS do tôi tự dựng và bảo trì.',
      path: [
        { label: 'Cloudflare', detail: 'DNS · proxy' },
        { label: 'Nginx edge', detail: 'TLS · định tuyến' },
        { label: 'Dịch vụ', detail: 'systemd · Docker' },
      ],
      hostsTitle: 'Đang chạy ở đây',
      hosts: [
        { domain: 'portfolio.truongquocdat.id.vn', runtime: 'Next.js · systemd' },
        { domain: 'tiendataudioquangngai.id.vn', runtime: 'Next.js · systemd' },
        { domain: 'toeic.truongquocdat.id.vn', runtime: 'FastAPI · Docker Compose' },
        { domain: 'xtruyen.truongquocdat.id.vn', runtime: 'Go · Docker Compose' },
        { domain: 'mynotch.truongquocdat.id.vn', runtime: 'tĩnh · container nginx' },
      ],
      facts: [
        'VPS Ubuntu 24.04',
        'Let’s Encrypt, gia hạn mỗi 12 giờ',
        'Next.js chạy bằng systemd, Go và FastAPI trong Docker Compose',
        'PostgreSQL, MongoDB, Redis',
        'CI trên GitHub Actions',
      ],
    },
    about: {
      title: 'Về tôi',
      body: 'Tôi biến yêu cầu sản phẩm thành hệ thống dễ bảo trì, từ hợp đồng API và business logic đến triển khai và giám sát. Tôi ưu tiên giải pháp nhỏ gọn, có chủ đích, an toàn và dễ vận hành.',
      principles: [
        { index: '01', title: 'Đơn giản, không đơn sơ', description: 'Bớt phức tạp thừa, giữ ranh giới rõ ràng.' },
        { index: '02', title: 'Tin cậy là ưu tiên', description: 'Quan sát được, lỗi có kiểm soát, phục hồi an toàn.' },
        { index: '03', title: 'Tự động hoá phần lặp lại', description: 'CI và tooling biến chất lượng thành mặc định.' },
        { index: '04', title: 'Học hỏi cởi mở', description: 'Ghi lại quyết định, chia sẻ ngữ cảnh, đón nhận góp ý.' },
      ],
    },
    process: {
      title: 'Quy trình',
      steps: [
        { title: 'Thấu hiểu', description: 'Người dùng, ràng buộc, kết quả đo được.' },
        { title: 'Thiết kế', description: 'Ranh giới, hợp đồng, luồng dữ liệu, tình huống lỗi.' },
        { title: 'Xây dựng', description: 'Logic tập trung, bảo mật mặc định.' },
        { title: 'Xác minh', description: 'Chạy thử luồng quan trọng, giữ lại bằng chứng.' },
        { title: 'Vận hành', description: 'Deploy an toàn, theo dõi, cải tiến.' },
      ],
    },
    contact: {
      title: 'Bạn có một bài toán backend khó?',
      body: 'Tôi đang tìm vị trí backend và cơ hội cộng tác đề cao kiến trúc rõ ràng và delivery tin cậy.',
      cta: 'Trao đổi với tôi trên GitHub',
      note: 'Kênh công khai, không dùng form theo dõi.',
    },
    footer: 'Thiết kế, xây dựng và tự host bởi Dat Truong (Ryan).',
  },
};
