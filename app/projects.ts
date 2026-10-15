import type { Locale } from './content';

export type ProjectSlug = 'tien-dat-audio' | 'toeic-master' | 'xtruyen' | 'mynotch';

export type DiagramNode = {
  id: string;
  label: string;
  detail?: string;
  /** Column in the left-to-right flow, starting at 0. */
  col: number;
  /** Row inside the column, starting at 0. */
  row: number;
  accent?: boolean;
};

export type Diagram = {
  nodes: readonly DiagramNode[];
  edges: readonly (readonly [from: string, to: string])[];
};

export type Decision = { title: string; body: string };

export type ProjectCopy = {
  category: string;
  summary: string;
  role: string;
  timeline: string;
  problem: string;
  architectureNote: string;
  diagram: Diagram;
  decisions: readonly Decision[];
  results: readonly string[];
  next: readonly string[];
};

export type Project = {
  slug: ProjectSlug;
  title: string;
  year: string;
  color: string;
  status: 'live' | 'building';
  stack: readonly string[];
  repoUrl?: string;
  liveUrl?: string;
  /** A separate marketing page, for projects that have one besides the app itself. */
  landingUrl?: string;
  media: { video: string; poster: string };
  copy: Record<Locale, ProjectCopy>;
};

export const projects: readonly Project[] = [
  {
    slug: 'tien-dat-audio',
    title: 'TienDatAudio',
    year: '2025—26',
    color: '#ff7a45',
    status: 'live',
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Cloudinary', 'DeepSeek', 'Nginx', 'GitHub Actions'],
    repoUrl: 'https://github.com/DattruongRyan1912/tien-dat-audio',
    liveUrl: 'https://tiendataudioquangngai.id.vn/',
    media: { video: '/media/projects/tien-dat-audio.mp4', poster: '/media/projects/tien-dat-audio.jpg' },
    copy: {
      en: {
        category: 'Commerce & content platform',
        summary:
          'The production website and CMS for an audio equipment business in Quang Ngai: catalog, combos, technical articles, lead capture, and an AI consultation assistant.',
        role: 'Solo: design, build, deploy, operate',
        timeline: '2025 — today',
        problem:
          'A local audio business needed one place to show its catalog and equipment combos, publish technical articles that rank for local searches, collect leads, and let staff update all of it without a developer.',
        architectureNote:
          'A Next.js App Router application with server components and route handlers, MongoDB through the native driver, media on Cloudinary, and a DeepSeek-backed assistant. It runs as a systemd service behind Nginx and Cloudflare.',
        diagram: {
          nodes: [
            { id: 'browser', label: 'Browser', col: 0, row: 0 },
            { id: 'edge', label: 'Cloudflare', detail: 'Nginx · TLS', col: 1, row: 0 },
            { id: 'app', label: 'Next.js', detail: 'systemd service', col: 2, row: 0, accent: true },
            { id: 'db', label: 'MongoDB', detail: 'JSON fallback', col: 3, row: 0 },
            { id: 'media', label: 'Cloudinary', detail: 'media CDN', col: 3, row: 1 },
            { id: 'ai', label: 'DeepSeek', detail: 'assistant', col: 3, row: 2 },
            { id: 'ci', label: 'GitHub Actions', detail: 'atomic release', col: 2, row: 2 },
          ],
          edges: [
            ['browser', 'edge'],
            ['edge', 'app'],
            ['app', 'db'],
            ['app', 'media'],
            ['app', 'ai'],
            ['ci', 'app'],
          ],
        },
        decisions: [
          {
            title: 'MongoDB with a JSON fallback',
            body: 'The catalog can still render from seed JSON when the database is unreachable, so a database incident does not take the storefront down.',
          },
          {
            title: 'Signed sessions, not a third-party auth service',
            body: 'Admins sign in with an HMAC-signed, HTTP-only session cookie and scrypt-hashed passwords; middleware and server guards both protect /admin and /api/admin.',
          },
          {
            title: 'Atomic releases',
            body: 'Each deploy builds into a new release directory and switches the current link only after it succeeds, so a failed build never replaces the running site.',
          },
          {
            title: 'An assistant grounded in the catalog',
            body: 'The consultation assistant answers from catalog and business data through DeepSeek, keeps sessions, collects feedback, and has an evaluation page in the admin.',
          },
        ],
        results: [
          'Live at tiendataudioquangngai.id.vn behind Cloudflare and HTTPS.',
          'Ranks well in search for competitive local keywords such as “loa Quảng Ngãi” and “audio Quảng Ngãi”.',
          'AI search engines recommend the site for those same keywords, so the work pays off in generative engine optimization (GEO) as well as classic SEO.',
          '24 public page routes: products, combos, knowledge articles, brands, and local-area pages.',
          'An admin CMS for products, combos, posts, taxonomy, orders, SEO, and social posts.',
          'Automated tests for SEO strategy, content, local SEO, and the assistant’s retrieval and tools.',
        ],
        next: [
          'Keep growing the knowledge base; editorial batches ship through GitHub Actions workflows.',
          'Use the assistant evaluations to tune answers before promoting it more widely.',
        ],
      },
      vi: {
        category: 'Nền tảng thương mại & nội dung',
        summary:
          'Website production và CMS cho doanh nghiệp thiết bị âm thanh tại Quảng Ngãi: catalog, combo, bài viết kỹ thuật, thu thập lead và trợ lý tư vấn AI.',
        role: 'Một mình: thiết kế, code, deploy, vận hành',
        timeline: '2025 — nay',
        problem:
          'Một cửa hàng âm thanh địa phương cần một nơi để giới thiệu catalog và các combo thiết bị, đăng bài viết kỹ thuật lên top tìm kiếm khu vực, thu thập khách hàng tiềm năng, và để nhân viên tự cập nhật mọi thứ mà không cần lập trình viên.',
        architectureNote:
          'Ứng dụng Next.js App Router với server component và route handler, MongoDB qua native driver, media trên Cloudinary và trợ lý dùng DeepSeek. Chạy như một systemd service sau Nginx và Cloudflare.',
        diagram: {
          nodes: [
            { id: 'browser', label: 'Trình duyệt', col: 0, row: 0 },
            { id: 'edge', label: 'Cloudflare', detail: 'Nginx · TLS', col: 1, row: 0 },
            { id: 'app', label: 'Next.js', detail: 'systemd service', col: 2, row: 0, accent: true },
            { id: 'db', label: 'MongoDB', detail: 'fallback JSON', col: 3, row: 0 },
            { id: 'media', label: 'Cloudinary', detail: 'CDN media', col: 3, row: 1 },
            { id: 'ai', label: 'DeepSeek', detail: 'trợ lý', col: 3, row: 2 },
            { id: 'ci', label: 'GitHub Actions', detail: 'release nguyên tử', col: 2, row: 2 },
          ],
          edges: [
            ['browser', 'edge'],
            ['edge', 'app'],
            ['app', 'db'],
            ['app', 'media'],
            ['app', 'ai'],
            ['ci', 'app'],
          ],
        },
        decisions: [
          {
            title: 'MongoDB kèm fallback JSON',
            body: 'Catalog vẫn hiển thị từ dữ liệu JSON khi không kết nối được cơ sở dữ liệu, nên sự cố database không làm sập cửa hàng.',
          },
          {
            title: 'Session tự ký thay vì dịch vụ đăng nhập bên ngoài',
            body: 'Quản trị viên đăng nhập bằng cookie HTTP-only ký HMAC và mật khẩu băm scrypt; cả middleware lẫn guard phía server cùng bảo vệ /admin và /api/admin.',
          },
          {
            title: 'Release nguyên tử',
            body: 'Mỗi lần deploy build vào một thư mục release mới và chỉ chuyển liên kết current khi build thành công, nên build lỗi không bao giờ thay thế site đang chạy.',
          },
          {
            title: 'Trợ lý bám theo catalog',
            body: 'Trợ lý tư vấn trả lời dựa trên catalog và thông tin cửa hàng qua DeepSeek, lưu phiên trò chuyện, thu phản hồi và có trang đánh giá trong admin.',
          },
        ],
        results: [
          'Đang chạy tại tiendataudioquangngai.id.vn sau Cloudflare và HTTPS.',
          'Có thứ hạng tốt trên công cụ tìm kiếm ở các từ khoá cạnh tranh tại địa phương như “loa Quảng Ngãi” và “audio Quảng Ngãi”.',
          'Các công cụ tìm kiếm bằng AI cũng đề xuất website cho chính những từ khoá này, nghĩa là hiệu quả tốt ở cả SEO truyền thống lẫn GEO (tối ưu cho công cụ tìm kiếm AI).',
          '24 route trang công khai: sản phẩm, combo, bài kiến thức, thương hiệu và trang theo khu vực.',
          'CMS quản trị sản phẩm, combo, bài viết, taxonomy, đơn hàng, SEO và bài mạng xã hội.',
          'Test tự động cho chiến lược SEO, nội dung, SEO địa phương và phần truy xuất, tool của trợ lý.',
        ],
        next: [
          'Tiếp tục mở rộng kho bài kiến thức; các đợt bài viết được xuất bản qua workflow GitHub Actions.',
          'Dùng phần đánh giá trợ lý để tinh chỉnh câu trả lời trước khi đưa trợ lý ra rộng hơn.',
        ],
      },
    },
  },
  {
    slug: 'toeic-master',
    title: 'TOEIC Master',
    year: '2026',
    color: '#3fb950',
    status: 'live',
    stack: ['Next.js', 'FastAPI', 'Python', 'SQLAlchemy', 'SQLite', 'Gemini API', 'Docker'],
    repoUrl: 'https://github.com/DattruongRyan1912/toeic-lab',
    liveUrl: 'https://toeic.truongquocdat.id.vn/',
    landingUrl: 'https://toeicmaster.truongquocdat.id.vn/',
    media: { video: '/media/projects/toeic-master.mp4', poster: '/media/projects/toeic-master.jpg' },
    copy: {
      en: {
        category: 'AI learning platform',
        summary:
          'A Vietnamese TOEIC Listening & Reading study platform for software engineers aiming at 800–900+, with mock tests, a mistake log, spaced-repetition vocabulary, and an AI mentor.',
        role: 'Solo: design, build, deploy',
        timeline: 'Sep — Oct 2026',
        problem:
          'Engineers preparing for TOEIC tend to work through practice tests and forget why they got questions wrong. I wanted a study tool that records the cause of every mistake and brings it back at the right time.',
        architectureNote:
          'A Next.js 16 front end forwards every /api call to a FastAPI and SQLAlchemy back end on SQLite. AI calls go over plain REST to Gemini, falling back to DeepSeek. Both parts ship as Docker containers.',
        diagram: {
          nodes: [
            { id: 'browser', label: 'Browser', col: 0, row: 0 },
            { id: 'edge', label: 'Nginx', detail: 'TLS', col: 1, row: 0 },
            { id: 'web', label: 'Next.js 16', detail: '/api proxy', col: 2, row: 0, accent: true },
            { id: 'api', label: 'FastAPI', detail: 'SQLAlchemy 2', col: 3, row: 0, accent: true },
            { id: 'db', label: 'SQLite', col: 4, row: 0 },
            { id: 'ai', label: 'Gemini → DeepSeek', detail: 'REST, no SDK', col: 4, row: 1 },
            { id: 'tts', label: 'Edge TTS', detail: 'audio', col: 4, row: 2 },
          ],
          edges: [
            ['browser', 'edge'],
            ['edge', 'web'],
            ['web', 'api'],
            ['api', 'db'],
            ['api', 'ai'],
            ['api', 'tts'],
          ],
        },
        decisions: [
          {
            title: 'A mistake log with timed review',
            body: 'Every wrong answer is tagged with one of five root causes and comes back for review after 1, 3, and 7 days.',
          },
          {
            title: 'AI over plain REST',
            body: 'No vendor SDK: requests rotate across several Gemini keys with model fallback, then DeepSeek, with daily per-user quotas.',
          },
          {
            title: 'An AI mentor whose actions can be undone',
            body: 'The mentor has 27 function-calling tools; every write it makes is logged and can be undone, and it degrades to an offline mode.',
          },
          {
            title: 'Small, explicit security',
            body: 'HS256 tokens, PBKDF2-SHA256 password hashing with 100,000 iterations, and rate limits on sign-in, sign-up, and AI endpoints.',
          },
        ],
        results: [
          'Live at toeic.truongquocdat.id.vn as an installable web app.',
          '241 practice questions: one timed mock test plus twelve Part 5 drills of fifteen questions.',
          '698 SM-2 flashcards with text-to-speech, twelve grammar lessons, and seventy listening items.',
          '131 test functions; CI runs pytest, type checks, lint, and the web build.',
        ],
        next: [
          'Parts 3, 4, 6, and 7 of the mock test are not in the bank yet.',
          'Telegram reminders and weekly reports exist in code but are not switched on.',
          'A pronunciation trainer is in progress.',
        ],
      },
      vi: {
        category: 'Nền tảng học tập AI',
        summary:
          'Nền tảng tự học TOEIC Listening & Reading bằng tiếng Việt cho kỹ sư phần mềm nhắm 800–900+, gồm đề thi thử, sổ lỗi sai, từ vựng lặp lại ngắt quãng và AI mentor.',
        role: 'Một mình: thiết kế, code, deploy',
        timeline: '09 — 10/2026',
        problem:
          'Kỹ sư ôn TOEIC thường làm hết đề này đến đề khác rồi quên mất vì sao mình sai. Tôi muốn một công cụ ghi lại nguyên nhân của từng lỗi sai và đưa nó quay lại đúng lúc cần ôn.',
        architectureNote:
          'Frontend Next.js 16 chuyển mọi lời gọi /api tới backend FastAPI và SQLAlchemy trên SQLite. Lời gọi AI đi qua REST thuần tới Gemini, lỗi thì chuyển sang DeepSeek. Cả hai phần chạy bằng container Docker.',
        diagram: {
          nodes: [
            { id: 'browser', label: 'Trình duyệt', col: 0, row: 0 },
            { id: 'edge', label: 'Nginx', detail: 'TLS', col: 1, row: 0 },
            { id: 'web', label: 'Next.js 16', detail: 'proxy /api', col: 2, row: 0, accent: true },
            { id: 'api', label: 'FastAPI', detail: 'SQLAlchemy 2', col: 3, row: 0, accent: true },
            { id: 'db', label: 'SQLite', col: 4, row: 0 },
            { id: 'ai', label: 'Gemini → DeepSeek', detail: 'REST, không SDK', col: 4, row: 1 },
            { id: 'tts', label: 'Edge TTS', detail: 'âm thanh', col: 4, row: 2 },
          ],
          edges: [
            ['browser', 'edge'],
            ['edge', 'web'],
            ['web', 'api'],
            ['api', 'db'],
            ['api', 'ai'],
            ['api', 'tts'],
          ],
        },
        decisions: [
          {
            title: 'Sổ lỗi sai có lịch ôn',
            body: 'Mỗi câu sai được gắn một trong năm nguyên nhân gốc và quay lại để ôn sau 1, 3 và 7 ngày.',
          },
          {
            title: 'Gọi AI bằng REST thuần',
            body: 'Không dùng SDK của nhà cung cấp: xoay vòng nhiều key Gemini và model dự phòng, rồi tới DeepSeek, kèm hạn mức mỗi ngày cho từng người.',
          },
          {
            title: 'AI mentor hoàn tác được',
            body: 'Mentor có 27 tool function-calling; mọi thao tác ghi của nó đều được lưu vết và hoàn tác được, và có chế độ offline khi AI không phản hồi.',
          },
          {
            title: 'Bảo mật nhỏ gọn, rõ ràng',
            body: 'Token HS256, mật khẩu băm PBKDF2-SHA256 với 100.000 vòng lặp, và rate limit cho đăng nhập, đăng ký và các endpoint AI.',
          },
        ],
        results: [
          'Đang chạy tại toeic.truongquocdat.id.vn, cài được như ứng dụng web.',
          '241 câu luyện tập: một đề thi thử có tính giờ và mười hai bộ Part 5, mỗi bộ mười lăm câu.',
          '698 flashcard SM-2 có đọc mẫu, mười hai bài ngữ pháp và bảy mươi bài nghe.',
          '131 hàm test; CI chạy pytest, kiểm tra type, lint và build web.',
        ],
        next: [
          'Ngân hàng đề chưa có Part 3, 4, 6 và 7.',
          'Nhắc học qua Telegram và báo cáo tuần đã có code nhưng chưa bật.',
          'Đang làm bộ luyện phát âm.',
        ],
      },
    },
  },
  {
    slug: 'xtruyen',
    title: 'XTruyen',
    year: '2026',
    color: '#e3b341',
    status: 'live',
    stack: ['Go', 'Next.js', 'PostgreSQL', 'Redis', 'Docker Compose', 'GitHub Actions'],
    repoUrl: 'https://github.com/DattruongRyan1912/xtruyen',
    liveUrl: 'https://xtruyen.truongquocdat.id.vn/',
    media: { video: '/media/projects/xtruyen.mp4', poster: '/media/projects/xtruyen.jpg' },
    copy: {
      en: {
        category: 'Reading platform',
        summary:
          'A Vietnamese web-novel reading platform with a server-rendered catalog, search, a chapter reader, reader accounts, and an editor CMS.',
        role: 'Solo: research, build, deploy',
        timeline: 'Aug — Sep 2026',
        problem:
          'It began as an evidence-based study of a public reading site: routes, user flows, data, and edge cases, each marked as observed or inferred. The second half was turning that study into a fast, server-rendered reader with a clean API and a CMS for editors.',
        architectureNote:
          'A Next.js 15 front end over a Go API built on the standard library, with PostgreSQL 16 for data and Redis 7 for caching. Caddy routes /v1 to the API and everything else to the web app, all on Docker Compose.',
        diagram: {
          nodes: [
            { id: 'browser', label: 'Browser', col: 0, row: 0 },
            { id: 'edge', label: 'Nginx · Caddy', detail: 'TLS, routing', col: 1, row: 0 },
            { id: 'web', label: 'Next.js 15', detail: 'SSR', col: 2, row: 0, accent: true },
            { id: 'api', label: 'Go API', detail: 'net/http · pgx', col: 2, row: 1, accent: true },
            { id: 'pg', label: 'PostgreSQL 16', col: 3, row: 1 },
            { id: 'redis', label: 'Redis 7', detail: 'cache, limits', col: 3, row: 2 },
          ],
          edges: [
            ['browser', 'edge'],
            ['edge', 'web'],
            ['edge', 'api'],
            ['web', 'api'],
            ['api', 'pg'],
            ['api', 'redis'],
          ],
        },
        decisions: [
          {
            title: 'Go on the standard library',
            body: 'The API uses net/http with pgx v5 and go-redis v9 and no web framework, which keeps the dependency surface small and the handlers easy to read.',
          },
          {
            title: 'Caches that fail open',
            body: 'The catalog cache and rate limiter live in Redis, and fall back to PostgreSQL and an in-process limiter when Redis is unavailable.',
          },
          {
            title: 'Defensive accounts',
            body: 'bcrypt passwords, opaque sessions stored in PostgreSQL, CSRF tokens, Secure HTTP-only cookies, per-route rate limits, and reader, editor, moderator, and admin roles.',
          },
          {
            title: 'A contract checked in CI',
            body: 'CI runs gofmt, vet, unit tests, an integration job against real Postgres and Redis, the web lint, type check and build, and an OpenAPI check.',
          },
        ],
        results: [
          'Live at xtruyen.truongquocdat.id.vn: home, catalog, search, story pages, and the chapter reader.',
          'Accounts, bookmarks, and an editor CMS for stories, chapters, comments, and cache purges, behind roles.',
          'Four database migrations covering the catalog, users and sessions, comments, audit logs, and media.',
        ],
        next: [
          'The background worker is a stub; scheduled jobs and sitemap refresh are next.',
          'Genres are not populated yet, so the genre menu is empty.',
          'Generated text-to-speech audio exists but is not served yet.',
        ],
      },
      vi: {
        category: 'Nền tảng đọc truyện',
        summary:
          'Nền tảng đọc truyện chữ tiếng Việt với catalog render phía server, tìm kiếm, trình đọc theo chương, tài khoản độc giả và CMS cho biên tập viên.',
        role: 'Một mình: nghiên cứu, code, deploy',
        timeline: '08 — 09/2026',
        problem:
          'Dự án bắt đầu từ một nghiên cứu dựa trên bằng chứng về một site đọc truyện công khai: route, luồng người dùng, dữ liệu và trường hợp biên, mỗi điểm đều ghi rõ là quan sát được hay suy luận. Nửa sau là biến nghiên cứu đó thành một trình đọc nhanh, render phía server, có API rõ ràng và CMS cho biên tập viên.',
        architectureNote:
          'Frontend Next.js 15 trên Go API viết bằng thư viện chuẩn, PostgreSQL 16 cho dữ liệu và Redis 7 để cache. Caddy chuyển /v1 tới API và phần còn lại tới web, tất cả chạy trên Docker Compose.',
        diagram: {
          nodes: [
            { id: 'browser', label: 'Trình duyệt', col: 0, row: 0 },
            { id: 'edge', label: 'Nginx · Caddy', detail: 'TLS, định tuyến', col: 1, row: 0 },
            { id: 'web', label: 'Next.js 15', detail: 'SSR', col: 2, row: 0, accent: true },
            { id: 'api', label: 'Go API', detail: 'net/http · pgx', col: 2, row: 1, accent: true },
            { id: 'pg', label: 'PostgreSQL 16', col: 3, row: 1 },
            { id: 'redis', label: 'Redis 7', detail: 'cache, giới hạn', col: 3, row: 2 },
          ],
          edges: [
            ['browser', 'edge'],
            ['edge', 'web'],
            ['edge', 'api'],
            ['web', 'api'],
            ['api', 'pg'],
            ['api', 'redis'],
          ],
        },
        decisions: [
          {
            title: 'Go với thư viện chuẩn',
            body: 'API dùng net/http cùng pgx v5 và go-redis v9, không dùng web framework, nên ít phụ thuộc và handler dễ đọc.',
          },
          {
            title: 'Cache không làm sập hệ thống',
            body: 'Cache catalog và rate limiter nằm trên Redis, và tự chuyển về PostgreSQL cùng bộ giới hạn trong tiến trình khi Redis không sẵn sàng.',
          },
          {
            title: 'Tài khoản phòng thủ nhiều lớp',
            body: 'Mật khẩu bcrypt, session lưu trong PostgreSQL, CSRF token, cookie Secure và HTTP-only, rate limit theo route, cùng các vai trò độc giả, biên tập, kiểm duyệt và quản trị.',
          },
          {
            title: 'Hợp đồng API được kiểm tra trong CI',
            body: 'CI chạy gofmt, vet, unit test, integration test với Postgres và Redis thật, lint, kiểm tra type và build web, cùng một bước kiểm tra OpenAPI.',
          },
        ],
        results: [
          'Đang chạy tại xtruyen.truongquocdat.id.vn: trang chủ, catalog, tìm kiếm, trang truyện và trình đọc chương.',
          'Tài khoản, đánh dấu truyện và CMS biên tập cho truyện, chương, bình luận và xoá cache, có phân quyền.',
          'Bốn migration cơ sở dữ liệu cho catalog, người dùng và session, bình luận, nhật ký kiểm toán và media.',
        ],
        next: [
          'Worker nền mới là bản khung; tiếp theo là job định kỳ và làm mới sitemap.',
          'Chưa có dữ liệu thể loại, nên menu thể loại còn trống.',
          'Đã tạo audio đọc truyện nhưng chưa phát trên site.',
        ],
      },
    },
  },
  {
    slug: 'mynotch',
    title: 'MyNotch',
    year: '2026',
    color: '#8b6cff',
    status: 'building',
    stack: ['Swift 6', 'SwiftUI', 'AppKit', 'Swift Packages', 'Swift Testing', 'XcodeGen'],
    liveUrl: 'https://mynotch.truongquocdat.id.vn/',
    media: { video: '/media/projects/mynotch.mp4', poster: '/media/projects/mynotch.jpg' },
    copy: {
      en: {
        category: 'macOS product',
        summary:
          'A modular macOS app that turns the MacBook notch into a workspace for music, clipboard, calendar, to-dos, timers, battery, files, and AI agent status.',
        role: 'Solo: product, design, build',
        timeline: '2026 — today',
        problem:
          'The notch is dead space at the top of a MacBook screen. I wanted the small things I check all day (music, the clipboard, the next meeting, a timer, AI agents running in a terminal) to live there, without one feature depending on another.',
        architectureNote:
          'A SwiftUI and AppKit shell owns the notch window and its states. Fourteen feature modules plug in through one contract registered in a single file, and a permission center asks only for what the enabled modules declare.',
        diagram: {
          nodes: [
            { id: 'shell', label: 'Notch shell', detail: 'SwiftUI · AppKit', col: 0, row: 0, accent: true },
            { id: 'registry', label: 'Module registry', detail: 'one contract', col: 1, row: 0, accent: true },
            { id: 'modules', label: '14 modules', detail: 'Swift packages', col: 2, row: 0 },
            { id: 'perms', label: 'Permission center', detail: 'per module', col: 1, row: 1 },
            { id: 'store', label: 'Local storage', detail: 'on device', col: 2, row: 1 },
          ],
          edges: [
            ['shell', 'registry'],
            ['registry', 'modules'],
            ['registry', 'perms'],
            ['modules', 'store'],
          ],
        },
        decisions: [
          {
            title: 'One contract, no cross-imports',
            body: 'Each feature is its own Swift package that depends only on the core and the notch UI; no module imports another, and the app wires them in one file.',
          },
          {
            title: 'Permissions follow the modules',
            body: 'Modules declare required and optional permissions with a reason; a module that is switched off is never asked for anything.',
          },
          {
            title: 'Local first',
            body: 'By default nothing leaves the Mac. Optional features that reach the network, such as song lyrics, are off until the user turns them on.',
          },
        ],
        results: [
          'Fourteen modules, including Clipboard, Media, Calendar, To-dos, Screenshot, Translation, Timer, Shelf, and AI agents.',
          'Every package ships with its own Swift Testing suite.',
          'A landing page with real screen recordings at mynotch.truongquocdat.id.vn.',
        ],
        next: ['A signed release build.', 'The lock-screen module is experimental and off by default.'],
      },
      vi: {
        category: 'Sản phẩm macOS',
        summary:
          'Ứng dụng macOS chia module, biến notch của MacBook thành chỗ làm việc cho nhạc, clipboard, lịch, việc cần làm, hẹn giờ, pin, khay file và trạng thái AI agent.',
        role: 'Một mình: sản phẩm, thiết kế, code',
        timeline: '2026 — nay',
        problem:
          'Notch là khoảng trống vô dụng ở mép trên màn hình MacBook. Tôi muốn những thứ nhỏ mình xem suốt ngày (nhạc, clipboard, cuộc họp kế tiếp, hẹn giờ, AI agent đang chạy trong terminal) nằm ở đó, mà không tính năng nào phụ thuộc tính năng nào.',
        architectureNote:
          'Lớp vỏ SwiftUI và AppKit quản lý cửa sổ notch và các trạng thái của nó. Mười bốn module tính năng gắn vào qua một hợp đồng duy nhất, đăng ký trong một file, và trung tâm quyền chỉ xin những quyền mà module đang bật khai báo.',
        diagram: {
          nodes: [
            { id: 'shell', label: 'Vỏ notch', detail: 'SwiftUI · AppKit', col: 0, row: 0, accent: true },
            { id: 'registry', label: 'Registry module', detail: 'một hợp đồng', col: 1, row: 0, accent: true },
            { id: 'modules', label: '14 module', detail: 'Swift package', col: 2, row: 0 },
            { id: 'perms', label: 'Trung tâm quyền', detail: 'theo module', col: 1, row: 1 },
            { id: 'store', label: 'Lưu trữ local', detail: 'trên máy', col: 2, row: 1 },
          ],
          edges: [
            ['shell', 'registry'],
            ['registry', 'modules'],
            ['registry', 'perms'],
            ['modules', 'store'],
          ],
        },
        decisions: [
          {
            title: 'Một hợp đồng, không import chéo',
            body: 'Mỗi tính năng là một Swift package riêng, chỉ phụ thuộc phần lõi và giao diện notch; không module nào import module khác, và app ghép chúng trong một file.',
          },
          {
            title: 'Quyền đi theo module',
            body: 'Module khai báo quyền bắt buộc và tuỳ chọn kèm lý do; module đang tắt thì không bao giờ bị hỏi quyền.',
          },
          {
            title: 'Ưu tiên local',
            body: 'Mặc định không có gì rời khỏi máy Mac. Các tính năng tuỳ chọn có dùng mạng, như lời bài hát, đều tắt cho tới khi người dùng bật.',
          },
        ],
        results: [
          'Mười bốn module, gồm Clipboard, Media, Lịch, Việc cần làm, Ảnh chụp, Dịch, Hẹn giờ, Khay và AI agents.',
          'Mỗi package có bộ test Swift Testing riêng.',
          'Trang giới thiệu có bản quay màn hình thật tại mynotch.truongquocdat.id.vn.',
        ],
        next: ['Bản phát hành có ký số.', 'Module màn hình khoá còn thử nghiệm và tắt mặc định.'],
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNeighbours(slug: ProjectSlug): { previous: Project; next: Project } {
  const index = projects.findIndex((project) => project.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}
