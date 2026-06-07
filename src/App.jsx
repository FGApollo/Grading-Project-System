import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DefenseBoards from './pages/DefenseBoards';
import DefenseSessions from './pages/DefenseSessions';
import Permissions from './pages/Permissions';
import SecondReview from './pages/SecondReview';
import GroupsTopics from './pages/GroupsTopics';


// A helper placeholder component for tabs not yet fully built
function PlaceholderView({ title, description }) {
  return (
    <div className="placeholder-view-wrapper" style={{ width: '100%' }}>
      <div className="boards-header-action">
        <div className="boards-header-info">
          <h1>{title}</h1>
          <p className="header-subtitle">Tính năng thuộc phần mềm quản lý chấm đồ án tốt nghiệp.</p>
        </div>
      </div>
      <div className="placeholder-view">
        <h2>{title} View</h2>
        <p>{description || 'Trang này đang được phát triển theo kịch bản vận hành của hệ thống.'}</p>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('permissions'); // Active 'permissions' tab by default to display the new view!

  // Central State: Initial list of 12 boards matching "Showing 1 to 3 of 12 boards"
  const [boards, setBoards] = useState([
    {
      id: 'HB-24A-01',
      size: '5 Members',
      president: { initials: 'JD', name: 'Dr. Jane Doe', color: '#0f172a' },
      groups: 4,
      status: 'active',
      secretary: 'Prof. Alice Johnson',
      member1: 'Dr. Emily Davis',
      member2: 'Dr. Robert Chen'
    },
    {
      id: 'HB-24A-02',
      size: '3 Members',
      president: { initials: 'MS', name: 'Prof. Mark Smith', color: '#2563eb' },
      groups: 2,
      status: 'pending',
      secretary: 'Dr. Lisa Wong',
      member1: 'Dr. James Wilson',
      member2: ''
    },
    {
      id: 'HB-23B-15',
      size: '5 Members',
      president: { initials: 'AL', name: 'Dr. Alan Lee', color: '#ef4444' },
      groups: 5,
      status: 'closed',
      secretary: 'Dr. Sarah Jenkins',
      member1: 'Dr. David Clark',
      member2: 'Prof. Tom Cruise'
    },
    {
      id: 'HB-24A-03',
      size: '5 Members',
      president: { initials: 'JD', name: 'Dr. Jane Doe', color: '#0f172a' },
      groups: 3,
      status: 'active',
      secretary: 'Prof. Alice Johnson',
      member1: 'Dr. Emily Davis',
      member2: 'Dr. Robert Chen'
    },
    {
      id: 'HB-24A-04',
      size: '3 Members',
      president: { initials: 'MS', name: 'Prof. Mark Smith', color: '#2563eb' },
      groups: 1,
      status: 'pending',
      secretary: 'Dr. Lisa Wong',
      member1: 'Dr. James Wilson',
      member2: ''
    },
    {
      id: 'HB-24A-05',
      size: '5 Members',
      president: { initials: 'AL', name: 'Dr. Alan Lee', color: '#ef4444' },
      groups: 4,
      status: 'active',
      secretary: 'Dr. Sarah Jenkins',
      member1: 'Dr. David Clark',
      member2: 'Prof. Tom Cruise'
    },
    {
      id: 'HB-23B-16',
      size: '3 Members',
      president: { initials: 'SJ', name: 'Dr. Sarah Jenkins', color: '#16a34a' },
      groups: 3,
      status: 'closed',
      secretary: 'Dr. Alan Lee',
      member1: 'Dr. David Clark',
      member2: ''
    },
    {
      id: 'HB-23B-17',
      size: '5 Members',
      president: { initials: 'DC', name: 'Dr. David Clark', color: '#8b5cf6' },
      groups: 2,
      status: 'closed',
      secretary: 'Dr. Alan Lee',
      member1: 'Dr. Sarah Jenkins',
      member2: 'Prof. Tom Cruise'
    },
    {
      id: 'HB-24A-06',
      size: '3 Members',
      president: { initials: 'ED', name: 'Dr. Emily Davis', color: '#ea580c' },
      groups: 2,
      status: 'pending',
      secretary: 'Prof. Alice Johnson',
      member1: 'Dr. Jane Doe',
      member2: ''
    },
    {
      id: 'HB-24A-07',
      size: '5 Members',
      president: { initials: 'RC', name: 'Dr. Robert Chen', color: '#0d9488' },
      groups: 5,
      status: 'active',
      secretary: 'Prof. Alice Johnson',
      member1: 'Dr. Jane Doe',
      member2: 'Dr. Emily Davis'
    },
    {
      id: 'HB-24B-01',
      size: '3 Members',
      president: { initials: 'LW', name: 'Dr. Lisa Wong', color: '#db2777' },
      groups: 3,
      status: 'pending',
      secretary: 'Prof. Mark Smith',
      member1: 'Dr. James Wilson',
      member2: ''
    },
    {
      id: 'HB-24B-02',
      size: '5 Members',
      president: { initials: 'JW', name: 'Dr. James Wilson', color: '#4f46e5' },
      groups: 4,
      status: 'active',
      secretary: 'Prof. Mark Smith',
      member1: 'Dr. Lisa Wong',
      member2: 'Dr. Robert Chen'
    }
  ]);

  const [groups, setGroups] = useState([
    { id: 'GRP-24-001', title: 'Xây dựng website bán hàng thời trang', fullTitle: 'Xây dựng website bán hàng thời trang trực tuyến tích hợp cổng thanh toán', members: 3, assignedBoard: 'HB-24A-01', firstScore: '7.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-002', title: 'Hệ thống AI gợi ý hành trình du lịch', fullTitle: 'Hệ thống AI gợi ý hành trình du lịch thông minh dựa trên sở thích cá nhân', members: 4, assignedBoard: 'HB-24A-01', firstScore: '8.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-003', title: 'Phân tích cảm xúc văn bản tiếng Việt', fullTitle: 'Phân tích cảm xúc văn bản tiếng Việt trên mạng xã hội bằng Deep Learning', members: 3, assignedBoard: 'HB-24A-01', firstScore: '6.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-004', title: 'Ứng dụng IoT giám sát nông nghiệp sạch', fullTitle: 'Ứng dụng IoT giám sát và điều khiển nông nghiệp sạch tự động', members: 3, assignedBoard: 'HB-24A-01', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-005', title: 'Hệ thống định danh khách hàng eKYC', fullTitle: 'Hệ thống định danh khách hàng trực tuyến eKYC dựa trên sinh trắc học', members: 2, assignedBoard: 'HB-24A-02', firstScore: '8.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-006', title: 'Phần mềm quản lý khách sạn thông minh', fullTitle: 'Phần mềm quản lý hoạt động khách sạn thông minh quy mô vừa', members: 3, assignedBoard: 'HB-24A-02', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-007', title: 'Ứng dụng AR hỗ trợ học tập trực quan', fullTitle: 'Ứng dụng thực tế tăng cường AR hỗ trợ học tập hình học không gian', members: 3, assignedBoard: 'HB-23B-15', firstScore: '7.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-008', title: 'Hệ thống giám sát hành trình xe buýt', fullTitle: 'Hệ thống giám sát hành trình và cảnh báo tốc độ xe buýt thời gian thực', members: 2, assignedBoard: 'HB-23B-15', firstScore: '8.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-009', title: 'Ứng dụng Blockchain quản lý học bạ', fullTitle: 'Ứng dụng Blockchain đảm bảo tính toàn vẹn dữ liệu trong quản lý học bạ', members: 3, assignedBoard: 'HB-23B-15', firstScore: '6.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-010', title: 'Website đấu giá trực tuyến bảo mật cao', fullTitle: 'Website đấu giá trực tuyến đa sản phẩm tích hợp bảo mật OTP', members: 4, assignedBoard: 'HB-23B-15', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-011', title: 'Hệ thống phân loại rác thải bằng AI', fullTitle: 'Hệ thống phân loại rác thải sinh hoạt tự động sử dụng AI camera', members: 3, assignedBoard: 'HB-23B-15', firstScore: '8.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-012', title: 'Hệ thống đặt lịch khám bệnh trực tuyến', fullTitle: 'Hệ thống đặt lịch khám bệnh và tra cứu kết quả xét nghiệm trực tuyến', members: 3, assignedBoard: 'HB-24A-03', firstScore: '3.5', secondReviewBoard: 'HĐ Lần 2: HĐ.01 - Thầy Nguyễn Văn Hải', secondScore: null, status: 'assigned_second' },
    { id: 'GRP-24-013', title: 'Website tuyển dụng IT thông minh', fullTitle: 'Website tuyển dụng nhân sự IT thông minh lọc CV tự động', members: 3, assignedBoard: 'HB-24A-03', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-014', title: 'Ứng dụng định vị người già mất trí nhớ', fullTitle: 'Ứng dụng định vị giám sát an toàn cho người già mất trí nhớ', members: 2, assignedBoard: 'HB-24A-03', firstScore: '7.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-015', title: 'Thiết kế hệ thống điện mặt trời thông minh', fullTitle: 'Thiết kế và mô phỏng hệ thống điện mặt trời thông minh hộ gia đình', members: 3, assignedBoard: 'HB-24A-04', firstScore: '8.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-016', title: 'Nhận diện biển số xe bằng thị giác máy', fullTitle: 'Hệ thống nhận diện biển số xe ra vào tự động bằng thị giác máy', members: 4, assignedBoard: 'HB-24A-05', firstScore: '7.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-017', title: 'Ứng dụng đặt món ăn giao hàng nhanh', fullTitle: 'Ứng dụng di động đặt món ăn và gọi tài xế giao hàng chặng cuối', members: 3, assignedBoard: 'HB-24A-05', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-018', title: 'Hệ thống phát hiện tài liệu đạo văn', fullTitle: 'Hệ thống phát hiện tài liệu đạo văn sử dụng so khớp chuỗi thông minh', members: 3, assignedBoard: 'HB-24A-05', firstScore: '8.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-019', title: 'Phần mềm tối ưu hóa tuyến đường giao hàng', fullTitle: 'Phần mềm tối ưu hóa tuyến đường và chi phí giao hàng đa điểm', members: 2, assignedBoard: 'HB-24A-05', firstScore: '8.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-020', title: 'Phân tích dữ liệu người dùng mạng xã hội', fullTitle: 'Phân tích hành vi dữ liệu người dùng để tối ưu hóa chiến dịch Marketing', members: 3, assignedBoard: 'HB-23B-16', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-021', title: 'Ứng dụng chat bảo mật đầu-cuối', fullTitle: 'Ứng dụng nhắn tin tức thời tích hợp mã hóa bảo mật đầu-cuối', members: 3, assignedBoard: 'HB-23B-16', firstScore: '7.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-022', title: 'Hệ thống quản lý thư viện số', fullTitle: 'Hệ thống quản lý thư viện số lưu trữ và mượn sách trực tuyến', members: 3, assignedBoard: 'HB-23B-16', firstScore: '8.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-023', title: 'Website thương mại điện tử đa phân khúc', fullTitle: 'Website thương mại điện tử đa phân khúc tích hợp chatbot AI tư vấn', members: 3, assignedBoard: 'HB-23B-17', firstScore: '8.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-024', title: 'Ứng dụng hỗ trợ học ngoại ngữ du khách', fullTitle: 'Ứng dụng di động hỗ trợ học giao tiếp ngoại ngữ cấp tốc cho du khách', members: 2, assignedBoard: 'HB-23B-17', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-025', title: 'Hệ thống quản lý phòng tập gym & yoga', fullTitle: 'Hệ thống quản lý khách hàng, lịch tập phòng gym và yoga', members: 3, assignedBoard: 'HB-24A-06', firstScore: '7.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-026', title: 'Website so sánh giá sản phẩm tự động', fullTitle: 'Website cào dữ liệu và so sánh giá sản phẩm tự động từ các trang TMĐT', members: 3, assignedBoard: 'HB-24A-06', firstScore: '8.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-027', title: 'Website quản lý bất động sản trực tuyến', fullTitle: 'Website đăng tin, tìm kiếm và quản lý giao dịch bất động sản', members: 4, assignedBoard: 'HB-24A-07', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-028', title: 'Hệ thống dự đoán giá cổ phiếu qua tin tức', fullTitle: 'Hệ thống dự đoán biến động giá cổ phiếu dựa trên phân tích tin tức tài chính', members: 3, assignedBoard: 'HB-24A-07', firstScore: '7.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-029', title: 'Ứng dụng quản lý lịch học học sinh', fullTitle: 'Ứng dụng di động quản lý lịch học, làm bài tập và nhắc nhở học sinh', members: 3, assignedBoard: 'HB-24A-07', firstScore: '8.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-030', title: 'Hệ thống lọc bình luận tiêu cực trực tuyến', fullTitle: 'Hệ thống tự động phát hiện và ẩn các bình luận toxic trên livestream', members: 3, assignedBoard: 'HB-24A-07', firstScore: '8.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-031', title: 'Ứng dụng gọi thợ sửa nhà tiện ích', fullTitle: 'Ứng dụng kết nối khách hàng có nhu cầu sửa chữa nhà cửa với thợ lành nghề', members: 4, assignedBoard: 'HB-24A-07', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-032', title: 'Phần mềm chấm công vân tay tích hợp camera', fullTitle: 'Phần mềm chấm công bằng vân tay tích hợp đối soát camera khuôn mặt', members: 3, assignedBoard: 'HB-24B-01', firstScore: '7.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-033', title: 'Website chia sẻ tài liệu ôn thi đại học', fullTitle: 'Website chia sẻ và tải tài liệu ôn thi THPT Quốc gia phân loại theo khối', members: 3, assignedBoard: 'HB-24B-01', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-034', title: 'Ứng dụng quản lý chi tiêu nhóm du lịch', fullTitle: 'Ứng dụng di động quản lý thu chi, phân chia hóa đơn khi đi du lịch nhóm', members: 2, assignedBoard: 'HB-24B-01', firstScore: '8.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-035', title: 'Hệ thống phát hiện gian lận thi cử qua webcam', fullTitle: 'Hệ thống AI giám sát và phát hiện bất thường khi thi cử trực tuyến', members: 4, assignedBoard: 'HB-24B-02', firstScore: '8.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-036', title: 'Ứng dụng tra cứu thông tin thuốc và nhà thuốc', fullTitle: 'Ứng dụng di động tra cứu thành phần thuốc và bản đồ nhà thuốc gần nhất', members: 3, assignedBoard: 'HB-24B-02', firstScore: '7.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-037', title: 'Website quản lý rạp chiếu phim trực tuyến', fullTitle: 'Website giới thiệu, đặt vé và quản lý rạp chiếu phim thông minh', members: 3, assignedBoard: 'HB-24B-02', firstScore: '7.5', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    { id: 'GRP-24-038', title: 'Hệ thống đo nồng độ cồn và cảnh báo tài xế', fullTitle: 'Hệ thống IoT phát hiện và cảnh báo tài xế có nồng độ cồn vượt mức', members: 2, assignedBoard: 'HB-24B-02', firstScore: '8.0', secondReviewBoard: '', secondScore: null, status: 'scheduled' },
    // Failed 1st review groups (status failed_first)
    { id: 'GRP-24-081', title: 'Hệ thống phân tích dữ liệu giao thông...', fullTitle: 'Hệ thống phân tích dữ liệu giao thông thời gian thực sử dụng công nghệ AI và IoT', members: 3, assignedBoard: 'HB-24A-04', firstScore: '4.5', secondReviewBoard: '', secondScore: null, status: 'failed_first' },
    { id: 'GRP-24-112', title: 'Ứng dụng quản lý tài chính cá nhân...', fullTitle: 'Ứng dụng quản lý tài chính cá nhân tích hợp AI dự đoán chi tiêu thông minh', members: 2, assignedBoard: 'HB-24A-02', firstScore: '3.0', secondReviewBoard: '', secondScore: null, status: 'failed_first' },
    { id: 'GRP-24-055', title: 'Nghiên cứu giải pháp Blockchain...', fullTitle: 'Nghiên cứu và triển khai giải pháp Blockchain trong truy xuất nguồn gốc chuỗi cung ứng dược phẩm', members: 4, assignedBoard: 'HB-23B-17', firstScore: 'Vắng mặt', secondReviewBoard: '', secondScore: null, status: 'failed_first' },
    // Completed 2nd review groups
    { id: 'GRP-24-041', title: 'Ứng dụng học từ vựng tiếng Anh game...', fullTitle: 'Ứng dụng di động học từ vựng tiếng Anh qua trò chơi tương tác cho trẻ em tiểu học', members: 2, assignedBoard: 'HB-24A-03', firstScore: '4.0', secondReviewBoard: 'HĐ Lần 2: HĐ.03 - Thầy Lê Quang Minh', secondScore: '7.5/10', status: 'completed_second' },
    { id: 'GRP-24-077', title: 'Nghiên cứu mô hình ngôn ngữ lớn LLM...', fullTitle: 'Nghiên cứu và tinh chỉnh mô hình ngôn ngữ lớn tối ưu cho bài toán tóm tắt văn bản tiếng Việt', members: 4, assignedBoard: 'HB-24A-07', firstScore: '4.5', secondReviewBoard: 'HĐ Lần 2: HĐ.02 - Cô Lê Thị Lan', secondScore: '8.0/10', status: 'completed_second' },
    // Unscheduled groups
    { id: 'GRP-24-100', title: 'Nghiên cứu thị trường bất động sản qua AI', fullTitle: 'Nghiên cứu thị trường bất động sản thông qua dữ liệu mạng xã hội và học máy', members: 3, assignedBoard: '', firstScore: null, secondReviewBoard: '', secondScore: null, status: 'unscheduled' },
    { id: 'GRP-24-101', title: 'Hệ thống quản lý phòng trọ trực tuyến thông minh', fullTitle: 'Hệ thống quản lý phòng trọ trực tuyến thông minh kết nối chủ trọ và người thuê', members: 2, assignedBoard: '', firstScore: null, secondReviewBoard: '', secondScore: null, status: 'unscheduled' },
    { id: 'GRP-24-102', title: 'Ứng dụng đặt món ăn tự động cho nhà hàng lớn', fullTitle: 'Ứng dụng đặt món ăn tự động tại bàn thông qua quét mã QR cho nhà hàng lớn', members: 3, assignedBoard: '', firstScore: null, secondReviewBoard: '', secondScore: null, status: 'unscheduled' },
    { id: 'GRP-24-103', title: 'Hệ thống phát hiện lỗi sản phẩm industrial', fullTitle: 'Hệ thống phát hiện lỗi sản phẩm công nghiệp dùng thị giác máy trên băng chuyền', members: 4, assignedBoard: '', firstScore: null, secondReviewBoard: '', secondScore: null, status: 'unscheduled' },
    { id: 'GRP-24-105', title: 'Xây dựng chatbot hỗ trợ tư vấn học tập', fullTitle: 'Xây dựng chatbot AI hỗ trợ trả lời thắc mắc và tư vấn học tập cho sinh viên', members: 3, assignedBoard: '', firstScore: null, secondReviewBoard: '', secondScore: null, status: 'unscheduled' },
    { id: 'GRP-24-106', title: 'Hệ thống tưới cây tự động tiết kiệm năng lượng', fullTitle: 'Thiết kế hệ thống tưới tiêu nông nghiệp tự động tiết kiệm năng lượng bằng pin mặt trời', members: 2, assignedBoard: '', firstScore: null, secondReviewBoard: '', secondScore: null, status: 'unscheduled' },
    { id: 'GRP-24-107', title: 'Ứng dụng ví điện tử hỗ trợ thanh toán một chạm', fullTitle: 'Ứng dụng ví điện tử hỗ trợ thanh toán một chạm NFC bảo mật cao', members: 3, assignedBoard: '', firstScore: null, secondReviewBoard: '', secondScore: null, status: 'unscheduled' },
    { id: 'GRP-24-108', title: 'Phần mềm quản lý nhân sự khuôn mặt thông minh', fullTitle: 'Phần mềm quản lý nhân sự và chấm công bằng nhận diện khuôn mặt AI', members: 3, assignedBoard: '', firstScore: null, secondReviewBoard: '', secondScore: null, status: 'unscheduled' }
  ]);

  // Statistics offsets for dynamic dashboard integration
  const baseBoardsCount = 24;
  const initialBoardsLength = 12;
  const dynamicTotalBoards = baseBoardsCount + (boards.length - initialBoardsLength);

  const baseGroupsCount = 120;
  // Initial group sum of the 12 boards is 38
  const initialGroupsSum = 38;
  const currentGroupsSum = boards.reduce((acc, curr) => acc + curr.groups, 0);
  const dynamicTotalGroups = baseGroupsCount + (currentGroupsSum - initialGroupsSum);

  // Monitor boards (today's active sessions shown on Dashboard)
  const monitorBoards = [
    { id: 'HĐ-001', president: 'Nguyễn Văn A', status: 'active' },
    { id: 'HĐ-002', president: 'Trần Thị B', status: 'closed' },
    { id: 'HĐ-003', president: 'Chưa có dữ liệu', status: 'pending' }
  ];

  // Handlers for Boards page
  const handleAddBoard = (newBoard, assignedGroupIds = []) => {
    setBoards(prev => [{ ...newBoard, groups: assignedGroupIds.length }, ...prev]);
    if (assignedGroupIds.length > 0) {
      setGroups(prev => prev.map(g => {
        if (assignedGroupIds.includes(g.id)) {
          return { ...g, assignedBoard: newBoard.id };
        }
        return g;
      }));
    }
  };

  const handleEditBoard = (updatedBoard, assignedGroupIds = []) => {
    setBoards(prev => prev.map(b => b.id === updatedBoard.id ? { ...updatedBoard, groups: assignedGroupIds.length } : b));
    setGroups(prev => prev.map(g => {
      if (assignedGroupIds.includes(g.id)) {
        return { ...g, assignedBoard: updatedBoard.id, status: g.status === 'unscheduled' ? 'scheduled' : g.status };
      } else if (g.assignedBoard === updatedBoard.id) {
        return { ...g, assignedBoard: '', status: 'unscheduled' };
      }
      return g;
    }));
  };

  const handleAssignSecondReview = (groupIds, committeeLabel) => {
    setGroups(prev => prev.map(g => {
      if (groupIds.includes(g.id)) {
        return {
          ...g,
          status: 'assigned_second',
          secondReviewBoard: `HĐ Lần 2: ${committeeLabel}`
        };
      }
      return g;
    }));
  };

  // Rendering content view dynamically
  const renderContentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={{ width: '100%' }}>
            <div className="boards-header-action" style={{ marginBottom: '24px' }}>
              <div className="boards-header-info">
                <h1>Dashboard Overview</h1>
                <p className="header-subtitle">Fall Semester 2023 - Academic Defense Period</p>
              </div>
            </div>
            <Dashboard 
              totalBoards={dynamicTotalBoards}
              totalGroups={dynamicTotalGroups}
              totalDays={5}
              monitorBoards={monitorBoards}
            />
          </div>
        );
      case 'boards':
        return (
          <DefenseBoards 
            boards={boards}
            groups={groups}
            onAddBoard={handleAddBoard}
            onEditBoard={handleEditBoard}
          />
        );
      case 'sessions':
        return (
          <DefenseSessions />
        );
      case 'semesters':
        return (
          <PlaceholderView 
            title="Academic Semesters" 
            description="Quản lý cấu trúc đào tạo: Học kỳ, loại dự án khóa luận và phân công bộ môn." 
          />
        );
      case 'groups':
        return (
          <GroupsTopics 
            groups={groups}
            boards={boards}
          />
        );
      case 'review':
        return (
          <SecondReview 
            groups={groups}
            onAssignSecondReview={handleAssignSecondReview}
          />
        );
      case 'permissions':
        return (
          <Permissions />
        );
      case 'accounts':
        return (
          <PlaceholderView 
            title="Accounts" 
            description="Quản lý danh sách tài khoản giảng viên, sinh viên đồng bộ thông qua cổng trường." 
          />
        );
      default:
        return <PlaceholderView title="Dashboard" />;
    }
  };

  const getSearchPlaceholder = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Search dashboards...';
      case 'sessions': return 'Search sessions...';
      case 'boards': return 'Search boards...';
      case 'permissions': return 'Tìm kiếm giảng viên...';
      default: return 'Search...';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Workspace */}
      <main className="main-content" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Global Top Navbar */}
        <Header searchPlaceholder={getSearchPlaceholder(activeTab)} />

        {/* Scrollable page view content area */}
        <div className="page-content-scroll" style={{ 
          padding: '32px 40px', 
          overflowY: 'auto', 
          flexGrow: 1, 
          display: 'flex', 
          width: '100%', 
          boxSizing: 'border-box' 
        }}>
          {renderContentView()}
        </div>
      </main>
    </div>
  );
}

export default App;
