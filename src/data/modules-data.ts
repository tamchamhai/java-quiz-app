import type { ModuleCategory } from '../types/quiz';

export const MODULE_CATEGORIES: ModuleCategory[] = [
  {
    id: 'module-01',
    code: '01',
    name: 'Tổng quan Java & Môi trường',
    title: '01. Tổng quan Java & Môi trường',
    iconName: 'Coffee',
    description: 'JDK, JRE, JVM, Bytecode, Quá trình biên dịch và thực thi, Write Once Run Anywhere.',
    folderPath: '01-java-core',
    questions: [
      {
        id: 'mod1-q1',
        milestoneId: 'module-01',
        moduleId: 'module-01',
        title: 'Mối quan hệ giữa JDK, JRE và JVM trong hệ sinh thái Java được hiểu chính xác nhất như thế nào?',
        options: [
          { id: 'opt-a', text: 'JVM chứa JRE, và JRE chứa JDK.', isCorrect: false },
          { id: 'opt-b', text: 'JDK (bộ công cụ phát triển) bao gồm JRE (môi trường thực thi) và các công cụ như javac; JRE bao gồm JVM (máy ảo thực thi bytecode) cùng các thư viện chuẩn Core API.', isCorrect: true },
          { id: 'opt-c', text: 'Cả 3 là một phần mềm duy nhất chỉ khác tên gọi.', isCorrect: false },
          { id: 'opt-d', text: 'JDK chỉ dành cho hệ điều hành Windows, còn JVM chạy trên Linux.', isCorrect: false },
        ],
        explanation: 'Công thức kinh điển: JDK = JRE + Development Tools (javac, jar, jdb); JRE = JVM + Core Libraries. Lập trình viên cần cài JDK để code và biên dịch, máy chủ production chỉ cần JRE (hoặc bản build jlink rút gọn) để chạy.',
        referencePath: '01-java-core/00-java-project-config.md',
        tags: ['Java Basics', 'JVM', 'JDK', 'Architecture'],
        difficulty: 'easy',
      },
      {
        id: 'mod1-q2',
        milestoneId: 'module-01',
        moduleId: 'module-01',
        title: 'Tại sao mã nguồn Java lại đạt được tính chất "Write Once, Run Anywhere" (Viết một lần, chạy mọi nơi)?',
        options: [
          { id: 'opt-a', text: 'Vì trình biên dịch `javac` biên dịch thẳng file `.java` thành mã máy (Machine Code) chung cho mọi CPU.', isCorrect: false },
          { id: 'opt-b', text: 'Vì `javac` biên dịch code thành Bytecode trung gian (file `.class`), sau đó JVM của từng hệ điều hành cụ thể (Windows, Linux, macOS) sẽ thông dịch và biên dịch JIT bytecode đó thành mã máy tương ứng.', isCorrect: true },
          { id: 'opt-c', text: 'Vì mọi máy tính đều sử dụng chung một loại vi xử lý Intel.', isCorrect: false },
          { id: 'opt-d', text: 'Vì Java chạy hoàn toàn bên trong trình duyệt web giống như JavaScript.', isCorrect: false },
        ],
        explanation: 'Bytecode là mã máy ảo chuẩn hóa độc lập với phần cứng. Mỗi hệ điều hành có một bản cài đặt JVM riêng biệt để chuyển đổi Bytecode thành Machine Code thực tế, giúp file .class chạy được ở mọi nơi có JVM.',
        referencePath: '01-java-core/11-jvm-basics.md',
        tags: ['Bytecode', 'JVM', 'JIT Compiler'],
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'module-02',
    code: '02',
    name: 'Cú pháp Java & Kiểu dữ liệu',
    title: '02. Cú pháp Java & Kiểu dữ liệu',
    iconName: 'Code',
    description: 'Biến & khai báo, Kiểu nguyên thủy vs tham chiếu, Toán tử, Ép kiểu, String & Text Block, Hằng số & final, Enum, Thực hành BMI.',
    folderPath: '01-java-core',
    subTopics: [
      {
        id: 'mod2-sub1',
        moduleId: 'module-02',
        orderNumber: 1,
        title: 'Biến và khai báo – cái tên gắn với một giá trị',
        readDuration: 'Đọc 13p',
        description: 'Quy tắc đặt tên biến, phạm vi (scope) biến cục bộ vs biến thực thể, từ khóa var (Local Variable Type Inference - Java 10+), cơ chế khởi tạo giá trị mặc định.',
        questions: [
          {
            id: 'mod2-s1-q1',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Bản chất kỹ thuật của từ khóa `var` (được giới thiệu từ Java 10) là gì và nó khác gì so với `var` trong JavaScript?',
            codeSnippet: `var ticketPrice = 150_000;
// ticketPrice = "FREE"; // Dòng này có hợp lệ không?`,
            options: [
              { id: 'opt-a', text: '`var` trong Java biến Java thành ngôn ngữ Dynamic Typing (kiểu động), cho phép gán lại biến `ticketPrice` bằng chuỗi "FREE" bất kỳ lúc nào giống như trong JavaScript.', isCorrect: false },
              { id: 'opt-b', text: '`var` trong Java chỉ là cú pháp viết tắt (Syntactic Sugar) cho Local Variable Type Inference: Kiểu dữ liệu tĩnh (`int`) được xác định chính xác ngay tại thời điểm biên dịch (Compile-time); dòng gán `ticketPrice = "FREE"` sẽ bị lỗi biên dịch Compile-time Error.', isCorrect: true },
              { id: 'opt-c', text: '`var` là một kiểu dữ liệu mới trong JVM tương đương với `Object` và tự động unbox lúc chạy.', isCorrect: false },
              { id: 'opt-d', text: '`var` làm giảm hiệu năng thực thi của ứng dụng vì JVM phải đoán kiểu dữ liệu tại thời điểm chạy (Runtime).', isCorrect: false },
            ],
            explanation: 'Trong Java, `var` KHÔNG phải là kiểu dữ liệu mà là cơ chế suy luận kiểu biến cục bộ (Local Variable Type Inference - JEP 286). Java vẫn là ngôn ngữ định kiểu tĩnh (Statically Typed) 100%. Trình biên dịch javac tự động suy luận kiểu là `int` và ghi thẳng kiểu `int` vào file bytecode .class. Do đó không gây tổn thất hiệu năng lúc chạy và không thể gán lại giá trị khác kiểu.',
            referencePath: '01-java-core/00-java-project-config.md',
            tags: ['Java 10', 'var keyword', 'Type Inference', 'Static Typing'],
            difficulty: 'easy',
          },
          {
            id: 'mod2-s1-q6',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Tác dụng và lợi ích chính của việc sử dụng từ khóa `var` (Local Variable Type Inference) trong Java là gì?',
            codeSnippet: `// Cách truyền thống (trước Java 10):
Map<String, List<TicketOrder>> orderMap = new HashMap<String, List<TicketOrder>>();

// Cách hiện đại (từ Java 10+):
var orderMap = new HashMap<String, List<TicketOrder>>();`,
            options: [
              { id: 'opt-a', text: 'Giúp chương trình chạy nhanh hơn và giảm tiêu thụ bộ nhớ RAM vì JVM không cần cấp phát trước kiểu dữ liệu tĩnh.', isCorrect: false },
              { id: 'opt-b', text: 'Giảm thiểu mã thừa lặp lại dài dòng (Boilerplate Code), tăng tính trực quan và khả năng đọc hiểu (Readability), giúp lập trình viên tập trung vào tên biến có ý nghĩa trong khi vẫn đảm bảo 100% tính an toàn kiểu tĩnh (Static Type Safety) tại thời điểm biên dịch.', isCorrect: true },
              { id: 'opt-c', text: 'Cho phép biến có thể tự do gán lại giá trị thuộc các kiểu dữ liệu khác nhau trong suốt quá trình chạy (Dynamic Typing).', isCorrect: false },
              { id: 'opt-d', text: 'Tự động kiểm tra và triệt tiêu hoàn toàn ngoại lệ NullPointerException khi thao tác với biến.', isCorrect: false },
            ],
            explanation: 'Tác dụng cốt lõi của `var` (theo tài liệu hướng dẫn JEP 286 của OpenJDK):\n1. Loại bỏ việc lặp lại tên kiểu dữ liệu cồng kềnh (Boilerplate) ở cả 2 vế của phép gán.\n2. Tăng tính dễ đọc (Readability): chuyển sự chú ý của người đọc code vào tên biến có ý nghĩa (Meaningful Variable Names) thay vì kiểu dữ liệu lặp đi lặp lại.\n3. Bảo toàn 100% Type Safety: Không phải kiểu động (Dynamic typing), không suy giảm hiệu năng lúc Runtime vì mã bytecode được javac sinh ra hoàn toàn giống hệt như khi khai báo kiểu tường minh.',
            referencePath: '01-java-core/00-java-project-config.md',
            tags: ['Java 10', 'var keyword', 'Best Practices', 'Readability', 'Boilerplate'],
            difficulty: 'easy',
          },
          {
            id: 'mod2-s1-q2',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Trong các trường hợp khai báo sau đây, trường hợp nào sử dụng từ khóa `var` là HỢP LỆ trong Java?',
            codeSnippet: `// Trường hợp 1: var ticketCount;
// Trường hợp 2: var user = null;
// Trường hợp 3: var seatList = new ArrayList<String>();
// Trường hợp 4: public var calculateTotal(var price) { return price * 2; }`,
            options: [
              { id: 'opt-a', text: 'Trường hợp 1, 2 và 3.', isCorrect: false },
              { id: 'opt-b', text: 'Chỉ duy nhất Trường hợp 3 hợp lệ; các trường hợp 1, 2 và 4 đều bị trình biên dịch từ chối báo lỗi.', isCorrect: true },
              { id: 'opt-c', text: 'Cả 4 trường hợp đều hợp lệ từ phiên bản Java 17 LTS.', isCorrect: false },
              { id: 'opt-d', text: 'Trường hợp 2 và 4 hợp lệ.', isCorrect: false },
            ],
            explanation: 'Quy tắc sử dụng `var` trong Java:\n1. `var ticketCount;` -> LỖI: Bắt buộc phải có biểu thức gán giá trị khởi tạo để compiler suy luận kiểu.\n2. `var user = null;` -> LỖI: `null` không có kiểu cụ thể nên compiler không thể suy luận được.\n3. `var seatList = new ArrayList<String>();` -> HỢP LỆ: Compiler suy luận kiểu là `ArrayList<String>`.\n4. `public var calculateTotal(var price)` -> LỖI: `var` không được phép dùng cho tham số hàm (parameters) hoặc kiểu trả về (return type) của phương thức.',
            referencePath: '01-java-core/00-java-project-config.md',
            tags: ['Java 10', 'var keyword', 'Compiler Rules', 'Limitations'],
            difficulty: 'medium',
          },
          {
            id: 'mod2-s1-q3',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Cạm bẫy phổ biến khi kết hợp từ khóa `var` với toán tử kim cương (Diamond Operator `<>`) rỗng là gì?',
            codeSnippet: `var list = new ArrayList<>();
list.add("VIP-Ticket");
// String ticket = list.get(0); // Dòng này bị lỗi gì?`,
            options: [
              { id: 'opt-a', text: '`var` tự động nhận diện phần tử đầu tiên được add và ép kiểu danh sách thành `ArrayList<String>`.', isCorrect: false },
              { id: 'opt-b', text: 'Do cả vế trái (`var`) và vế phải (`<>`) đều không chỉ định kiểu generic, trình biên dịch suy luận kiểu là `ArrayList<Object>`, khiến `list.get(0)` trả về `Object` và báo lỗi không thể gán trực tiếp cho biến `String` nếu không ép kiểu thủ công.', isCorrect: true },
              { id: 'opt-c', text: 'Trình biên dịch ném ngoại lệ `NullPointerException` ngay khi gọi `list.add()`.', isCorrect: false },
              { id: 'opt-d', text: 'Từ khóa `var` cấm hoàn toàn việc sử dụng với Collection Framework.', isCorrect: false },
            ],
            explanation: 'Khi kết hợp `var` với diamond operator `<>` rỗng ở vế phải, compiler không có thông tin nào để suy luận kiểu generic ngoài `Object`. Do đó biến `list` sẽ có kiểu tĩnh là `ArrayList<Object>`. Đây là cạm bẫy kinh điển: khi dùng `var`, bạn bắt buộc phải chỉ định rõ generic type ở vế phải (ví dụ: `var list = new ArrayList<String>();`).',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['var keyword', 'Generics', 'Diamond Operator', 'Type Safety'],
            difficulty: 'medium',
          },
          {
            id: 'mod2-s1-q4',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Đoạn mã sử dụng từ khóa `var` với biểu thức Lambda sau đây có hợp lệ trong Java hay không và vì sao?',
            codeSnippet: `// Khai báo 1:
var printer = (String s) -> System.out.println(s);

// Khai báo 2:
Consumer<String> consumer = (var s) -> System.out.println(s);`,
            options: [
              { id: 'opt-a', text: 'Cả hai khai báo đều hoàn toàn hợp lệ từ Java 10.', isCorrect: false },
              { id: 'opt-b', text: 'Khai báo 1 BỊ LỖI biên dịch vì Lambda Expression cần Target Type (Functional Interface) cụ thể; còn Khai báo 2 HỢP LỆ từ Java 11 (hỗ trợ `var` cho tham số lambda để có thể gắn annotation như `@Nonnull var s`).', isCorrect: true },
              { id: 'opt-c', text: 'Cả hai khai báo đều bị lỗi biên dịch vì Java cấm dùng `var` trong mọi biểu thức lambda.', isCorrect: false },
              { id: 'opt-d', text: 'Khai báo 1 hợp lệ, còn Khai báo 2 bị lỗi.', isCorrect: false },
            ],
            explanation: '1. `var printer = (String s) -> ...;` -> LỖI: Biểu thức Lambda trong Java không có kiểu độc lập (explicit type), nó đòi hỏi Target Type cụ thể (như Consumer, Function...). Bản thân `var` lại đòi hỏi vế phải phải có kiểu rõ ràng để suy luận, dẫn đến vòng lặp bế tắc nên compiler từ chối.\n2. Khai báo 2 -> HỢP LỆ (từ Java 11 - JEP 323): Cho phép dùng `var` cho tham số của Lambda để có thể đính kèm các type annotation (ví dụ: `(@NotNull var s) -> ...`).',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Java 11', 'var keyword', 'Lambda', 'Target Type'],
            difficulty: 'hard',
          },
          {
            id: 'mod2-s1-q5',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Điều gì xảy ra khi một biến cục bộ (local variable) trong phương thức được khai báo nhưng chưa được gán giá trị mà lập trình viên đã cố tình đọc giá trị của nó?',
            codeSnippet: `public void processOrder() {
    int availableTickets;
    System.out.println(availableTickets); // Dòng này chạy ra sao?
}`,
            options: [
              { id: 'opt-a', text: 'Biến tự động nhận giá trị mặc định là 0 giống như biến thực thể của Class.', isCorrect: false },
              { id: 'opt-b', text: 'Trình biên dịch báo lỗi Compile-time Error: `variable availableTickets might not have been initialized`.', isCorrect: true },
              { id: 'opt-c', text: 'Bị ném ngoại lệ `NullPointerException` tại thời điểm chạy (Runtime).', isCorrect: false },
              { id: 'opt-d', text: 'Chương trình in ra một giá trị rác ngẫu nhiên còn sót lại trong bộ nhớ RAM.', isCorrect: false },
            ],
            explanation: 'Trong Java, biến cục bộ (local variables nằm trên Stack) KHÔNG được JVM tự động gán giá trị mặc định (để bảo vệ hiệu năng và ngăn ngừa lỗi logic). Trình biên dịch Java bắt buộc biến cục bộ phải được gán giá trị cụ thể trên mọi nhánh rẽ trước khi đọc. Ngược lại, biến instance/static trên Heap mới được khởi tạo mặc định (0, 0.0, false, null).',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Variables', 'Local Scope', 'Default Values', 'Compiler Error'],
            difficulty: 'easy',
          },
        ],
      },
      {
        id: 'mod2-sub2',
        moduleId: 'module-02',
        orderNumber: 2,
        title: 'Kiểu nguyên thuỷ trong Java: 8 loại, size và overflow',
        readDuration: 'Đọc 13p',
        description: '8 kiểu dữ liệu nguyên thủy (byte, short, int, long, float, double, char, boolean), kích thước byte, hiện tượng tràn số (Overflow/Underflow), sai số số thực IEEE 754 và giải pháp BigDecimal.',
        questions: [
          {
            id: 'mod2-q1',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Trong hệ thống bán vé hoặc thanh toán tài chính, tại sao tuyệt đối KHÔNG ĐƯỢC dùng kiểu `double` hay `float` để lưu giá vé và số dư tiền?',
            codeSnippet: `double priceA = 0.1;
double priceB = 0.2;
System.out.println(priceA + priceB == 0.3); // Output: false! (0.30000000000000004)`,
            options: [
              { id: 'opt-a', text: 'Vì double tốn nhiều bộ nhớ RAM hơn BigDecimal.', isCorrect: false },
              { id: 'opt-b', text: 'Vì double và float biểu diễn số theo chuẩn nhị phân IEEE 754, gây ra sai số làm tròn dấu phẩy động (Floating-point precision issue); phải dùng `BigDecimal` để đảm bảo độ chính xác tuyệt đối.', isCorrect: true },
              { id: 'opt-c', text: 'Vì PostgreSQL không hỗ trợ kiểu dữ liệu double.', isCorrect: false },
              { id: 'opt-d', text: 'Vì kiểu double không thể lưu được số tiền lớn hơn 100 triệu.', isCorrect: false },
            ],
            explanation: 'Máy tính biểu diễn số thực bằng hệ nhị phân lũy thừa của 2, không thể biểu diễn chính xác tuyệt đối các phân số thập phân như 0.1 hay 0.2, dẫn đến sai số tiền tệ khi cộng dồn hàng nghìn giao dịch. Bắt buộc dùng BigDecimal.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Data Types', 'BigDecimal', 'Precision', 'Finance'],
            difficulty: 'medium',
          },
          {
            id: 'mod2-s2-q2',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Hiện tượng tràn số (Integer Overflow) xảy ra như thế nào trong đoạn mã sau?',
            codeSnippet: `byte maxTickets = 127;
maxTickets++;
System.out.println(maxTickets); // Output: ?`,
            options: [
              { id: 'opt-a', text: 'In ra `128`.', isCorrect: false },
              { id: 'opt-b', text: 'In ra `-128` do kiểu `byte` trong Java có kích thước 8-bit có dấu (khoảng giá trị từ -128 đến 127); khi vượt quá giá trị cực đại, số nhị phân quay vòng về giá trị cực tiểu theo chuẩn mã bù hai (Two\'s complement).', isCorrect: true },
              { id: 'opt-c', text: 'Bị ném ngoại lệ `ArithmeticException: integer overflow`.', isCorrect: false },
              { id: 'opt-d', text: 'Lỗi biên dịch vì không thể tăng giá trị quá giới hạn của byte.', isCorrect: false },
            ],
            explanation: 'Các kiểu số nguyên trong Java đều là kiểu có dấu biểu diễn theo mã bù hai (Two\'s complement). Khi giá trị nhị phân `01111111` (127) cộng thêm 1, nó chuyển thành `10000000` (-128) trong biểu diễn nhị phân, gây ra lỗi tràn số âm nguy hiểm nếu không dùng kiểu dữ liệu lớn hơn hoặc `Math.addExact()`.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Primitive Types', 'Integer Overflow', 'Byte', 'Bitwise'],
            difficulty: 'medium',
          },
        ],
      },
      {
        id: 'mod2-sub3',
        moduleId: 'module-02',
        orderNumber: 3,
        title: 'Kiểu tham chiếu — null, NPE, wrapper class và autoboxing',
        readDuration: 'Đọc 13p',
        description: 'Reference types, cạm bẫy NullPointerException khi Unboxing, cơ chế IntegerCache/LongCache [-128, 127] và so sánh đối tượng bằng .equals() vs ==.',
        questions: [
          {
            id: 'mod2-q3',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Cạm bẫy nguy hiểm nhất khi sử dụng Autounboxing giữa Wrapper Class (`Integer`) và kiểu nguyên thủy (`int`) là gì?',
            codeSnippet: `Integer seatCount = null;
int availableSeats = seatCount; // Dòng này chạy ra kết quả gì?`,
            options: [
              { id: 'opt-a', text: 'Biến `availableSeats` tự động nhận giá trị mặc định là 0.', isCorrect: false },
              { id: 'opt-b', text: 'Bị ném ngoại lệ `NullPointerException` tại thời điểm chạy (Runtime) vì JVM tự động gọi `seatCount.intValue()`.', isCorrect: true },
              { id: 'opt-c', text: 'Lỗi biên dịch (Compile-time error).', isCorrect: false },
              { id: 'opt-d', text: 'Biến `availableSeats` nhận giá trị âm.', isCorrect: false },
            ],
            explanation: 'Khi unbox từ Wrapper sang Primitive, JVM tự động gọi phương thức `.intValue()` ngầm bên dưới. Nếu đối tượng Wrapper mang giá trị null, việc gọi method trên null sẽ gây sập luồng với NullPointerException.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Wrapper Class', 'Autoboxing', 'NullPointerException'],
            difficulty: 'medium',
          },
          {
            id: 'mod2-q11',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Đoạn mã sau xuất ra kết quả gì và cơ chế bộ nhớ nào của JVM giải thích sự khác biệt giữa hai phép so sánh `==` này?',
            codeSnippet: `Integer a1 = 100, a2 = 100;
Integer b1 = 128, b2 = 128;

System.out.println((a1 == a2) + " " + (b1 == b2));`,
            options: [
              { id: 'opt-a', text: '`true true` vì cả 100 và 128 đều là các số nguyên có giá trị bằng nhau.', isCorrect: false },
              { id: 'opt-b', text: '`false false` vì `Integer` là kiểu đối tượng (Wrapper Class) nên toán tử `==` luôn so sánh hai địa chỉ tham chiếu khác nhau trên Heap.', isCorrect: false },
              { id: 'opt-c', text: '`true false` vì cơ chế Autoboxing gọi ngầm `Integer.valueOf()`; JVM duy trì bộ nhớ đệm `IntegerCache` trong khoảng `[-128, 127]` nên `a1` và `a2` cùng trỏ tới một instance có sẵn, còn giá trị `128` vượt quá khoảng cache buộc JVM tạo ra 2 object riêng biệt trên Heap.', isCorrect: true },
              { id: 'opt-d', text: '`false true` vì số lớn hơn 127 được JVM tự động gộp ô nhớ trong String/Integer Pool còn số nhỏ thì không.', isCorrect: false },
            ],
            explanation: 'Khi gán `Integer a = 100;`, trình biên dịch Java thực hiện Autoboxing thành `Integer.valueOf(100)`. Lớp `Integer` chứa một static inner class `IntegerCache` lưu sẵn các đối tượng có giá trị từ `-128` đến `127`. Luôn dùng `.equals()` khi so sánh Wrapper Class!',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Wrapper Class', 'IntegerCache', 'Autoboxing', 'Memory Trap'],
            difficulty: 'medium',
          },
          {
            id: 'mod2-q14',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Trong ứng dụng Spring Boot / JPA, tại sao việc so sánh hai ID bằng toán tử `==` như `currentUserId == requestUserId` là một lỗi tai hại thường "lọt lưới" qua khâu Unit Test nhưng lại phát tác bug nghiêm trọng trên Production?',
            codeSnippet: `// Trong OrderService.java
Long currentUserId = user.getId(); // Kiểu Long
Long requestUserId = request.getUserId();

if (currentUserId == requestUserId) {
    // Cho phép hủy vé / hoàn tiền
}`,
            options: [
              { id: 'opt-a', text: 'Vì trên Production hệ điều hành Linux xử lý toán tử `==` khác với môi trường Windows/Mac ở Local.', isCorrect: false },
              { id: 'opt-b', text: 'Trong môi trường Dev/Test có ít dữ liệu mẫu nên ID thường nhỏ hơn hoặc bằng 127, `LongCache` tái sử dụng cùng object khiến `==` vô tình trả về `true` (test pass); nhưng lên Production khi ID tăng vượt quá 127, JVM tạo ra 2 object riêng biệt trên Heap khiến `==` trả về `false`, làm tính năng bị từ chối sai nghiệp vụ. Bắt buộc luôn dùng `Objects.equals()` hoặc `.equals()`.', isCorrect: true },
              { id: 'opt-c', text: 'Vì kiểu `Long` trong PostgreSQL không tương thích với kiểu `Long` của Java khi so sánh bằng toán tử `==`.', isCorrect: false },
              { id: 'opt-d', text: 'Vì Spring Boot tự động kích hoạt tính năng unbox ngầm của Lombok chỉ ở môi trường test.', isCorrect: false },
            ],
            explanation: 'Đây là bug kinh điển trong các dự án Java Backend. Tương tự IntegerCache, `LongCache` lưu sẵn các giá trị từ -128 đến 127. Khi test ở local với data ít (ID = 1, 2, 10...), phép so sánh `id1 == id2` trả về true một cách tình cờ. Khi lên production với ID thật (ví dụ ID = 10005), `==` so sánh 2 địa chỉ ô nhớ khác nhau và trả về false. Luôn sử dụng `Objects.equals(id1, id2)` để đảm bảo an toàn tuyệt đối.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Production Bug', 'Spring Boot', 'LongCache', 'Best Practices'],
            difficulty: 'medium',
          },
        ],
      },
      {
        id: 'mod2-sub4',
        moduleId: 'module-02',
        orderNumber: 4,
        title: 'Toán tử số học và so sánh — phép chia nguyên, modulo âm và ép kiểu ngầm định',
        readDuration: 'Đọc 13p',
        description: 'Phép chia số nguyên (Integer Division truncates decimals), quy tắc dấu của toán tử modulo (%) với số âm, thứ tự ưu tiên của toán tử số học.',
        questions: [
          {
            id: 'mod2-s4-q1',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Đoạn mã sau tính tỷ lệ phần trăm vé đã bán trong hệ thống Ticket Station sẽ in ra kết quả gì?',
            codeSnippet: `int soldTickets = 50;
int totalTickets = 200;
double percentage = (soldTickets / totalTickets) * 100;
System.out.println(percentage);`,
            options: [
              { id: 'opt-a', text: '`25.0`', isCorrect: false },
              { id: 'opt-b', text: '`0.0` vì `soldTickets / totalTickets` là phép chia giữa hai số nguyên (`int / int`), kết quả `50 / 200` bị cắt bỏ phần thập phân thành `0`, sau đó `0 * 100` ra `0.0`.', isCorrect: true },
              { id: 'opt-c', text: '`50.0`', isCorrect: false },
              { id: 'opt-d', text: 'Lỗi biên dịch do không tương thích kiểu số.', isCorrect: false },
            ],
            explanation: 'Phép chia 2 số `int` trong Java luôn trả về số `int` (bỏ phần dư). `50 / 200 = 0`. Để có kết quả chính xác 25.0, phải ép ít nhất 1 toán hạng sang kiểu số thực: `(double) soldTickets / totalTickets * 100` hoặc `(soldTickets * 100.0) / totalTickets`.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Arithmetic', 'Integer Division', 'Type Promotion'],
            difficulty: 'easy',
          },
          {
            id: 'mod2-s4-q2',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Trong Java, quy tắc tính toán của toán tử Modulo (`%`) với các số âm được định nghĩa như thế nào và đoạn mã sau in ra kết quả gì?',
            codeSnippet: `System.out.println((-7 % 3) + " " + (7 % -3));`,
            options: [
              { id: 'opt-a', text: '`1 1`', isCorrect: false },
              { id: 'opt-b', text: '`-1 1` vì dấu của kết quả phép chia lấy dư `%` trong Java luôn theo dấu của số bị chia (toán hạng bên trái: Dividend), không phụ thuộc vào dấu của số chia (Divisor).', isCorrect: true },
              { id: 'opt-c', text: '`-1 -1`', isCorrect: false },
              { id: 'opt-d', text: '`1 -1`', isCorrect: false },
            ],
            explanation: 'Theo chuẩn Java Language Specification: `a % b = a - (a / b) * b`. Do đó `-7 % 3 = -7 - (-7 / 3) * 3 = -7 - (-2) * 3 = -7 - (-6) = -1`. Tương tự, `7 % -3 = 7 - (7 / -3) * (-3) = 7 - (-2) * (-3) = 7 - 6 = 1`. Dấu của kết quả `%` luôn cùng dấu với toán hạng bên trái!',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Operators', 'Modulo', 'Arithmetic Rules'],
            difficulty: 'medium',
          },
        ],
      },
      {
        id: 'mod2-sub5',
        moduleId: 'module-02',
        orderNumber: 5,
        title: 'Toán tử logic và bitwise — short-circuit, cờ bit và thứ tự ưu tiên',
        readDuration: 'Đọc 13p',
        description: 'Toán tử logic ngắn mạch (&&, ||) vs Bitwise (&, |), thứ tự ưu tiên toán tử, ứng dụng Bitmask để quản lý cờ phân quyền (Permissions).',
        questions: [
          {
            id: 'mod2-s5-q1',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Sự khác biệt cốt lõi giữa toán tử logic ngắn mạch `&&` (Short-circuit AND) và toán tử bitwise `&` trong câu lệnh điều kiện là gì?',
            codeSnippet: `Ticket ticket = null;
if (ticket != null && ticket.isAvailable()) { ... } // Đoạn 1
if (ticket != null & ticket.isAvailable()) { ... }  // Đoạn 2`,
            options: [
              { id: 'opt-a', text: 'Cả 2 đoạn code chạy giống hệt nhau, không có sự khác biệt.', isCorrect: false },
              { id: 'opt-b', text: 'Đoạn 1 an toàn: nếu vế trái `false`, vế phải sẽ không được tính toán; Đoạn 2 nguy hiểm: `&` luôn bắt buộc tính toán cả 2 vế, dẫn đến `NullPointerException` khi `ticket` là null.', isCorrect: true },
              { id: 'opt-c', text: 'Đoạn 1 chỉ chạy được trên Java 8 trở xuống.', isCorrect: false },
              { id: 'opt-d', text: '`&&` chỉ dùng cho số, còn `&` dùng cho kiểu đối tượng.', isCorrect: false },
            ],
            explanation: 'Toán tử `&&` và `||` có tính năng ngắn mạch (Short-circuit): dừng đánh giá ngay khi kết quả đã chắc chắn. Dùng `&` hoặc `|` trong điều kiện logic sẽ buộc JVM tính toán cả 2 vế, gây crash nếu vế phải giả định vế trái khác null.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Control Flow', 'Operators', 'Short-Circuit'],
            difficulty: 'easy',
          },
          {
            id: 'mod2-s5-q2',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Trong hệ thống phân quyền (RBAC), kỹ thuật Bitmask dùng toán tử Bitwise nào để kiểm tra xem một người dùng có quyền `READ` (`0b0001`) trong biến `userPermissions` hay không?',
            codeSnippet: `int PERM_READ = 1;   // 0001
int PERM_WRITE = 2;  // 0010
int PERM_DELETE = 4; // 0100
int userPerms = PERM_READ | PERM_WRITE; // 0011

// Biểu thức kiểm tra xem userPerms có chứa quyền PERM_READ:
boolean hasRead = ...;`,
            options: [
              { id: 'opt-a', text: '`(userPerms & PERM_READ) == PERM_READ`', isCorrect: true },
              { id: 'opt-b', text: '`(userPerms | PERM_READ) == 0`', isCorrect: false },
              { id: 'opt-c', text: '`(userPerms ^ PERM_READ) == 0`', isCorrect: false },
              { id: 'opt-d', text: '`userPerms << PERM_READ`', isCorrect: false },
            ],
            explanation: 'Toán tử `&` (Bitwise AND) giữ lại các bit cùng là 1. Nếu `(userPerms & PERM_READ) == PERM_READ`, chứng tỏ bit quyền đó đã được bật. Đây là kỹ thuật lưu nhiều cờ nhị phân (Bitmask) cực kỳ tiết kiệm bộ nhớ và tối ưu hiệu năng trong hệ thống lớn.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Bitwise', 'Bitmask', 'Permissions', 'Binary'],
            difficulty: 'medium',
          },
        ],
      },
      {
        id: 'mod2-sub6',
        moduleId: 'module-02',
        orderNumber: 6,
        title: 'Ép kiểu trong Java: Widening, Narrowing và Safe Cast',
        readDuration: 'Đọc 12p',
        description: 'Ép kiểu mở rộng (Widening/Implicit Casting), ép kiểu thu hẹp (Narrowing/Explicit Casting), cạm bẫy mất mát dữ liệu và cách ép kiểu an toàn.',
        questions: [
          {
            id: 'mod2-s6-q1',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Điều gì xảy ra khi thực hiện ép kiểu thu hẹp (Narrowing Primitive Conversion) từ `int` sang `byte` như đoạn mã dưới đây?',
            codeSnippet: `int largeNumber = 130;
byte b = (byte) largeNumber;
System.out.println(b);`,
            options: [
              { id: 'opt-a', text: 'In ra `130` bình thường.', isCorrect: false },
              { id: 'opt-b', text: 'In ra `-126` do JVM chỉ giữ lại 8 bit thấp nhất của số nguyên 130 (`00000000 00000000 00000000 10000010` -> `10000010` = -126 trong hệ bù hai).', isCorrect: true },
              { id: 'opt-c', text: 'Ném ngoại lệ `ClassCastException` tại Runtime.', isCorrect: false },
              { id: 'opt-d', text: 'Trình biên dịch báo lỗi Compile-time Error.', isCorrect: false },
            ],
            explanation: 'Narrowing conversion cắt bỏ các bit bậc cao (high-order bits) và chỉ giữ lại số bit tương ứng của kiểu đích. 130 trong nhị phân 32-bit là `...0000 10000010`. Khi ép xuống 8-bit, bit dấu là 1 (số âm), giá trị bù hai là `- (256 - 130) = -126`.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Casting', 'Narrowing', 'Bitwise', 'Overflow'],
            difficulty: 'medium',
          },
          {
            id: 'mod2-s6-q2',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Trong Java, cặp chuyển đổi kiểu nguyên thủy nào dưới đây KHÔNG THỂ tự động ép kiểu mở rộng (Widening) mà bắt buộc phải ép kiểu tường minh `(cast)`?',
            options: [
              { id: 'opt-a', text: '`byte` sang `int`', isCorrect: false },
              { id: 'opt-b', text: '`int` sang `long`', isCorrect: false },
              { id: 'opt-c', text: '`char` sang `short` (hoặc ngược lại)', isCorrect: true },
              { id: 'opt-d', text: '`float` sang `double`', isCorrect: false },
            ],
            explanation: 'Mặc dù cả `char` và `short` đều chiếm 16-bit (2 bytes) trong bộ nhớ, nhưng `short` là kiểu số nguyên có dấu `[-32,768 đến 32,767]`, còn `char` là kiểu số nguyên không dấu Unicode `[0 đến 65,535]`. Vì khoảng giá trị của chúng không bao hàm nhau hoàn toàn, Java bắt buộc phải ép kiểu tường minh `(short) c` hoặc `(char) s`.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Type Casting', 'Widening', 'char vs short'],
            difficulty: 'hard',
          },
        ],
      },
      {
        id: 'mod2-sub7',
        moduleId: 'module-02',
        orderNumber: 7,
        title: 'String, Text Block và StringBuilder trong Java hiện đại',
        readDuration: 'Đọc 12p',
        description: 'Tính bất biến của String, String Constant Pool, tối ưu hóa Constant Folding, Text Block ("""), StringBuilder vs toán tử + trong vòng lặp.',
        questions: [
          {
            id: 'mod2-q2',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Đoạn code sau đây xuất ra kết quả gì và cơ chế nào bên dưới của Java giải thích hiện tượng này?',
            codeSnippet: `String s1 = "TicketStation";
String s2 = "TicketStation";
String s3 = new String("TicketStation");

System.out.println((s1 == s2) + " " + (s1 == s3));`,
            options: [
              { id: 'opt-a', text: '`true true`', isCorrect: false },
              { id: 'opt-b', text: '`false false`', isCorrect: false },
              { id: 'opt-c', text: '`true false` vì s1 và s2 cùng trỏ vào một vùng nhớ trong String Constant Pool trên Heap, còn từ khóa `new` tạo ra một đối tượng hoàn toàn mới ở ngoài pool.', isCorrect: true },
              { id: 'opt-d', text: '`false true`', isCorrect: false },
            ],
            explanation: 'Khi khai báo chuỗi bằng String Literal (dấu ngoặc kép), JVM lưu và tái sử dụng chuỗi trong String Constant Pool (s1 == s2 true). Khi dùng `new String()`, JVM bắt buộc cấp phát một object mới trên Heap (s1 == s3 false). Khi so sánh nội dung chuỗi luôn dùng `.equals()`.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['String', 'String Pool', 'Memory Management'],
            difficulty: 'easy',
          },
          {
            id: 'mod2-q10',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Tại sao việc nối chuỗi bằng toán tử `+` bên trong một vòng lặp lớn (ví dụ: tạo mã vé hoặc xuất báo cáo) lại là một Anti-pattern nghiêm trọng về hiệu năng trong Java?',
            codeSnippet: `// Đoạn mã tạo chuỗi mã vé trong dịch vụ Ticket Station
String ticketSummary = "";
for (int i = 1; i <= 10_000; i++) {
    ticketSummary += "TICKET-" + i + ";";
}`,
            options: [
              { id: 'opt-a', text: 'Vì toán tử `+` không thread-safe và sẽ luôn gây ra lỗi `ConcurrentModificationException` trong vòng lặp.', isCorrect: false },
              { id: 'opt-b', text: 'Vì ở mỗi vòng lặp, JVM phải tạo mới một `StringBuilder` và tạo mới đối tượng `String` qua `toString()`, dẫn đến độ phức tạp thời gian O(n²) và xả ra hàng vạn đối tượng rác trên Heap làm nghẽn bộ gom rác Garbage Collector (GC); giải pháp chuẩn là dùng 1 đối tượng `StringBuilder` duy nhất khởi tạo ngoài vòng lặp.', isCorrect: true },
              { id: 'opt-c', text: 'Vì vòng lặp sẽ bị dừng đột ngột bởi ngoại lệ `StackOverflowError`.', isCorrect: false },
              { id: 'opt-d', text: 'Vì Java không hỗ trợ ép kiểu tự động giữa số nguyên `i` và chuỗi trong vòng lặp.', isCorrect: false },
            ],
            explanation: 'Do String trong Java là Immutable (bất biến), mỗi phép `ticketSummary += ...` trong vòng lặp buộc JVM phải tạo một đối tượng StringBuilder mới, append nội dung cũ và mới, rồi gọi toString() tạo một String mới và vứt bỏ String cũ. Với 10,000 vòng lặp, nó tạo ra O(n) đối tượng rác và copy dữ liệu liên tục (O(n²)). Khắc phục bằng cách dùng: `StringBuilder sb = new StringBuilder(); for (...) sb.append(...);`.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Performance', 'Garbage Collection', 'StringBuilder', 'Anti-pattern'],
            difficulty: 'medium',
          },
          {
            id: 'mod2-s7-q3',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Tính năng Text Block (`""" ... """`) được chính thức giới thiệu từ Java 15 mang lại lợi ích nổi bật nào khi viết câu lệnh SQL hoặc payload JSON trong mã nguồn Java?',
            codeSnippet: `String query = """
    SELECT id, title, base_price 
    FROM events 
    WHERE status = 'ACTIVE'
    """;`,
            options: [
              { id: 'opt-a', text: 'Text Block tự động mã hóa SQL để chống tấn công SQL Injection.', isCorrect: false },
              { id: 'opt-b', text: 'Cho phép viết chuỗi nhiều dòng (multi-line string) tự nhiên, tự động loại bỏ các khoảng trắng thụt lề ngẫu nhiên (incidental whitespace), không cần nối chuỗi `+` và không cần escape các dấu nháy kép `"` bên trong.', isCorrect: true },
              { id: 'opt-c', text: 'Text Block chỉ dùng được trong các file cấu hình YAML.', isCorrect: false },
              { id: 'opt-d', text: 'Giúp câu lệnh SQL chạy nhanh hơn gấp 2 lần.', isCorrect: false },
            ],
            explanation: 'Text Block (JEP 378 từ Java 15) giải quyết sự phiền toái khi viết HTML, JSON, SQL nhiều dòng. Nó giữ nguyên định dạng xuống dòng, không cần escape `\"` và tự động căn chỉnh lề thông minh (stripIndent).',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Java 15', 'Text Block', 'Multi-line String', 'Clean Code'],
            difficulty: 'easy',
          },
        ],
      },
      {
        id: 'mod2-sub8',
        moduleId: 'module-02',
        orderNumber: 8,
        title: 'Hằng số và final — giá trị khắc trên đá',
        readDuration: 'Đọc 13p',
        description: 'Từ khóa final trên biến, tham chiếu bất biến vs trạng thái đối tượng, hằng số thời gian biên dịch (Compile-time Constant) và tối ưu Constant Folding.',
        questions: [
          {
            id: 'mod2-q8',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Nếu thêm từ khóa `final` vào biến `sub` như đoạn mã dưới đây, kết quả in ra của biểu thức `s1 == s3` sẽ là gì và tại sao?',
            codeSnippet: `String s1 = "hello";
final String sub = "hel"; // Thêm từ khóa final
String s3 = sub + "lo";

System.out.println(s1 == s3);`,
            options: [
              { id: 'opt-a', text: '`false` vì mọi phép cộng chuỗi có chứa biến tham chiếu đều được tính toán tại Runtime.', isCorrect: false },
              { id: 'opt-b', text: '`true` vì khi có từ khóa `final`, biến `sub` trở thành Hằng số thời gian biên dịch (Compile-time Constant) với thuộc tính ConstantValue trong bytecode; javac tự động kích hoạt cơ chế Constant Folding gộp `sub + "lo"` thành `"hello"` trong String Pool.', isCorrect: true },
              { id: 'opt-c', text: 'Trình biên dịch báo lỗi cú pháp vì từ khóa `final` không cho phép biến được dùng trong biểu thức ghép chuỗi `+`.', isCorrect: false },
              { id: 'opt-d', text: '`false` vì từ khóa `final` chỉ giữ cố định địa chỉ tham chiếu, còn JVM vẫn phải gọi StringBuilder tại Runtime.', isCorrect: false },
            ],
            explanation: 'Khi một biến String được khai báo `final` và khởi tạo trực tiếp bằng String Literal, trình biên dịch Java nhận diện đây là một Compile-Time Constant (Hằng số thời gian biên dịch). Biến `sub` được đánh dấu thuộc tính `ConstantValue` trong class file. Javac áp dụng Constant Folding, tự động thay thế `sub` bằng `"hel"` và gộp `"hel" + "lo"` thành chuỗi literal `"hello"` ngay trong file .class. Khi chạy, `s3` trỏ thẳng vào String Constant Pool nên `s1 == s3` cho kết quả `true`.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['final', 'Constant Folding', 'Bytecode', 'String Pool'],
            difficulty: 'hard',
          },
          {
            id: 'mod2-s8-q2',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Sự hiểu lầm phổ biến nhất về từ khóa `final` khi áp dụng lên một biến tham chiếu đối tượng (ví dụ: `final List<String> seatList = new ArrayList<>();`) là gì?',
            codeSnippet: `final List<String> seatList = new ArrayList<>();
seatList.add("VIP-01"); // Lệnh này có hợp lệ không?`,
            options: [
              { id: 'opt-a', text: '`final` biến danh sách thành bất biến tuyệt đối (immutable), nên gọi `seatList.add(...)` sẽ ném ngoại lệ UnsupportedOperationException.', isCorrect: false },
              { id: 'opt-b', text: '`final` chỉ cố định địa chỉ tham chiếu (không thể gán `seatList = new ArrayList<>()` khác), còn trạng thái bên trong đối tượng vẫn có thể bị thay đổi tự do (vẫn gọi `add()`, `remove()` bình thường).', isCorrect: true },
              { id: 'opt-c', text: 'Từ khóa `final` không thể dùng cho kiểu dữ liệu Collection trong Java.', isCorrect: false },
              { id: 'opt-d', text: 'Trình biên dịch báo lỗi compile error ngay tại dòng gọi method add.', isCorrect: false },
            ],
            explanation: '`final` trên biến tham chiếu chỉ bảo vệ con trỏ (địa chỉ ô nhớ) không bị gán lại sang instance khác. Nó KHÔNG làm cho nội dung đối tượng được trỏ tới trở thành bất biến. Để có danh sách bất biến thực sự, phải dùng `List.of()` hoặc `Collections.unmodifiableList()`.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['final keyword', 'Immutability', 'References', 'Best Practices'],
            difficulty: 'medium',
          },
        ],
      },
      {
        id: 'mod2-sub9',
        moduleId: 'module-02',
        orderNumber: 9,
        title: 'Enum — tập giá trị cố định, type-safe thay cho magic number',
        readDuration: 'Đọc 14p',
        description: 'Enum trong Java: Type-safety, Singleton pattern, thuộc tính và phương thức trong Enum, so sánh Enum bằng == an toàn tuyệt đối.',
        questions: [
          {
            id: 'mod2-s9-q1',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Tại sao trong Java Backend chúng ta nên ưu tiên dùng toán tử `==` thay vì phương thức `.equals()` khi so sánh hai giá trị của Enum?',
            codeSnippet: `TicketStatus status = getTicketStatus();
if (status == TicketStatus.BOOKED) { ... }`,
            options: [
              { id: 'opt-a', text: '`==` chạy nhanh hơn và quan trọng nhất là an toàn tuyệt đối trước `NullPointerException`: nếu `status` mang giá trị `null`, biểu thức `status == TicketStatus.BOOKED` trả về `false` một cách an toàn mà không bị crash như khi gọi `status.equals(...)`.', isCorrect: true },
              { id: 'opt-b', text: 'Vì Enum trong Java không có phương thức `.equals()`.', isCorrect: false },
              { id: 'opt-c', text: 'Vì toán tử `==` tự động ép kiểu enum sang chuỗi String.', isCorrect: false },
              { id: 'opt-d', text: 'Vì Java quy định cấm dùng `.equals()` trên kiểu enum.', isCorrect: false },
            ],
            explanation: 'Mỗi hằng số Enum trong Java là một Singleton instance duy nhất được JVM nạp tại lúc khởi tạo class. Do đó toán tử `==` đảm bảo so sánh chính xác 100%. Hơn nữa, nếu biến `status` là `null`, gọi `status.equals(...)` sẽ ném NullPointerException, trong khi `status == TicketStatus.BOOKED` an toàn trả về `false`.',
            referencePath: '01-java-core/09-enum-annotation.md',
            tags: ['Enum', 'Null Safety', 'Singleton', 'Best Practices'],
            difficulty: 'easy',
          },
          {
            id: 'mod2-s9-q2',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Trong ứng dụng Ticket Station, một Enum có thể chứa các trường dữ liệu (fields), constructor và phương thức nghiệp vụ hay không?',
            codeSnippet: `public enum TicketTier {
    STANDARD(100_000, "Ghế Thường"),
    VIP(250_000, "Ghế VIP"),
    VVIP(500_000, "Ghế Siêu VIP");

    private final int price;
    private final String label;

    TicketTier(int price, String label) {
        this.price = price;
        this.label = label;
    }
    public int getPrice() { return price; }
}`,
            options: [
              { id: 'opt-a', text: 'Không thể, Enum trong Java chỉ là danh sách các tên hằng số thuần túy giống như trong ngôn ngữ C.', isCorrect: false },
              { id: 'opt-b', text: 'Hoàn toàn có thể; Enum trong Java là một Class đặc biệt kế thừa từ `java.lang.Enum`, có thể khai báo constructor private, biến thực thể `final`, các phương thức nghiệp vụ và thậm chí triển khai (implements) interface.', isCorrect: true },
              { id: 'opt-c', text: 'Chỉ có thể chứa trường kiểu int, không thể chứa String hay constructor.', isCorrect: false },
              { id: 'opt-d', text: 'Chỉ phiên bản Java 21 mới cho phép Enum có phương thức.', isCorrect: false },
            ],
            explanation: 'Enum trong Java là First-class Citizen đầy đủ sức mạnh của một Class: có constructor (luôn private ngầm định), các trường hằng số, phương thức tính toán, và có thể implement các Interface giúp tổ chức domain logic cực kỳ trong sáng và type-safe.',
            referencePath: '01-java-core/09-enum-annotation.md',
            tags: ['Enum', 'OOP', 'Domain Model', 'Clean Code'],
            difficulty: 'medium',
          },
        ],
      },
      {
        id: 'mod2-sub10',
        moduleId: 'module-02',
        orderNumber: 10,
        title: 'Thực hành tính chỉ số BMI và phân loại theo chuẩn WHO',
        readDuration: 'Đọc 18p',
        description: 'Thực hành tổng hợp cú pháp, biến, kiểu dữ liệu, toán tử số học, điều kiện if-else bậc thang với bài toán tính chỉ số khối cơ thể BMI theo tiêu chuẩn WHO.',
        questions: [
          {
            id: 'mod2-s10-q1',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Cho công thức tính chỉ số BMI: BMI = weight / (height * height) (cân nặng tính bằng kg, chiều cao tính bằng mét). Đoạn mã Java sau đây mắc phải lỗi tính toán logic nghiêm trọng nào?',
            codeSnippet: `int weight = 70;      // 70 kg
int heightCm = 175;   // 175 cm
double heightM = heightCm / 100; // Đổi sang mét
double bmi = weight / (heightM * heightM);
System.out.println("BMI: " + bmi);`,
            options: [
              { id: 'opt-a', text: 'Đoạn code chạy hoàn hảo, cho ra kết quả BMI = 22.86.', isCorrect: false },
              { id: 'opt-b', text: 'Lỗi Integer Division ở dòng `heightCm / 100`: do cả 175 và 100 là số nguyên `int`, phép chia bị cắt phần thập phân thành `1.0` thay vì `1.75`, dẫn đến tính sai hoàn toàn chỉ số BMI thành `70.0` (béo phì độ III sai lệch).', isCorrect: true },
              { id: 'opt-c', text: 'Bị lỗi chia cho 0 (`ArithmeticException: / by zero`).', isCorrect: false },
              { id: 'opt-d', text: 'Lỗi biên dịch vì không thể gán phép chia int cho biến double.', isCorrect: false },
            ],
            explanation: 'Đây là cạm bẫy kinh điển cho lập trình viên mới: `175 / 100` thực hiện phép chia nguyên trước rồi mới ép kiểu sang `double`, cho ra `1.0`. Cần sửa thành `heightCm / 100.0` hoặc `(double) heightCm / 100` để có kết quả `1.75`.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['BMI Practice', 'Integer Division', 'Bug Prevention'],
            difficulty: 'medium',
          },
          {
            id: 'mod2-s10-q2',
            milestoneId: 'module-02',
            moduleId: 'module-02',
            title: 'Theo chuẩn phân loại của Tổ chức Y tế Thế giới (WHO): BMI < 18.5 (Thiếu cân), 18.5 đến 24.9 (Bình thường), 25.0 đến 29.9 (Thừa cân), >= 30.0 (Béo phì). Cấu trúc điều kiện `if` nào dưới đây biểu diễn logic phân loại này một cách sạch và chuẩn xác nhất?',
            codeSnippet: `public static String classifyBmi(double bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25.0) return "Normal";
    if (bmi < 30.0) return "Overweight";
    return "Obese";
}`,
            options: [
              { id: 'opt-a', text: 'Đúng và tối ưu nhất: Nhờ cơ chế Return Early và cấu trúc bậc thang tăng dần, không cần viết rườm rà `if (bmi >= 18.5 && bmi < 25.0)` vì điều kiện trước đó đã loại trừ các giá trị nhỏ hơn.', isCorrect: true },
              { id: 'opt-b', text: 'Sai vì thiếu từ khóa else nên tất cả các if đều bị chạy lặp lại.', isCorrect: false },
              { id: 'opt-c', text: 'Sai vì BMI phải là kiểu int thì mới so sánh được trong Java.', isCorrect: false },
              { id: 'opt-d', text: 'Phải dùng switch-case mới phân loại được số thực double.', isCorrect: false },
            ],
            explanation: 'Kỹ thuật Guard Clauses / Early Return kết hợp điều kiện tăng dần giúp code ngắn gọn, dễ đọc, loại bỏ điều kiện kép dư thừa `&&` và tự động bao phủ trọn vẹn toàn bộ miền giá trị của BMI.',
            referencePath: '01-java-core/01-oop-class-object.md',
            tags: ['Clean Code', 'Control Flow', 'BMI Practice', 'Guard Clauses'],
            difficulty: 'easy',
          },
        ],
      },
    ],
    get questions() {
      return this.subTopics ? this.subTopics.flatMap((s) => s.questions) : [];
    },
  },
  {
    id: 'module-03',
    code: '03',
    name: 'Điều kiện & Vòng lặp',
    title: '03. Điều kiện & Vòng lặp',
    iconName: 'GitBranch',
    description: 'if-else, switch expression (Java 14+), vòng lặp for, while, toán tử ngắn mạch, break with labels.',
    folderPath: '01-java-core',
    questions: [
      {
        id: 'mod3-q1',
        milestoneId: 'module-03',
        moduleId: 'module-03',
        title: 'Sự khác biệt cốt lõi giữa toán tử logic ngắn mạch `&&` (Short-circuit AND) và toán tử `&` (Bitwise AND) trong câu lệnh điều kiện là gì?',
        codeSnippet: `Ticket ticket = null;
if (ticket != null && ticket.isAvailable()) { ... } // Đoạn 1
if (ticket != null & ticket.isAvailable()) { ... }  // Đoạn 2`,
        options: [
          { id: 'opt-a', text: 'Cả 2 đoạn code chạy giống hệt nhau, không có sự khác biệt.', isCorrect: false },
          { id: 'opt-b', text: 'Đoạn 1 an toàn: nếu vế trái `false`, vế phải sẽ không được tính toán; Đoạn 2 nguy hiểm: `&` luôn bắt buộc tính toán cả 2 vế, dẫn đến `NullPointerException` khi `ticket` là null.', isCorrect: true },
          { id: 'opt-c', text: 'Đoạn 1 chỉ chạy được trên Java 8 trở xuống.', isCorrect: false },
          { id: 'opt-d', text: '`&&` chỉ dùng cho số, còn `&` dùng cho kiểu đối tượng.', isCorrect: false },
        ],
        explanation: 'Toán tử `&&` và `||` có tính năng ngắn mạch (Short-circuit): dừng đánh giá ngay khi kết quả đã chắc chắn. Dùng `&` hoặc `|` trong điều kiện logic sẽ buộc JVM tính toán cả 2 vế, gây crash nếu vế phải giả định vế trái khác null.',
        referencePath: '01-java-core/01-oop-class-object.md',
        tags: ['Control Flow', 'Operators', 'Short-Circuit'],
        difficulty: 'easy',
      },
      {
        id: 'mod3-q2',
        milestoneId: 'module-03',
        moduleId: 'module-03',
        title: 'Tính năng Switch Expression cải tiến trong Java 14+ với cú pháp mũi tên `->` mang lại ưu thế vượt trội nào so với `switch-case` truyền thống?',
        codeSnippet: `String badge = switch (seatType) {
    case VIP -> "Vàng";
    case STANDARD -> "Bạc";
    default -> "Thường";
};`,
        options: [
          { id: 'opt-a', text: 'Tự động kiểm tra tính toàn vẹn (exhaustiveness), có thể trả về giá trị trực tiếp như một biểu thức, và loại bỏ hoàn toàn lỗi quên từ khóa `break` gây tràn nhánh (fall-through bug).', isCorrect: true },
          { id: 'opt-b', text: 'Giúp mã nguồn chạy nhanh hơn 1000 lần so với if-else.', isCorrect: false },
          { id: 'opt-c', text: 'Chỉ chấp nhận kiểu dữ liệu boolean.', isCorrect: false },
          { id: 'opt-d', text: 'Cho phép thay thế toàn bộ database SQL.', isCorrect: false },
        ],
        explanation: 'Switch Expression mới (JEP 361) cho phép trả về giá trị, cú pháp mũi tên `->` không bị fall-through (không cần break), và compiler kiểm tra đầy đủ các trường hợp của enum giúp code cực kỳ an toàn.',
        referencePath: '01-java-core/01-oop-class-object.md',
        tags: ['Java 14', 'Switch Expression', 'Clean Code'],
        difficulty: 'medium',
      },
      {
        id: 'mod3-q3',
        milestoneId: 'module-03',
        moduleId: 'module-03',
        title: 'Khi duyệt qua một `ArrayList` bằng vòng lặp for-each, điều gì xảy ra nếu bạn gọi phương thức `list.remove(item)` trực tiếp?',
        codeSnippet: `List<String> seats = new ArrayList<>(List.of("A1", "A2", "A3"));
for (String seat : seats) {
    if (seat.equals("A2")) {
        seats.remove(seat);
    }
}`,
        options: [
          { id: 'opt-a', text: 'Phần tử "A2" được xóa an toàn, danh sách còn lại ["A1", "A3"].', isCorrect: false },
          { id: 'opt-b', text: 'Ném ra ngoại lệ `ConcurrentModificationException` vì cấu trúc danh sách bị thay đổi trong khi Iterator đang duyệt.', isCorrect: true },
          { id: 'opt-c', text: 'Chương trình rơi vào vòng lặp vô tận.', isCorrect: false },
          { id: 'opt-d', text: 'Compiler báo lỗi cú pháp không cho phép biên dịch.', isCorrect: false },
        ],
        explanation: 'Vòng lặp for-each bản chất sử dụng Iterator. ArrayList có biến `modCount` đếm số lần sửa đổi. Khi gọi `seats.remove()`, modCount thay đổi khiến Iterator phát hiện danh sách bị can thiệp và ném ConcurrentModificationException. Muốn xóa an toàn, dùng `Iterator.remove()` hoặc `seats.removeIf(...)`.',
        referencePath: '01-java-core/04-collections-framework.md',
        tags: ['Collections', 'Loops', 'ConcurrentModificationException'],
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'module-04',
    code: '04',
    name: 'Phương thức (method)',
    title: '04. Phương thức (method)',
    iconName: 'FunctionSquare',
    description: 'Khai báo phương thức, Tham số, Pass-by-value, Method Overloading, Varargs, Recursion.',
    folderPath: '01-java-core',
    questions: [
      {
        id: 'mod4-q1',
        milestoneId: 'module-04',
        moduleId: 'module-04',
        title: 'Java truyền tham số vào phương thức theo cơ chế nào (Pass-by-value hay Pass-by-reference)? Hãy phân tích đoạn code sau:',
        codeSnippet: `public void modify(Ticket ticket, int discount) {
    ticket = new Ticket("VIP-999"); // Gán sang object mới
    discount = 50;                  // Sửa giá trị int
}

// Bên ngoài:
Ticket myTicket = new Ticket("STD-001");
int myDiscount = 10;
modify(myTicket, myDiscount);
// Sau khi gọi hàm, myTicket.id và myDiscount có giá trị là gì?`,
        options: [
          { id: 'opt-a', text: '`myTicket` mang id "VIP-999" và `myDiscount` bằng 50.', isCorrect: false },
          { id: 'opt-b', text: 'Java là **100% Pass-by-value** (truyền bản sao giá trị). Đối với Object, giá trị được truyền là **bản sao của địa chỉ tham chiếu**. Việc gán lại `ticket = new ...` chỉ đổi con trỏ cục bộ bên trong hàm; sau khi thoát hàm `myTicket` vẫn là "STD-001" và `myDiscount` vẫn là 10.', isCorrect: true },
          { id: 'opt-c', text: 'Chương trình báo lỗi NullPointerException.', isCorrect: false },
          { id: 'opt-d', text: 'myTicket đổi thành VIP-999 nhưng myDiscount giữ nguyên 10.', isCorrect: false },
        ],
        explanation: 'Trong Java, TẤT CẢ mọi thứ đều được truyền theo giá trị (Pass-by-value). Với primitive, truyền bản sao dữ liệu. Với Object, truyền bản sao của địa chỉ ô nhớ. Bạn có thể thay đổi thuộc tính bên trong object qua con trỏ, nhưng việc gán biến tham số sang object mới hoàn toàn không ảnh hưởng biến bên ngoài.',
        referencePath: '01-java-core/01-oop-class-object.md',
        tags: ['Methods', 'Pass-By-Value', 'Memory'],
        difficulty: 'hard',
      },
      {
        id: 'mod4-q2',
        milestoneId: 'module-04',
        moduleId: 'module-04',
        title: 'Hai phương thức sau có được coi là nạp chồng (Overloading) hợp lệ trong cùng một class không?',
        codeSnippet: `public int calculateFee(String ticketId) { return 100; }
public double calculateFee(String ticketId) { return 100.0; }`,
        options: [
          { id: 'opt-a', text: 'Hợp lệ vì kiểu trả về (int và double) khác nhau.', isCorrect: false },
          { id: 'opt-b', text: 'Không hợp lệ (Lỗi biên dịch) vì Overloading bắt buộc phải khác nhau về danh sách tham số (số lượng hoặc kiểu dữ liệu tham số); compiler KHÔNG phân biệt phương thức chỉ dựa vào kiểu trả về.', isCorrect: true },
          { id: 'opt-c', text: 'Chỉ hợp lệ nếu chạy trên Java 21.', isCorrect: false },
          { id: 'opt-d', text: 'Hợp lệ nếu một trong 2 phương thức là static.', isCorrect: false },
        ],
        explanation: 'Chữ ký phương thức (Method Signature) chỉ bao gồm Tên phương thức + Danh sách kiểu tham số. Kiểu trả về không nằm trong chữ ký phương thức, do đó compiler không thể phân biệt khi người gọi viết `calculateFee("A1")`.',
        referencePath: '01-java-core/01-oop-class-object.md',
        tags: ['Overloading', 'Method Signature', 'Compiler'],
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'module-05',
    code: '05',
    name: 'OOP cơ bản — class, object, encapsulation',
    title: '05. OOP cơ bản — class, object, encapsulation',
    iconName: 'Box',
    description: 'Class, Object, Access Modifiers, Constructor, this, Encapsulation, Tell Don’t Ask, Invariant Protection.',
    folderPath: '01-java-core/01-oop-class-object',
    questions: [
      {
        id: 'mod5-q1',
        milestoneId: 'module-05',
        moduleId: 'module-05',
        title: 'Tại sao việc khai báo trường `private` nhưng lại tự động sinh hàng loạt `get...()` và `set...()` bừa bãi lại bị coi là phản mẫu thiết kế (Anemic Domain Model) phá vỡ Encapsulation?',
        options: [
          { id: 'opt-a', text: 'Vì việc sinh getter/setter làm file code dài hơn 100 dòng.', isCorrect: false },
          { id: 'opt-b', text: 'Vì nếu cung cấp `set...()` vô điều kiện, bất kỳ tầng bên ngoài nào cũng có thể tự do gán dữ liệu sai nghiệp vụ (như `setPrice(-500)`); đối tượng mất hoàn toàn khả năng tự bảo vệ tính toàn vẹn trạng thái (Invariants).', isCorrect: true },
          { id: 'opt-c', text: 'Vì Spring Data JPA không hỗ trợ getter/setter.', isCorrect: false },
          { id: 'opt-d', text: 'Vì các phương thức set làm giảm hiệu năng của CPU.', isCorrect: false },
        ],
        explanation: 'Encapsulation thực thụ đòi hỏi đóng gói cả dữ liệu lẫn hành vi bảo vệ dữ liệu. Cung cấp setter tự do chẳng khác nào để biến public. Cần áp dụng nguyên tắc "Tell, Don\'t Ask" bằng các business methods như `holdSeat()`, `confirmPurchase()`.',
        referencePath: '01-java-core/01-oop-class-object/encapsulation.md',
        tags: ['OOP', 'Encapsulation', 'Anemic Domain Model'],
        difficulty: 'medium',
      },
      {
        id: 'mod5-q2',
        milestoneId: 'module-05',
        moduleId: 'module-05',
        title: 'Nguyên tắc thiết kế "Tell, Don\'t Ask" trong lập trình hướng đối tượng có ý nghĩa thực tiễn là gì?',
        options: [
          { id: 'opt-a', text: 'Ra lệnh trực tiếp cho đối tượng thực hiện hành vi nghiệp vụ của nó, thay vì dùng getter để lôi dữ liệu ra ngoài kiểm tra rồi dùng setter gán ngược trở lại.', isCorrect: true },
          { id: 'opt-b', text: 'Bắt buộc lập trình viên phải viết comment giải thích cho mọi method.', isCorrect: false },
          { id: 'opt-c', text: 'Không được phép ném ngoại lệ trong phương thức.', isCorrect: false },
          { id: 'opt-d', text: 'Chỉ sử dụng interface thay vì class.', isCorrect: false },
        ],
        explanation: 'Thay vì viết: `if (ticket.getStatus() == AVAILABLE) { ticket.setStatus(HELD); }` (Ask), hãy viết: `ticket.holdForCheckout(duration);` (Tell). Khi đó toàn bộ quy tắc kiểm tra nằm gọn gàng bên trong class Ticket.',
        referencePath: '01-java-core/01-oop-class-object/encapsulation.md',
        tags: ['Encapsulation', 'Tell Don’t Ask', 'Clean Architecture'],
        difficulty: 'medium',
      },
      {
        id: 'mod5-q3',
        milestoneId: 'module-05',
        moduleId: 'module-05',
        title: 'Tại sao Constructor trong Java KHÔNG THỂ khai báo với các từ khóa `static`, `final` hay `abstract`?',
        options: [
          { id: 'opt-a', text: 'Vì Constructor chỉ được phép có từ khóa public.', isCorrect: false },
          { id: 'opt-b', text: 'Constructor thuộc về vòng đời cấp phát instance cụ thể trên Heap nên không thể là `static`; constructor vốn không được kế thừa nên không thể override (do đó `final` vô nghĩa); và constructor phải có thân hàm để khởi tạo vùng nhớ nên không thể là `abstract`.', isCorrect: true },
          { id: 'opt-c', text: 'Vì các từ khóa này chỉ dành riêng cho Interface.', isCorrect: false },
          { id: 'opt-d', text: 'Do hạn chế của hệ điều hành 64-bit.', isCorrect: false },
        ],
        explanation: 'Constructor chỉ dùng để tạo và khởi tạo instance. Nó không thể là static (vì static thuộc về class), không thể là abstract (vì không thể để class con override), và không thể final (vì không ai có thể override nó).',
        referencePath: '01-java-core/01-oop-class-object/inheritance.md',
        tags: ['Constructor', 'Java Keywords', 'OOP'],
        difficulty: 'hard',
      },
    ],
  },
  {
    id: 'module-06',
    code: '06',
    name: 'OOP nâng cao — Kế thừa, Đa hình & Trừu tượng',
    title: '06. OOP nâng cao — Kế thừa, Đa hình & Trừu tượng',
    iconName: 'Layers',
    description: 'Inheritance, Abstraction, Polymorphism, Diamond Problem, vtable, Composition over Inheritance, LSP.',
    folderPath: '01-java-core/01-oop-class-object',
    questions: [
      {
        id: 'mod6-q1',
        milestoneId: 'module-06',
        moduleId: 'module-06',
        title: 'Nguyên tắc thiết kế "Composition over Inheritance" (Ưu tiên kết hợp hơn kế thừa) được khuyến nghị vì lý do hàng đầu nào?',
        options: [
          { id: 'opt-a', text: 'Vì kế thừa tạo ra khớp nối quá chặt (Tight Coupling) và dễ dẫn đến thảm họa "Fragile Base Class" (sửa class cha làm vỡ logic class con); trong khi Composition giúp khớp nối lỏng và dễ thay đổi cài đặt tại runtime.', isCorrect: true },
          { id: 'opt-b', text: 'Vì từ khóa extends đã bị deprecated trong Java 21.', isCorrect: false },
          { id: 'opt-c', text: 'Vì kế thừa làm tăng gấp đôi dung lượng file .class.', isCorrect: false },
          { id: 'opt-d', text: 'Vì Composition chỉ chạy được với Interface.', isCorrect: false },
        ],
        explanation: 'Kế thừa là liên kết cứng ở compile-time. Khi class cha thay đổi chi tiết nội bộ, hành vi của class con có thể bị sai lệch ngoài ý muốn. Composition (HAS-A) kết hợp Dependency Injection cho phép linh hoạt hoán đổi hành vi và kiểm thử dễ dàng hơn rất nhiều.',
        referencePath: '01-java-core/01-oop-class-object/inheritance.md',
        tags: ['Composition', 'Inheritance', 'Design Principles'],
        difficulty: 'medium',
      },
      {
        id: 'mod6-q2',
        milestoneId: 'module-06',
        moduleId: 'module-06',
        title: 'Cơ chế bên dưới của JVM giúp thực thi tính Đa hình lúc chạy (Runtime Polymorphism / Dynamic Binding) là gì?',
        options: [
          { id: 'opt-a', text: 'JVM duyệt file mã nguồn .java bằng biểu thức chính quy (Regex).', isCorrect: false },
          { id: 'opt-b', text: 'JVM sử dụng Bảng phương thức ảo (Virtual Method Table - vtable) chứa các con trỏ hàm, tra cứu dựa trên kiểu đối tượng thực tế trên vùng nhớ Heap lúc runtime để gọi đúng phương thức được override.', isCorrect: true },
          { id: 'opt-c', text: 'JVM gửi truy vấn xuống database để hỏi kiểu dữ liệu.', isCorrect: false },
          { id: 'opt-d', text: 'Do trình biên dịch javac gán cứng địa chỉ hàm ngay lúc compile.', isCorrect: false },
        ],
        explanation: 'Mỗi class trong JVM có một vtable. Khi class con override method, con trỏ tương ứng trong vtable trỏ tới bytecode của class con. Khi gọi hàm trên tham chiếu cha trỏ vào con, JVM tra cứu vtable của instance thật trên Heap để nhảy tới method của con.',
        referencePath: '01-java-core/01-oop-class-object/polymorphism.md',
        tags: ['Polymorphism', 'vtable', 'JVM Internal'],
        difficulty: 'hard',
      },
    ],
  },
  {
    id: 'module-07',
    code: '07',
    name: 'Collections Framework & Generics',
    title: '07. Collections Framework & Generics',
    iconName: 'ListOrdered',
    description: 'List, Set, Map, HashMap vs ConcurrentHashMap, equals & hashCode, Generics Wildcards, CopyOnWriteArrayList.',
    folderPath: '01-java-core/04-collections-framework.md',
    questions: [
      {
        id: 'mod7-q1',
        milestoneId: 'module-07',
        moduleId: 'module-07',
        title: 'Sự khác biệt quan trọng giữa `HashMap` và `ConcurrentHashMap` trong Java là gì?',
        options: [
          { id: 'opt-a', text: '`HashMap` cho phép đa luồng truy cập cùng lúc an toàn.', isCorrect: false },
          { id: 'opt-b', text: '`ConcurrentHashMap` an toàn luồng (Thread-safe) nhờ cơ chế khóa phân đoạn (Lock Striping / CAS + synchronized trên từng bucket node), không khóa toàn bộ bảng như `Hashtable` hay `Collections.synchronizedMap()`.', isCorrect: true },
          { id: 'opt-c', text: '`ConcurrentHashMap` cho phép lưu key `null`.', isCorrect: false },
          { id: 'opt-d', text: '`HashMap` có thứ tự sắp xếp theo chữ cái còn `ConcurrentHashMap` thì không.', isCorrect: false },
        ],
        explanation: 'ConcurrentHashMap tối ưu hóa hiệu năng cao trong môi trường đa luồng: nó dùng CAS (Compare-And-Swap) và chỉ đồng bộ hóa trên từng Node hoặc Bucket đầu tiên, cho phép nhiều luồng cùng đọc và ghi đồng thời mà không nghẽn.',
        referencePath: '01-java-core/04-collections-framework.md',
        tags: ['Java Core', 'Collections', 'ConcurrentHashMap'],
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'module-08',
    code: '08',
    name: 'Xử lý Ngoại lệ (Exception Handling)',
    title: '08. Xử lý Ngoại lệ (Exception Handling)',
    iconName: 'AlertTriangle',
    description: 'Checked vs Unchecked Exception, try-with-resources, AutoCloseable, Best Practices, Custom Exceptions.',
    folderPath: '01-java-core/03-exception-handling.md',
    questions: [
      {
        id: 'mod8-q1',
        milestoneId: 'module-08',
        moduleId: 'module-08',
        title: 'Tại sao tính năng `try-with-resources` (Java 7+) lại được coi là tiêu chuẩn bắt buộc khi làm việc với `Connection`, `InputStream` hay `FileReader`?',
        options: [
          { id: 'opt-a', text: 'Vì nó tự động gọi phương thức `.close()` của các đối tượng triển khai `AutoCloseable` kể cả khi có ngoại lệ xảy ra, loại bỏ hoàn toàn nguy cơ rò rỉ tài nguyên (Resource Leak).', isCorrect: true },
          { id: 'opt-b', text: 'Vì nó làm tăng tốc độ đọc file nhanh gấp 10 lần.', isCorrect: false },
          { id: 'opt-c', text: 'Vì khối finally bị cấm sử dụng trong Spring Boot.', isCorrect: false },
          { id: 'opt-d', text: 'Vì try-with-resources tự động nén dung lượng file.', isCorrect: false },
        ],
        explanation: 'Trước Java 7, việc đóng tài nguyên trong finally rất rườm rà và dễ nuốt mất exception ban đầu. try-with-resources tự động đóng tài nguyên theo thứ tự ngược lại và hỗ trợ Suppressed Exceptions chuẩn mực.',
        referencePath: '01-java-core/03-exception-handling.md',
        tags: ['Exceptions', 'Try-With-Resources', 'Resource Management'],
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'module-09',
    code: '09',
    name: 'Java Time API & Stream API',
    title: '09. Java Time API & Stream API',
    iconName: 'Clock',
    description: 'Instant, OffsetDateTime, Duration, Stream Operations (map, filter, flatMap), Collectors, Pure Functions.',
    folderPath: '01-java-core/06-stream-api-lambda.md',
    questions: [
      {
        id: 'mod9-q1',
        milestoneId: 'module-09',
        moduleId: 'module-09',
        title: 'Khi lưu trữ thời gian diễn ra sự kiện vé (Event Date) trong hệ thống phục vụ người dùng quốc tế ở nhiều múi giờ khác nhau, kiểu dữ liệu nào trong Java Time API là chuẩn mực nhất?',
        options: [
          { id: 'opt-a', text: '`java.util.Date` (chuẩn cũ).', isCorrect: false },
          { id: 'opt-b', text: '`Instant` (thời điểm UTC toàn cầu) hoặc `OffsetDateTime` (UTC có kèm độ lệch múi giờ ISO-8601), tương thích chuẩn với kiểu `TIMESTAMP WITH TIME ZONE` trong PostgreSQL.', isCorrect: true },
          { id: 'opt-c', text: '`LocalDateTime` không kèm múi giờ.', isCorrect: false },
          { id: 'opt-d', text: 'Lưu dưới dạng chuỗi String "dd/MM/yyyy".', isCorrect: false },
        ],
        explanation: 'LocalDateTime không chứa thông tin múi giờ, dẫn đến sự kiện diễn ra lúc 8h sáng ở Hà Nội sẽ bị hiểu nhầm là 8h sáng ở New York. Luôn lưu Instant hoặc OffsetDateTime để biểu diễn thời điểm tuyệt đối trên dòng thời gian.',
        referencePath: '01-java-core/08-java-time-api.md',
        tags: ['Java Time', 'DateTime', 'PostgreSQL', 'UTC'],
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'module-10',
    code: '10',
    name: 'Đa luồng & Concurrency Basics',
    title: '10. Đa luồng & Concurrency Basics',
    iconName: 'Cpu',
    description: 'Thread Lifecycle, Race Condition, synchronized, ReentrantLock, Virtual Threads Java 21, Thread Pool.',
    folderPath: '01-java-core/10-concurrency-basics.md',
    questions: [
      {
        id: 'mod10-q1',
        milestoneId: 'module-10',
        moduleId: 'module-10',
        title: 'Trong Java 21, Virtual Threads (Project Loom) mang lại bước đột phá lớn nhất ở khía cạnh nào cho ứng dụng web phục vụ hàng triệu người đặt vé?',
        options: [
          { id: 'opt-a', text: 'Tăng tốc độ tính toán CPU (CPU-bound) nhanh hơn 100 lần.', isCorrect: false },
          { id: 'opt-b', text: 'Cho phép tạo hàng triệu luồng siêu nhẹ do JVM quản lý với chi phí bộ nhớ cực thấp (~vài KB so với 1MB của Platform Thread), tối ưu hóa đột biến cho các tác vụ I/O-bound (chờ DB, gọi REST API).', isCorrect: true },
          { id: 'opt-c', text: 'Thay thế hoàn toàn ngôn ngữ Java bằng C++.', isCorrect: false },
          { id: 'opt-d', text: 'Chỉ hoạt động khi chạy trên hệ điều hành Linux.', isCorrect: false },
        ],
        explanation: 'Virtual Threads được JVM quản lý độc lập với OS threads. Khi gặp blocking I/O, JVM unmount virtual thread khỏi carrier thread để thread đó phục vụ việc khác, giúp tăng throughput khủng khiếp cho các ứng dụng web truyền thống.',
        referencePath: '01-java-core/10-concurrency-basics.md',
        tags: ['Java 21', 'Virtual Threads', 'Concurrency'],
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'module-11',
    code: '11',
    name: 'Spring Boot Core & Database JPA',
    title: '11. Spring Boot Core & Database JPA',
    iconName: 'Server',
    description: 'IoC Container, Constructor Injection, Bean Scope, Hibernate Dirty Checking, N+1 Query, Flyway.',
    folderPath: '04-database-jpa',
    questions: [
      {
        id: 'mod11-q1',
        milestoneId: 'module-11',
        moduleId: 'module-11',
        title: 'Cơ chế Dirty Checking của Hibernate trong Spring Data JPA hoạt động theo nguyên lý nào?',
        options: [
          { id: 'opt-a', text: 'Hibernate quét toàn bộ database mỗi 5 giây để tìm dòng bị sửa.', isCorrect: false },
          { id: 'opt-b', text: 'Hibernate lưu bản chụp (snapshot) của entity khi nạp vào persistence context. Khi kết thúc `@Transactional`, Hibernate tự đối chiếu trạng thái hiện tại với snapshot, phát hiện thay đổi và tự động bắn lệnh SQL UPDATE mà không cần gọi `repository.save()`.', isCorrect: true },
          { id: 'opt-c', text: 'Bắt buộc lập trình viên phải gọi phương thức saveAndFlush() sau mỗi lần set giá trị.', isCorrect: false },
          { id: 'opt-d', text: 'Dirty Checking chỉ hoạt động với database MySQL.', isCorrect: false },
        ],
        explanation: 'Trong phạm vi một `@Transactional`, các entity nạp lên thuộc trạng thái Managed. Nhờ Dirty Checking, Hibernate tự động đối chiếu snapshot và bắn `UPDATE` khi flush/commit mà không cần gọi `repository.save()`.',
        referencePath: '04-database-jpa/03-entity-lifecycle-dirty-checking.md',
        tags: ['JPA', 'Dirty Checking', 'Hibernate'],
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'module-12',
    code: '12',
    name: 'Tư Duy Production & Docker',
    title: '12. Tư Duy Production & Docker',
    iconName: 'Award',
    description: 'Docker Named Volumes, Soft Delete vs Hard Delete, Idempotency, Audit Trail, Resilience.',
    folderPath: '12-production-mindset',
    questions: [
      {
        id: 'mod12-q1',
        milestoneId: 'module-12',
        moduleId: 'module-12',
        title: 'Trong chuẩn thiết kế Docker Compose cho hạ tầng database, tại sao việc gán tường minh `name: database_postgres_data` cho volume lại quan trọng?',
        codeSnippet: `volumes:
  postgres_data:
    driver: local
    name: database_postgres_data`,
        language: 'yaml',
        options: [
          { id: 'opt-a', text: 'Cố định chính xác tên volume trên Docker host, tránh việc Docker Compose tự động thêm tiền tố theo tên thư mục cha (`<folder_name>_postgres_data`); đảm bảo dữ liệu database không bao giờ bị trỏ nhầm sang volume khác khi chạy từ các thư mục khác nhau.', isCorrect: true },
          { id: 'opt-b', text: 'Cho phép Docker tự động nén dữ liệu volume theo chuẩn ZIP.', isCorrect: false },
          { id: 'opt-c', text: 'Bắt buộc máy chủ Linux phải mount volume vào ổ cứng SSD thay vì HDD.', isCorrect: false },
          { id: 'opt-d', text: 'Giới hạn dung lượng RAM của container PostgreSQL không vượt quá 2GB.', isCorrect: false },
        ],
        explanation: 'Mặc định Docker Compose đặt tên volume dạng `<project_name>_<volume_name>`. Nếu lập trình viên chạy lệnh compose ở các thư mục khác nhau, Docker sẽ tạo ra các volume khác nhau làm người dùng tưởng dữ liệu bị biến mất. Khai báo thuộc tính `name` giúp định danh volume tuyệt đối.',
        referencePath: 'database/docker-compose.yml',
        tags: ['Docker', 'DevOps', 'Docker Compose', 'Production'],
        difficulty: 'medium',
      },
    ],
  },
];
