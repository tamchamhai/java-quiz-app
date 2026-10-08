import type { Milestone } from '../types/quiz';

export const MILESTONES_DATA: Milestone[] = [
  {
    id: 'milestone-1',
    orderNumber: 1,
    title: 'Chặng 1: Khởi Tạo Dự Án, Cấu Trúc Chuẩn & Quản Lý Schema (Flyway)',
    shortTitle: 'Chặng 1: Khởi Tạo & Flyway',
    description: 'Dựng khung Spring Boot 3.4 + Java 21, kết nối PostgreSQL, quản lý schema hoàn toàn bằng Flyway Migration, thiết kế BaseEntity và Audit Trail.',
    iconName: 'Database',
    targetDurationMinutes: 15,
    learningRatio: 'Đọc 20% – Phá 30% – Xây 50%',
    referenceDoc: 'practical-syllabus-ticket-station.md#chặng-1',
    questions: [
      {
        id: 'm1-q1',
        milestoneId: 'milestone-1',
        title: 'Tại sao trong môi trường Production của các hệ thống doanh nghiệp lớn, việc cấu hình `spring.jpa.hibernate.ddl-auto=update` bị NGHIÊM CẤM tuyệt đối?',
        options: [
          { id: 'opt-a', text: 'Hibernate sẽ tự động xóa tất cả các bảng hiện có khi restart ứng dụng.', isCorrect: false },
          { id: 'opt-b', text: 'Hibernate chỉ có thể thêm cột mới chứ không bao giờ xóa hoặc đổi tên cột cũ, gây rác schema, không có lịch sử version và tiềm ẩn nguy cơ khóa bảng (lock table) gây sập hệ thống khi chạy tải cao.', isCorrect: true },
          { id: 'opt-c', text: 'Hibernate không hỗ trợ kết nối với PostgreSQL nếu không tắt ddl-auto.', isCorrect: false },
          { id: 'opt-d', text: 'Cấu hình này làm giảm tốc độ truy vấn SELECT của Spring Boot tới 50%.', isCorrect: false },
        ],
        explanation: 'Hibernate `ddl-auto=update` chỉ tự sinh DDL bổ sung mà không có cơ chế rollback, không kiểm soát được locking table, không thể đổi tên cột (nó sẽ tạo cột mới và bỏ quên cột cũ gây rác DB). Trên Production bắt buộc dùng công cụ Database Migration như Flyway hoặc Liquibase và đặt `ddl-auto=validate`.',
        referencePath: '04-database-jpa/07-flyway-migrations.md',
        tags: ['Flyway', 'Database', 'Production', 'Hibernate'],
        difficulty: 'medium',
      },
      {
        id: 'm1-q2',
        milestoneId: 'milestone-1',
        title: 'Khi một file migration của Flyway (ví dụ: `V1__init_brands_and_events.sql`) đã được apply lên database, nhưng developer sau đó vô tình vào sửa lại nội dung file SQL này, điều gì sẽ xảy ra khi khởi động lại Spring Boot?',
        codeSnippet: `org.flywaydb.core.api.exception.FlywayValidateException: 
Validate failed: Migrations have failed validation
Migration checksum mismatch for migration version 1
-> Applied to database : 184920491
-> Resolved locally    : -491029481`,
        options: [
          { id: 'opt-a', text: 'Flyway sẽ tự động xóa bảng cũ và tạo lại bảng mới theo nội dung sửa đổi.', isCorrect: false },
          { id: 'opt-b', text: 'Flyway bỏ qua file này vì đã thấy version 1 trong bảng `flyway_schema_history`.', isCorrect: false },
          { id: 'opt-c', text: 'Flyway ném ngoại lệ `Checksum mismatch` và dừng ngay quá trình khởi động ứng dụng để bảo vệ tính toàn vẹn dữ liệu.', isCorrect: true },
          { id: 'opt-d', text: 'Ứng dụng khởi động bình thường nhưng ghi log cảnh báo WARN.', isCorrect: false },
        ],
        explanation: 'Flyway tính mã băm CRC32 (checksum) của mỗi file migration khi áp dụng và lưu vào `flyway_schema_history`. Nếu phát hiện file đã áp dụng bị sửa đổi nội dung cục bộ, Flyway sẽ từ chối khởi động app để tránh sai lệch schema giữa các môi trường.',
        referencePath: '04-database-jpa/07-flyway-migrations.md',
        tags: ['Flyway', 'Checksum', 'Troubleshooting'],
        difficulty: 'medium',
      },
      {
        id: 'm1-q3',
        milestoneId: 'milestone-1',
        title: 'Cách xử lý CHUẨN NHẤT khi cần thêm một cột mới vào bảng `events` sau khi file migration `V1__init_brands_and_events.sql` đã chạy thành công trên các môi trường?',
        options: [
          { id: 'opt-a', text: 'Sửa trực tiếp file `V1__init_brands_and_events.sql` và chạy lệnh `flyway repair`.', isCorrect: false },
          { id: 'opt-b', text: 'Tạo một file migration mới mang version kế tiếp, ví dụ `V2__add_status_column_to_events.sql` với câu lệnh `ALTER TABLE`.', isCorrect: true },
          { id: 'opt-c', text: 'Vào pgAdmin gõ lệnh ALTER TABLE thủ công trên tất cả database các môi trường.', isCorrect: false },
          { id: 'opt-d', text: 'Xóa bảng `flyway_schema_history` rồi chạy lại từ đầu.', isCorrect: false },
        ],
        explanation: 'Quy tắc vàng của Database Migration là "Append-only": File migration đã apply KHÔNG ĐƯỢC PHÉP sửa đổi. Mọi thay đổi schema tiếp theo phải được ghi vào file migration mới có số version tuần tự (V2, V3,...).',
        referencePath: '04-database-jpa/07-flyway-migrations.md',
        tags: ['Flyway', 'Best Practices'],
        difficulty: 'easy',
      },
      {
        id: 'm1-q4',
        milestoneId: 'milestone-1',
        title: 'Trong lớp trừu tượng `BaseEntity`, annotation nào giúp Spring Data JPA tự động điền thời gian tạo (`createdAt`) và thời gian cập nhật gần nhất (`updatedAt`)?',
        codeSnippet: `@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;
}`,
        options: [
          { id: 'opt-a', text: 'Chỉ cần `@CreatedDate` và `@LastModifiedDate`, không cần thêm cấu hình gì khác.', isCorrect: false },
          { id: 'opt-b', text: 'Cần `@EntityListeners(AuditingEntityListener.class)` trên Entity và `@EnableJpaAuditing` trên class cấu hình Spring Boot.', isCorrect: true },
          { id: 'opt-c', text: 'Cần đặt annotation `@Transactional` trên BaseEntity.', isCorrect: false },
          { id: 'opt-d', text: 'Phải dùng Trigger của PostgreSQL chứ JPA không tự sinh được.', isCorrect: false },
        ],
        explanation: 'Để Spring Data JPA tự động cập nhật auditing metadata (`@CreatedDate`, `@LastModifiedDate`, `@CreatedBy`), bạn bắt buộc phải đăng ký `AuditingEntityListener` trên Entity (hoặc MappedSuperclass) và kích hoạt bằng `@EnableJpaAuditing` ở file cấu hình Spring Boot.',
        referencePath: '12-production-mindset/02-base-entity-audit-trail.md',
        tags: ['JPA', 'Auditing', 'BaseEntity'],
        difficulty: 'medium',
      },
      {
        id: 'm1-q5',
        milestoneId: 'milestone-1',
        title: 'Trong dự án Ticket Station, quy ước đặt tên file di trú Flyway theo chuẩn quy định của project là gì?',
        options: [
          { id: 'opt-a', text: 'V{version}_{description_tieng_viet}.sql (ví dụ: `V1_tao_bang_su_kien.sql`)', isCorrect: false },
          { id: 'opt-b', text: 'V{version}__{description_in_english}.sql (ví dụ: `V1__init_brands_and_events.sql`) với hai dấu gạch dưới `__`', isCorrect: true },
          { id: 'opt-c', text: 'Flyway_{version}_{name}.sql (ví dụ: `Flyway_1_Events.sql`)', isCorrect: false },
          { id: 'opt-d', text: 'migration-{version}.sql (ví dụ: `migration-01.sql`)', isCorrect: false },
        ],
        explanation: 'Chuẩn mặc định của Flyway là tiền tố `V`, theo sau là số version, tiếp theo là 2 dấu gạch dưới `__` làm dấu phân cách, và mô tả bằng tiếng Anh ở dạng snake_case. Đồng thời dự án tuân thủ nghiêm ngặt quy tắc 100% tiếng Anh trong tên file.',
        referencePath: '04-database-jpa/07-flyway-migrations.md',
        tags: ['Flyway', 'Conventions'],
        difficulty: 'easy',
      },
      {
        id: 'm1-q6',
        milestoneId: 'milestone-1',
        title: 'Trong file `docker-compose.yml` khởi tạo PostgreSQL của Ticket Station, cấu hình volume dưới đây có mục đích và ý nghĩa kỹ thuật gì?',
        codeSnippet: `services:
  postgres:
    image: postgres:16-alpine
    container_name: ticket_station_db_dev
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
    driver: local
    name: database_postgres_data`,
        language: 'yaml',
        options: [
          { id: 'opt-a', text: 'Chỉ định lưu tạm thời dữ liệu trong bộ nhớ RAM của Docker và dữ liệu sẽ tự động reset trắng mỗi khi tắt máy.', isCorrect: false },
          { id: 'opt-b', text: 'Gắn kết (mount) thư mục `/var/lib/postgresql/data` vào một Named Volume với tên tường minh `database_postgres_data` trên máy host; đảm bảo dữ liệu database được lưu bền vững (Persistent Data), không bị mất khi container dừng, xóa hoặc khởi tạo lại (`docker compose down && docker compose up -d`).', isCorrect: true },
          { id: 'opt-c', text: 'Bắt buộc ứng dụng Spring Boot chỉ được kết nối vào database nếu JDBC URL có tham số schema mang tên `database_postgres_data`.', isCorrect: false },
          { id: 'opt-d', text: 'Tự động sao lưu và đồng bộ toàn bộ file SQL migration lên cloud storage bên ngoài.', isCorrect: false },
        ],
        explanation: 'Container trong Docker theo bản chất là Ephemeral (dữ liệu bên trong container bị hủy khi container bị xóa hoặc recreate). Việc mount `- postgres_data:/var/lib/postgresql/data` chuyển toàn bộ dữ liệu database PostgreSQL ra ngoài một Docker Named Volume. Khai báo `name: database_postgres_data` giúp đặt tên volume cố định trên máy host (thay vì để Docker Compose tự sinh prefix theo tên folder), giúp dữ liệu luôn an toàn qua các chu kỳ tái khởi động và dễ dàng kiểm tra bằng `docker volume ls`.',
        referencePath: 'database/docker-compose.yml',
        tags: ['Docker', 'PostgreSQL', 'Docker Compose', 'Volume'],
        difficulty: 'medium',
      },
      {
        id: 'm1-q7',
        milestoneId: 'milestone-1',
        title: 'Khi volume `database_postgres_data` đã được tạo và chứa dữ liệu, nếu lập trình viên sửa `POSTGRES_PASSWORD` trong `docker-compose.yml` rồi chạy `docker compose down` và `docker compose up -d`, tại sao mật khẩu mới KHÔNG được cập nhật?',
        codeSnippet: `# Thay đổi mật khẩu mới trong docker-compose.yml:
environment:
  POSTGRES_DB: ticket_station_db_dev
  POSTGRES_USER: dev_write
  POSTGRES_PASSWORD: new_secret_pass_2026

# Chạy: docker compose down && docker compose up -d
# Kết quả kết nối vào DB: FATAL: password authentication failed for user "dev_write"`,
        language: 'yaml',
        options: [
          { id: 'opt-a', text: 'Do PostgreSQL Docker container chỉ chạy script khởi tạo ban đầu (`initdb`) đọc các biến môi trường `POSTGRES_*` DUY NHẤT một lần khi thư mục `/var/lib/postgresql/data` còn rỗng; khi volume `database_postgres_data` đã có dữ liệu, PostgreSQL bỏ qua các biến này và tiếp tục nạp dữ liệu cũ.', isCorrect: true },
          { id: 'opt-b', text: 'Do Docker Compose không hỗ trợ mật khẩu có độ dài quá 8 ký tự.', isCorrect: false },
          { id: 'opt-c', text: 'Do Spring Boot tự động cache mật khẩu trong file pom.xml và từ chối cập nhật.', isCorrect: false },
          { id: 'opt-d', text: 'Do driver JDBC của PostgreSQL không cho phép thay đổi mật khẩu sau khi ứng dụng đã biên dịch.', isCorrect: false },
        ],
        explanation: 'Theo tài liệu của PostgreSQL Docker Official Image (và mục Troubleshooting trong database/README.md), các biến môi trường `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` chỉ được đọc duy nhất 1 lần khi khởi tạo database cluster rỗng. Khi volume `database_postgres_data` đã lưu dữ liệu, PostgreSQL tiếp tục tái sử dụng cụm database cũ. Để áp dụng cấu hình mới từ compose file, bạn bắt buộc phải xóa volume cũ: `docker compose down -v` (hoặc `docker volume rm database_postgres_data`) rồi khởi chạy lại.',
        referencePath: 'database/README.md#5-lưu-ý-khi-thay-đổi-biến-môi-trường',
        tags: ['Docker', 'PostgreSQL', 'Troubleshooting', 'Volume', 'Environment'],
        difficulty: 'medium',
      },
      {
        id: 'm1-q8',
        milestoneId: 'milestone-1',
        title: 'Phân biệt hành vi của lệnh `docker compose down` và `docker compose down -v` đối với volume lưu trữ dữ liệu `database_postgres_data`:',
        options: [
          { id: 'opt-a', text: '`docker compose down` dừng và xóa container/network nhưng GIỮ NGUYÊN volume `database_postgres_data` (dữ liệu không mất); còn cờ `-v` (`--volumes`) sẽ XÓA SẠCH toàn bộ named volume được khai báo, làm mất sạch dữ liệu trong database.', isCorrect: true },
          { id: 'opt-b', text: '`docker compose down` sẽ xóa toàn bộ ổ cứng máy tính, còn cờ `-v` chỉ khởi động lại container.', isCorrect: false },
          { id: 'opt-c', text: 'Cả 2 lệnh đều xóa volume như nhau, không có bất kỳ sự khác biệt nào.', isCorrect: false },
          { id: 'opt-d', text: 'Cờ `-v` chỉ dùng để hiển thị chi tiết (verbose log) quá trình dừng container chứ không xóa volume.', isCorrect: false },
        ],
        explanation: 'Lệnh `docker compose down` an toàn cho dữ liệu cục bộ: nó chỉ dọn dẹp các container và network của project, dữ liệu trong named volume (`database_postgres_data`) vẫn được bảo toàn. Cờ `-v` (viết tắt của `--volumes`) yêu cầu Docker Compose xóa luôn các named volume khai báo trong phần volumes của file YAML. Vì vậy chỉ dùng cờ `-v` khi bạn chủ động muốn reset sạch môi trường cơ sở dữ liệu về ban đầu.',
        referencePath: 'database/README.md#2-khởi-chạy-database-container',
        tags: ['Docker', 'Docker Compose', 'CLI', 'Volume'],
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'milestone-2',
    orderNumber: 2,
    title: 'Chặng 2: Thiết Kế RESTful API, DTO Projections & Triệt Tiêu Lỗi N+1 Query',
    shortTitle: 'Chặng 2: REST API & Diệt N+1',
    description: 'Xây dựng API sự kiện và sơ đồ ghế ngồi chuẩn RFC 7807; bảo vệ Entity bằng DTO Record; hiểu bản chất và triệt tiêu hoàn toàn vấn đề N+1 query.',
    iconName: 'Layers',
    targetDurationMinutes: 20,
    learningRatio: 'Đọc 20% – Phá 30% – Xây 50%',
    referenceDoc: 'practical-syllabus-ticket-station.md#chặng-2',
    questions: [
      {
        id: 'm2-q1',
        milestoneId: 'milestone-2',
        title: 'Vấn đề N+1 Query trong Hibernate xảy ra trong tình huống nào sau đây?',
        codeSnippet: `// API lấy 20 sự kiện và hiển thị danh sách ghế của mỗi sự kiện:
List<Event> events = eventRepository.findAll(); // 1 query lấy 20 events
for (Event event : events) {
    // Duyệt qua từng event để lấy số lượng ghế (fetch = LAZY)
    System.out.println(event.getSeats().size()); // ???
}`,
        options: [
          { id: 'opt-a', text: 'Chỉ có 1 query duy nhất được gửi đến Database nhờ cơ chế Second-Level Cache.', isCorrect: false },
          { id: 'opt-b', text: 'Có tổng cộng 21 queries: 1 query ban đầu lấy 20 events, sau đó mỗi lần lặp qua 1 event, Hibernate lại gửi thêm 1 query SELECT để tải danh sách seats.', isCorrect: true },
          { id: 'opt-c', text: 'Hibernate sẽ tự gom tất cả lại thành 1 câu subquery ngầm mà lập trình viên không nhận biết được.', isCorrect: false },
          { id: 'opt-d', text: 'Hibernate ném ngoại lệ ConcurrentModificationException ngay lập tức.', isCorrect: false },
        ],
        explanation: 'Đây chính là bài toán N+1 kinh điển: 1 query ban đầu lấy N bản ghi cha (20 events). Khi truy cập vào thuộc tính lazy collection (`event.getSeats()`) trong vòng lặp, Hibernate phát sinh thêm N query con riêng biệt. Tổng cộng 1 + 20 = 21 queries, gây sụt giảm nghiêm trọng hiệu năng.',
        referencePath: '04-database-jpa/05-n-plus-1-problem.md',
        tags: ['JPA', 'Hibernate', 'N+1 Query', 'Performance'],
        difficulty: 'medium',
      },
      {
        id: 'm2-q2',
        milestoneId: 'milestone-2',
        title: 'Điểm khác biệt CỐT LÕI giữa `JOIN` thông thường và `JOIN FETCH` trong câu truy vấn JPQL là gì?',
        codeSnippet: `// Truy vấn 1:
@Query("SELECT e FROM Event e JOIN e.seats s WHERE e.id = :id")

// Truy vấn 2:
@Query("SELECT e FROM Event e JOIN FETCH e.seats s WHERE e.id = :id")`,
        options: [
          { id: 'opt-a', text: '`JOIN` thông thường lấy dữ liệu cả cha và con vào bộ nhớ, còn `JOIN FETCH` chỉ lọc dữ liệu.', isCorrect: false },
          { id: 'opt-b', text: '`JOIN` thông thường chỉ dùng cho mệnh đề WHERE hoặc tính toán chứ KHÔNG khởi tạo (initialize) dữ liệu của collection con vào Entity cha; trong khi `JOIN FETCH` yêu cầu Hibernate nạp toàn bộ thực thể con vào Persistence Context ngay trong 1 query.', isCorrect: true },
          { id: 'opt-c', text: '`JOIN FETCH` chỉ hoạt động với MySQL chứ không hỗ trợ PostgreSQL.', isCorrect: false },
          { id: 'opt-d', text: 'Hai truy vấn này có hành vi và kết quả trả về trong Java hoàn toàn giống nhau 100%.', isCorrect: false },
        ],
        explanation: 'Trong JPQL, `JOIN e.seats` chỉ nói với database thực hiện JOIN (thường dùng để lọc theo điều kiện của bảng con), nhưng Hibernate sẽ KHÔNG map các cột của bảng con vào danh sách `seats` của đối tượng `Event`. Khi bạn gọi `event.getSeats()`, nó vẫn bị Lazy load bắn thêm query! Chỉ khi dùng `JOIN FETCH`, Hibernate mới nạp sẵn cả thực thể con vào entity cha.',
        referencePath: '04-database-jpa/05-n-plus-1-problem.md',
        tags: ['JPQL', 'Hibernate', 'Join Fetch'],
        difficulty: 'hard',
      },
      {
        id: 'm2-q3',
        milestoneId: 'milestone-2',
        title: 'Ngoại lệ `LazyInitializationException: could not initialize proxy - no Session` xảy ra do nguyên nhân nào?',
        options: [
          { id: 'opt-a', text: 'Do database bị mất kết nối Internet trong lúc thực thi câu lệnh SQL.', isCorrect: false },
          { id: 'opt-b', text: 'Do ứng dụng cố gắng truy cập vào một quan hệ Lazy Loading sau khi Hibernate Session / Transaction quản lý entity đó đã bị đóng (ví dụ truy cập ngoài tầng Service hoặc sau khi kết thúc request).', isCorrect: true },
          { id: 'opt-c', text: 'Do thuộc tính đó bị đánh dấu là `@Transient` trong Entity.', isCorrect: false },
          { id: 'opt-d', text: 'Do chưa cấu hình username và password cho database.', isCorrect: false },
        ],
        explanation: 'Hibernate chỉ có thể truy vấn lazy khi Hibernate Session (Persistence Context) vẫn còn mở. Khi transaction ở Service đóng lại, Entity chuyển sang trạng thái Detached. Nếu ở Controller bạn gọi `event.getSeats().size()`, Hibernate không còn Session để bắn query nữa nên ném `LazyInitializationException`.',
        referencePath: '04-database-jpa/04-lazy-eager-loading.md',
        tags: ['Hibernate', 'Exception', 'Lazy Loading'],
        difficulty: 'medium',
      },
      {
        id: 'm2-q4',
        milestoneId: 'milestone-2',
        title: 'Tại sao từ Java 16+ và Spring Boot 3+, chúng ta nên ưu tiên dùng `record` để làm DTO Request / Response thay vì class thông thường có Lombok `@Data`?',
        codeSnippet: `public record EventResponseDto(
    Long id,
    String title,
    BigDecimal basePrice,
    Instant eventDate,
    String venue
) {}`,
        options: [
          { id: 'opt-a', text: 'Record giúp ứng dụng chạy nhanh hơn gấp 10 lần so với class thông thường.', isCorrect: false },
          { id: 'opt-b', text: 'Record vốn dĩ bất biến (immutable), tự động sinh constructor, getter, `equals()`, `hashCode()`, `toString()` ngắn gọn, an toàn trong môi trường đa luồng và không phụ thuộc annotation processing của bên thứ 3.', isCorrect: true },
          { id: 'opt-c', text: 'Record có thể kế thừa từ nhiều class khác nhau.', isCorrect: false },
          { id: 'opt-d', text: 'Hibernate bắt buộc Entity phải khai báo bằng record.', isCorrect: false },
        ],
        explanation: 'Java Record là cấu trúc dữ liệu bất biến (shallow immutable), sinh tự động các hàm chuẩn, rất lý tưởng để vận chuyển dữ liệu (DTO) giữa các tầng mà không sợ bị vô tình sửa đổi dữ liệu (side-effects). Đồng thời serialization sang JSON bằng Jackson rất mượt mà.',
        referencePath: '02-spring-boot-core/05-dto-request-response.md',
        tags: ['Java 21', 'DTO', 'Record', 'Clean Code'],
        difficulty: 'easy',
      },
      {
        id: 'm2-q5',
        milestoneId: 'milestone-2',
        title: 'Chuẩn RFC 7807 (`ProblemDetail`) được tích hợp sẵn từ Spring Boot 3 nhằm mục đích gì trong thiết kế RESTful API?',
        options: [
          { id: 'opt-a', text: 'Tự động mã hóa dữ liệu nhạy cảm bằng thuật toán AES-256.', isCorrect: false },
          { id: 'opt-b', text: 'Chuẩn hóa định dạng JSON phản hồi lỗi (Error Response) bao gồm các trường chuẩn như `type`, `title`, `status`, `detail`, `instance` giúp client dễ dàng bắt và xử lý lỗi đồng nhất.', isCorrect: true },
          { id: 'opt-c', text: 'Tự động tạo tài liệu Swagger UI.', isCorrect: false },
          { id: 'opt-d', text: 'Nén dung lượng payload HTTP Response để tiết kiệm băng thông.', isCorrect: false },
        ],
        explanation: 'RFC 7807 định nghĩa tiêu chuẩn công nghiệp cho format trả về của lỗi HTTP API (Problem Details for HTTP APIs). Spring Boot 3 cung cấp class `ProblemDetail` kết hợp với `@RestControllerAdvice` để trả về lỗi thống nhất.',
        referencePath: '02-spring-boot-core/07-exception-handling-global.md',
        tags: ['REST API', 'RFC 7807', 'Spring Boot 3'],
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'milestone-3',
    orderNumber: 3,
    title: 'Chặng 3: Kiểm Thử Tự Động Với Mockito & Bảo Mật Spring Security 6 JWT',
    shortTitle: 'Chặng 3: Mockito & Security JWT',
    description: 'Viết Unit Test cô lập với JUnit 5 & Mockito; triển khai cơ chế Stateless JWT Token (Access 15m / Refresh 7d) và kiểm soát phân quyền RBAC.',
    iconName: 'ShieldCheck',
    targetDurationMinutes: 20,
    learningRatio: 'Đọc 20% – Phá 30% – Xây 50%',
    referenceDoc: 'practical-syllabus-ticket-station.md#chặng-3',
    questions: [
      {
        id: 'm3-q1',
        milestoneId: 'milestone-3',
        title: 'Khi viết Unit Test cho tầng Service (ví dụ `EventServiceTest`), tại sao nên dùng `@ExtendWith(MockitoExtension.class)` thay vì dùng `@SpringBootTest`?',
        codeSnippet: `@ExtendWith(MockitoExtension.class)
class EventServiceTest {
    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventService eventService;
}`,
        options: [
          { id: 'opt-a', text: '`@SpringBootTest` không cho phép mock dữ liệu trong test.', isCorrect: false },
          { id: 'opt-b', text: '`@ExtendWith(MockitoExtension.class)` chạy độc lập hoàn toàn trên JVM trong vài mili-giây mà không cần khởi động toàn bộ Spring ApplicationContext, giúp test chạy cực nhanh và cô lập logic nghiệp vụ.', isCorrect: true },
          { id: 'opt-c', text: 'Mockito không tương thích với Spring Boot 3.', isCorrect: false },
          { id: 'opt-d', text: 'Dùng `@SpringBootTest` sẽ làm xóa sạch dữ liệu trong database thật.', isCorrect: false },
        ],
        explanation: 'Bản chất của Unit Test là kiểm tra đơn vị nhỏ nhất (1 class/method) trong sự cô lập hoàn toàn. Dùng `@SpringBootTest` sẽ khởi động toàn bộ container, nạp hàng trăm beans làm thời gian chạy test kéo dài hàng chục giây. Dùng Mockito thuần chỉ mất vài chục ms.',
        referencePath: '05-testing/03-unit-test-service-layer.md',
        tags: ['Testing', 'JUnit 5', 'Mockito', 'Performance'],
        difficulty: 'medium',
      },
      {
        id: 'm3-q2',
        milestoneId: 'milestone-3',
        title: 'Phân biệt giữa `@Mock` và `@Spy` trong Mockito:',
        options: [
          { id: 'opt-a', text: '`@Mock` tạo ra đối tượng giả hoàn toàn (dummy), các method không được stub sẽ trả về giá trị mặc định (null, 0, false); còn `@Spy` bọc một đối tượng thật (real object), chỉ mock những method được chỉ định còn lại sẽ gọi code thật.', isCorrect: true },
          { id: 'opt-b', text: '`@Mock` chỉ dùng cho interface, còn `@Spy` chỉ dùng cho abstract class.', isCorrect: false },
          { id: 'opt-c', text: '`@Spy` chạy nhanh hơn `@Mock` gấp 5 lần.', isCorrect: false },
          { id: 'opt-d', text: '`@Mock` lưu trữ dữ liệu vào database, còn `@Spy` lưu vào bộ nhớ RAM.', isCorrect: false },
        ],
        explanation: 'Mock là giả lập 100% mọi hành vi. Spy (Partial Mock) giữ nguyên thực thi của object thật trừ khi ta can thiệp vào hành vi bằng cú pháp `doReturn(...).when(spyObject).method()`.',
        referencePath: '05-testing/02-mockito.md',
        tags: ['Testing', 'Mockito', 'Mock vs Spy'],
        difficulty: 'medium',
      },
      {
        id: 'm3-q3',
        milestoneId: 'milestone-3',
        title: 'Tại sao trong kiến trúc bảo mật JWT, Access Token lại được thiết kế có thời gian sống ngắn (ví dụ 15 phút), trong khi Refresh Token có thời gian sống dài (ví dụ 7 ngày)?',
        options: [
          { id: 'opt-a', text: 'Vì nếu Access Token dài quá thì kích thước chuỗi base64 sẽ phình to gây nghẽn mạng.', isCorrect: false },
          { id: 'opt-b', text: 'Do JWT là Stateless (server không lưu session để thu hồi tức thì), việc đặt Access Token TTL ngắn giúp hạn chế tối đa rủi ro thiệt hại nếu token bị lộ; Refresh Token được lưu an toàn (hoặc có blacklist trong Redis) để cấp lại Access Token mới.', isCorrect: true },
          { id: 'opt-c', text: 'Do thuật toán HMAC-SHA256 chỉ có hiệu lực tối đa 15 phút theo chuẩn mã hóa quốc tế.', isCorrect: false },
          { id: 'opt-d', text: 'Vì trình duyệt web sẽ tự động xóa token sau mỗi 15 phút.', isCorrect: false },
        ],
        explanation: 'Stateless Token một khi đã ký và còn hạn thì ai cầm nó cũng truy cập được. Nếu hacker đánh cắp Access Token, họ chỉ lợi dụng được tối đa 15 phút. Khi cần cấp lại, client phải dùng Refresh Token (được bảo vệ cẩn thận hơn, hoặc có thể bị thu hồi/revoke từ phía server).',
        referencePath: '06-security/03-jwt-access-refresh-token.md',
        tags: ['Security', 'JWT', 'Architecture'],
        difficulty: 'medium',
      },
      {
        id: 'm3-q4',
        milestoneId: 'milestone-3',
        title: 'Lỗ hổng BOLA (Broken Object Level Authorization / IDOR) là gì và làm thế nào để phòng chống bằng Spring Security?',
        codeSnippet: `// API hủy vé:
@DeleteMapping("/api/v1/bookings/{bookingId}")
public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
    // Nếu chỉ kiểm tra người dùng đã đăng nhập (isAuthenticated) 
    // mà KHÔNG kiểm tra bookingId này có thực sự thuộc về user đang gọi hay không!
    bookingService.cancel(bookingId);
    return ResponseEntity.noContent().build();
}`,
        options: [
          { id: 'opt-a', text: 'Người dùng sửa `bookingId` trên URL để xem hoặc hủy vé của người khác; khắc phục bằng `@PreAuthorize("@bookingSecurity.isOwner(#bookingId, authentication.principal.id)")`.', isCorrect: true },
          { id: 'opt-b', text: 'Lỗ hổng hacker truyền mã SQL độc hại vào URL; khắc phục bằng cách bật CORS.', isCorrect: false },
          { id: 'opt-c', text: 'Lỗ hổng người dùng gửi request liên tục làm nghẽn server; khắc phục bằng Redis Cache.', isCorrect: false },
          { id: 'opt-d', text: 'Lỗ hổng mã hóa mật khẩu; khắc phục bằng thuật toán MD5.', isCorrect: false },
        ],
        explanation: 'BOLA/IDOR là lỗ hổng API phổ biến nhất trong OWASP Top 10 API Security. Xảy ra khi server tin tưởng ID từ client mà không xác minh quyền sở hữu tài nguyên. Trong Spring Security dùng SpEL với `@PreAuthorize` kết hợp custom security bean để kiểm tra quyền sở hữu.',
        referencePath: '06-security/05-role-permission.md',
        tags: ['Security', 'OWASP', 'BOLA', 'Authorization'],
        difficulty: 'hard',
      },
    ],
  },
  {
    id: 'milestone-4',
    orderNumber: 4,
    title: 'Chặng 4: Nghiệp Vụ Đặt Vé, Concurrency & Tranh Chấp Ghế (Locking & Redis)',
    shortTitle: 'Chặng 4: Khóa Ghế & Concurrency',
    description: 'Xử lý triệt để bài toán Race Condition khi mở bán vé; so sánh Optimistic vs Pessimistic vs Distributed Lock (Redisson); xây dựng cơ chế Temporary Seat Hold.',
    iconName: 'Lock',
    targetDurationMinutes: 20,
    learningRatio: 'Đọc 20% – Phá 30% – Xây 50%',
    referenceDoc: 'practical-syllabus-ticket-station.md#chặng-4',
    questions: [
      {
        id: 'm4-q1',
        milestoneId: 'milestone-4',
        title: 'Khi 10.000 người dùng đồng thời bấm nút "Giữ ghế" (Hold Seat) cho cùng 1 chiếc ghế VIP duy nhất, cơ chế nào sau đây đảm bảo TUYỆT ĐỐI không xảy ra tình trạng Double-Booking trên môi trường nhiều instance (Cluster/Distributed)?',
        options: [
          { id: 'opt-a', text: 'Sử dụng từ khóa Java `synchronized` trên method `holdSeat()` của Service.', isCorrect: false },
          { id: 'opt-b', text: 'Sử dụng Redis Distributed Lock (như Redisson `RLock`) hoặc Pessimistic Write Lock (`SELECT ... FOR UPDATE`) trên PostgreSQL.', isCorrect: true },
          { id: 'opt-c', text: 'Lưu trạng thái ghế vào biến static `HashMap` trong bộ nhớ RAM của ứng dụng.', isCorrect: false },
          { id: 'opt-d', text: 'Dùng `@Async` để xử lý đặt ghế dưới nền.', isCorrect: false },
        ],
        explanation: 'Từ khóa Java `synchronized` hay `ReentrantLock` chỉ có tác dụng trong phạm vi 1 JVM đơn lẻ! Khi ứng dụng chạy 3-5 instances phía sau Load Balancer, các luồng trên các instance khác nhau không thể đồng bộ qua JVM lock. Phải dùng Khóa Phân Tán (Redis Distributed Lock) hoặc Khóa Database (Pessimistic Write Lock).',
        referencePath: '07-caching-concurrency/03-distributed-locking.md',
        tags: ['Concurrency', 'Distributed Lock', 'Redis', 'Redisson'],
        difficulty: 'hard',
      },
      {
        id: 'm4-q2',
        milestoneId: 'milestone-4',
        title: 'Cơ chế Khóa Lạc Quan (Optimistic Locking) trong Spring Data JPA hoạt động theo nguyên lý nào?',
        codeSnippet: `@Entity
@Table(name = "seats")
public class Seat {
    @Id
    private Long id;

    private String seatNumber;

    @Enumerated(EnumType.STRING)
    private SeatStatus status;

    @Version
    private Long version;
}`,
        options: [
          { id: 'opt-a', text: 'Database khóa cứng hàng dữ liệu lại từ lúc đọc cho đến khi kết thúc transaction.', isCorrect: false },
          { id: 'opt-b', text: 'Không khóa dữ liệu ở tầng DB lúc đọc; khi cập nhật, Hibernate so sánh trường `@Version`: `UPDATE seats SET status=?, version=version+1 WHERE id=? AND version=?`. Nếu số version đã bị giao dịch khác tăng trước đó, Hibernate ném `OptimisticLockingFailureException`.', isCorrect: true },
          { id: 'opt-c', text: 'Tự động gửi thông báo qua WebSocket cho tất cả người dùng khác khi có ai chạm vào ghế.', isCorrect: false },
          { id: 'opt-d', text: 'Chỉ cho phép đọc dữ liệu nhưng cấm tất cả các lệnh ghi trong 10 phút.', isCorrect: false },
        ],
        explanation: 'Optimistic Locking không dùng khóa vật lý ở DB nên throughput rất cao khi ít xung đột. Nó dựa vào trường `@Version`. Khi commit, nếu version trong DB khác version lúc đọc (nghĩa là đã có người khác cập nhật trước), câu lệnh update trả về 0 row affected và Hibernate ném `OptimisticLockingFailureException`.',
        referencePath: '07-caching-concurrency/04-optimistic-pessimistic-locking.md',
        tags: ['JPA', 'Optimistic Lock', 'Concurrency'],
        difficulty: 'medium',
      },
      {
        id: 'm4-q3',
        milestoneId: 'milestone-4',
        title: 'Hiện tượng "Cache Stampede" (hay Dogpiling) là gì và làm thế nào để xử lý trong hệ thống Ticket Station?',
        options: [
          { id: 'opt-a', text: 'Bộ nhớ Redis bị đầy và hệ thống tự động xóa toàn bộ dữ liệu.', isCorrect: false },
          { id: 'opt-b', text: 'Hiện tượng khi một key cache cực "hot" (như danh sách sự kiện mở bán hôm nay) bị hết hạn (TTL expire), hàng triệu request đồng thời ùa vào Database để tính toán và ghi lại cache, làm sập Database.', isCorrect: true },
          { id: 'opt-c', text: 'Mạng giữa Spring Boot và Redis bị ngắt kết nối đột ngột.', isCorrect: false },
          { id: 'opt-d', text: 'Dữ liệu trong Cache không khớp với dữ liệu trong Database.', isCorrect: false },
        ],
        explanation: 'Cache Stampede xảy ra khi key hot hết hạn đúng lúc lưu lượng truy cập cao điểm. Giải pháp: Thêm jitter ngẫu nhiên vào TTL (tránh expire cùng lúc), sử dụng Mutex Distributed Lock khi load data vào cache, hoặc dùng cơ chế chủ động Re-warm cache nền trước khi key hết hạn.',
        referencePath: '07-caching-concurrency/02-cache-strategies.md',
        tags: ['Redis', 'Caching', 'Cache Stampede', 'System Design'],
        difficulty: 'hard',
      },
      {
        id: 'm4-q4',
        milestoneId: 'milestone-4',
        title: 'Luồng nghiệp vụ "Giữ chỗ tạm thời" (Temporary Hold) cho vé xem ca nhạc hoạt động như thế nào?',
        options: [
          { id: 'opt-a', text: 'Trừ tiền tài khoản ngay lập tức, nếu người dùng đổi ý thì hoàn tiền lại sau 24h.', isCorrect: false },
          { id: 'opt-b', text: 'Chuyển trạng thái ghế sang `HELD`, gán `heldUntil = Instant.now().plus(Duration.ofMinutes(10))`; nếu sau 10 phút đơn hàng chưa thanh toán thành công, background worker hoặc TTL key Redis sẽ tự động giải phóng ghế về trạng thái `AVAILABLE`.', isCorrect: true },
          { id: 'opt-c', text: 'Xóa hoàn toàn ghế đó khỏi database để người khác không tìm thấy.', isCorrect: false },
          { id: 'opt-d', text: 'Chặn địa chỉ IP của người dùng khác không cho truy cập vào trang web.', isCorrect: false },
        ],
        explanation: 'Đây là domain logic kinh điển của rạp phim và bán vé hòa nhạc. Trạng thái `HELD` đi kèm deadline `heldUntil`. Trong thời gian này người khác không thể đặt, nhưng nếu quá hạn (TTL) mà không thanh toán, ghế phải được tự động nhả ra.',
        referencePath: 'practical-syllabus-ticket-station.md#chặng-4',
        tags: ['Business Logic', 'Ticket Hold', 'TTL'],
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'milestone-5',
    orderNumber: 5,
    title: 'Chặng 5: Kiến Trúc Hướng Sự Kiện Với Kafka & Transactional Outbox',
    shortTitle: 'Chặng 5: Kafka & Transactional Outbox',
    description: 'Giải quyết triệt để thảm họa Dual-Write; áp dụng Transactional Outbox Pattern; cấu hình Kafka Consumer với Dead Letter Queue và Exponential Retry.',
    iconName: 'Send',
    targetDurationMinutes: 20,
    learningRatio: 'Đọc 20% – Phá 30% – Xây 50%',
    referenceDoc: 'practical-syllabus-ticket-station.md#chặng-5',
    questions: [
      {
        id: 'm5-q1',
        milestoneId: 'milestone-5',
        title: 'Đoạn mã sau đây mắc phải lỗi kiến trúc nguy hiểm nào trong hệ thống phân tán?',
        codeSnippet: `@Transactional
public void processPaymentSuccess(Order order) {
    order.setStatus(OrderStatus.PAID);
    orderRepository.save(order); // 1. Ghi vào PostgreSQL

    // 2. Bắn event sang Kafka để gửi vé PDF và email
    kafkaTemplate.send("ticket-booked-topic", new OrderPaidEvent(order.getId()));
}`,
        options: [
          { id: 'opt-a', text: 'Không có lỗi gì, đoạn mã này hoàn toàn chuẩn theo khuyến nghị của Spring.', isCorrect: false },
          { id: 'opt-b', text: 'Lỗi "Dual-Write": Database transaction và Kafka message không nằm trong cùng một cơ chế phân tán 2PC. Nếu database commit thành công nhưng server Kafka sập ngay lúc đó, vé không bao giờ được xuất. Ngược lại nếu Kafka gửi xong nhưng DB rollback, khách không trả tiền vẫn nhận được vé!', isCorrect: true },
          { id: 'opt-c', text: 'Spring không cho phép tiêm `KafkaTemplate` vào class có `@Transactional`.', isCorrect: false },
          { id: 'opt-d', text: 'Kafka không thể gửi đối tượng Java nếu không dùng XML format.', isCorrect: false },
        ],
        explanation: 'Vấn đề Dual-Write xảy ra khi bạn ghi vào 2 hệ thống lưu trữ khác nhau trong 1 method logic mà không có giao thức đồng thuận 2PC. Đây là lý do kiến trúc sư phần mềm bắt buộc phải áp dụng Transactional Outbox Pattern.',
        referencePath: '08-async-messaging/04-transactional-outbox.md',
        tags: ['Kafka', 'Dual-Write', 'Distributed Systems', 'Architecture'],
        difficulty: 'hard',
      },
      {
        id: 'm5-q2',
        milestoneId: 'milestone-5',
        title: 'Mô hình Transactional Outbox Pattern giải quyết vấn đề Dual-Write bằng cách nào?',
        options: [
          { id: 'opt-a', text: 'Dùng một bảng trung gian `outbox_events` trong Database; bản ghi đơn hàng và bản ghi event được lưu trong CÙNG 1 Database Transaction duy nhất (cam kết ACID). Sau đó một Background Relay hoặc Debezium CDC sẽ đọc bảng outbox và publish lên Kafka.', isCorrect: true },
          { id: 'opt-b', text: 'Tắt transaction của Database và chỉ dựa hoàn toàn vào message queue.', isCorrect: false },
          { id: 'opt-c', text: 'Bắt buộc client frontend phải gửi 2 request riêng biệt: 1 request cho DB và 1 request cho Kafka.', isCorrect: false },
          { id: 'opt-d', text: 'Cấu hình Kafka ghi trực tiếp dữ liệu vào bảng của PostgreSQL.', isCorrect: false },
        ],
        explanation: 'Vì cả dữ liệu nghiệp vụ (`orders`) và sự kiện (`outbox_events`) cùng nằm trong 1 Database RDBMS, ta tận dụng giao dịch ACID cục bộ để đảm bảo: hoặc cả hai cùng được lưu, hoặc không có gì được lưu. Tiến trình nền (Relay Worker hoặc Debezium CDC) chịu trách nhiệm đọc và gửi lên Kafka an toàn.',
        referencePath: '08-async-messaging/04-transactional-outbox.md',
        tags: ['Outbox Pattern', 'Kafka', 'Architecture'],
        difficulty: 'medium',
      },
      {
        id: 'm5-q3',
        milestoneId: 'milestone-5',
        title: 'Khi một Kafka Consumer xử lý message bị lỗi liên tục (ví dụ hệ thống bên thứ ba bị sập), chiến lược xử lý chuẩn trong môi trường Production là gì?',
        options: [
          { id: 'opt-a', text: 'Bỏ qua (ignore) message lỗi ngay lập tức để tiếp tục xử lý các message khác.', isCorrect: false },
          { id: 'opt-b', text: 'Treo consumer lại vĩnh viễn và không commit offset.', isCorrect: false },
          { id: 'opt-c', text: 'Áp dụng Retry có Exponential Backoff (thử lại sau 1s, 2s, 4s,...); nếu sau N lần vẫn thất bại thì đẩy message sang Dead Letter Queue (DLQ / DLT) để cảnh báo và xử lý sau, tránh làm nghẽn toàn bộ partition.', isCorrect: true },
          { id: 'opt-d', text: 'Xóa topic Kafka và tạo lại topic mới.', isCorrect: false },
        ],
        explanation: 'Dead Letter Topic (DLT) kết hợp với Retry Backoff giúp hệ thống có khả năng tự phục hồi với các lỗi tạm thời (transient errors), đồng thời cách ly các message độc hại (poison pill) sang hàng đợi riêng để đội ngũ vận hành kiểm tra, không làm tắc nghẽn luồng xử lý chính.',
        referencePath: '08-async-messaging/05-retry-dlq.md',
        tags: ['Kafka', 'DLQ', 'Resilience'],
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'milestone-6',
    orderNumber: 6,
    title: 'Chặng 6: Tính Bất Biến (Idempotency), Chịu Lỗi & Đóng Gói Docker',
    shortTitle: 'Chặng 6: Idempotency & Docker',
    description: 'Đảm bảo API thanh toán không bao giờ bị trừ tiền 2 lần; bảo vệ hệ thống bằng Circuit Breaker (Resilience4j); đóng gói container multi-stage tối ưu.',
    iconName: 'Server',
    targetDurationMinutes: 20,
    learningRatio: 'Đọc 20% – Phá 30% – Xây 50%',
    referenceDoc: 'practical-syllabus-ticket-station.md#chặng-6',
    questions: [
      {
        id: 'm6-q1',
        milestoneId: 'milestone-6',
        title: 'Tính chất Bất Biến (Idempotency) của API thanh toán trong Ticket Station có ý nghĩa gì?',
        options: [
          { id: 'opt-a', text: 'API có tốc độ phản hồi cực nhanh dưới 10ms.', isCorrect: false },
          { id: 'opt-b', text: 'Dù client gửi cùng một request thanh toán nhiều lần (do mạng chập chờn, người dùng bấm nút nhiều lần), hệ thống chỉ thực hiện trừ tiền và xử lý đơn hàng đúng DUY NHẤT 1 lần, các lần gọi sau trả về kết quả tương tự mà không gây side-effect phụ.', isCorrect: true },
          { id: 'opt-c', text: 'API chỉ chấp nhận request từ địa chỉ IP cố định.', isCorrect: false },
          { id: 'opt-d', text: 'Dữ liệu gửi lên không bao giờ được phép chỉnh sửa trong tương lai.', isCorrect: false },
        ],
        explanation: 'Idempotency trong thanh toán là yêu cầu sống còn. Khi mạng lag, mobile app hoặc browser có thể tự động retry request `POST /payments`. Nhờ có header `Idempotency-Key`, server nhận diện đây là cùng một giao dịch và không bao giờ trừ tiền khách hàng lần thứ hai.',
        referencePath: '12-production-mindset/05-idempotency-critical-apis.md',
        tags: ['Idempotency', 'API Design', 'Payment'],
        difficulty: 'medium',
      },
      {
        id: 'm6-q2',
        milestoneId: 'milestone-6',
        title: 'Làm thế nào để hiện thực hóa cơ chế `@Idempotent` hiệu quả cao bằng Redis trong Spring Boot?',
        codeSnippet: `@PostMapping("/charge")
@Idempotent(key = "#request.idempotencyKey", expireSeconds = 120)
public PaymentResponse chargeMoney(@RequestBody PaymentRequest request) { ... }`,
        options: [
          { id: 'opt-a', text: 'Dùng lệnh Redis `SET key value NX EX seconds` (chỉ đặt nếu chưa tồn tại). Nếu lệnh trả về true nghĩa là request đầu tiên; nếu trả về false nghĩa là request trùng lặp và từ chối xử lý hoặc trả về kết quả đang xử lý.', isCorrect: true },
          { id: 'opt-b', text: 'Mỗi lần có request thì tăng biến đếm bằng `INCR` và cho phép chạy nếu số đếm là số lẻ.', isCorrect: false },
          { id: 'opt-c', text: 'Lưu toàn bộ payload request vào bảng tạm trong PostgreSQL và xóa sau 5 phút.', isCorrect: false },
          { id: 'opt-d', text: 'Chỉ dựa vào cookie của trình duyệt để nhận diện người dùng.', isCorrect: false },
        ],
        explanation: 'Lệnh `SETNX` (SET if Not eXists) kèm TTL trong Redis là nguyên tử (atomic). Khi request đầu tiên đến, `SETNX` thành công, tiến trình tiếp tục xử lý. Các request trùng lặp đến cùng thời điểm sẽ nhận `SETNX = false` và bị chặn lại ngay lập tức.',
        referencePath: '12-production-mindset/05-idempotency-critical-apis.md',
        tags: ['Redis', 'Idempotency', 'Spring AOP'],
        difficulty: 'hard',
      },
      {
        id: 'm6-q3',
        milestoneId: 'milestone-6',
        title: '3 trạng thái của Circuit Breaker trong Resilience4j là gì và cơ chế chuyển đổi giữa chúng diễn ra như thế nào?',
        options: [
          { id: 'opt-a', text: 'START, RUNNING, STOPPED', isCorrect: false },
          { id: 'opt-b', text: 'CLOSED (bình thường, cho request đi qua), OPEN (lỗi vượt ngưỡng, ngắt mạch ngay lập tức và gọi fallback), HALF_OPEN (cho một số lượng request thăm dò thử nghiệm để xem đối tác đã phục hồi chưa).', isCorrect: true },
          { id: 'opt-c', text: 'GREEN, YELLOW, RED', isCorrect: false },
          { id: 'opt-d', text: 'ACTIVE, PASSIVE, STANDBY', isCorrect: false },
        ],
        explanation: 'Circuit Breaker bảo vệ thread pool của hệ thống: Khi dịch vụ bên ngoài (cổng thanh toán, SMS) bị lỗi hoặc phản hồi chậm quá tỷ lệ cho phép, nó chuyển sang `OPEN` để ngắt mạch lập tức không chờ timeout. Sau thời gian chờ, nó chuyển sang `HALF_OPEN` để test tải trước khi đóng mạch lại (`CLOSED`).',
        referencePath: '09-resilience-integration/03-circuit-breaker.md',
        tags: ['Resilience4j', 'Circuit Breaker', 'Fault Tolerance'],
        difficulty: 'medium',
      },
      {
        id: 'm6-q4',
        milestoneId: 'milestone-6',
        title: 'Tại sao trong môi trường Production chúng ta nên sử dụng Multi-Stage Dockerfile và chạy container bằng non-root user?',
        codeSnippet: `# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
...
# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]`,
        options: [
          { id: 'opt-a', text: 'Multi-stage build tách biệt môi trường build (Maven, mã nguồn, dependencies) khỏi runtime, giảm kích thước image từ hàng GB xuống chỉ còn ~150MB; non-root user giúp giảm thiểu nguy cơ bị chiếm quyền root của máy host nếu container bị tấn công.', isCorrect: true },
          { id: 'opt-b', text: 'Non-root user giúp Java 21 kích hoạt tính năng Virtual Threads.', isCorrect: false },
          { id: 'opt-c', text: 'Docker bắt buộc tất cả file JAR phải chạy bằng tài khoản `appuser`.', isCorrect: false },
          { id: 'opt-d', text: 'Làm như vậy để giảm dung lượng file `pom.xml`.', isCorrect: false },
        ],
        explanation: 'Multi-stage Dockerfile giúp image nhỏ gọn, nhẹ, deploy cực nhanh. Chạy với non-root user là tiêu chuẩn an toàn bảo mật cấp cao (Container Security / CIS Benchmark) để chống privilege escalation.',
        referencePath: '12-production-mindset/04-docker-basics.md',
        tags: ['Docker', 'Security', 'Production', 'DevOps'],
        difficulty: 'easy',
      },
    ],
  },
];

