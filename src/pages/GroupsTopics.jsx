import React, { useState, useMemo } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CloseIcon,
  FilterIcon
} from '../icons';

function GroupsTopics({ groups = [], boards = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Hiển thị 6 nhóm mỗi trang cho thoáng

  // Hàm chuyển đổi nhãn trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case 'unscheduled':
        return <span className="status-badge-table pending" style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>• Chưa xếp lịch</span>;
      case 'scheduled':
        return <span className="status-badge-table active">• Đã xếp lịch L1</span>;
      case 'failed_first':
        return <span className="status-badge-table pending" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>• Rớt Lần 1</span>;
      case 'assigned_second':
        return <span className="status-badge-table active" style={{ backgroundColor: '#eff6ff', color: '#1e62ff' }}>• Chờ chấm L2</span>;
      case 'completed_second':
        return <span className="status-badge-table closed" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>• Đã hoàn thành L2</span>;
      default:
        return null;
    }
  };

  // Lọc dữ liệu nhóm
  const filteredGroups = useMemo(() => {
    return groups.filter(g => {
      const matchSearch = 
        g.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (g.assignedBoard && g.assignedBoard.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (g.secondReviewBoard && g.secondReviewBoard.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchStatus = statusFilter === 'all' || g.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [groups, searchTerm, statusFilter]);

  // Phân trang
  const totalItems = filteredGroups.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const paginatedGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredGroups.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredGroups, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tiêu đề trang */}
      <div className="boards-header-action" style={{ marginBottom: '24px' }}>
        <div className="boards-header-info">
          <h1>Groups & Topics</h1>
          <p className="header-subtitle">Danh sách các nhóm sinh viên, đề tài đăng ký và phân công lịch bảo vệ chi tiết.</p>
        </div>
      </div>

      {/* Bộ lọc & Tìm kiếm */}
      <div className="filter-bar" style={{ padding: '14px 20px', marginBottom: '16px' }}>
        <div className="filter-left" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          
          <div className="search-input-wrapper" style={{ width: '420px', backgroundColor: '#f8fafc' }}>
            <input
              type="text"
              placeholder="Tìm theo Mã nhóm, Tên đề tài, Hội đồng..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                height: '38px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                paddingInline: '12px',
                fontSize: '13px',
                color: '#334155',
                backgroundColor: '#ffffff',
                outline: 'none',
                minWidth: '200px',
                cursor: 'pointer'
              }}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="unscheduled">Chưa xếp lịch</option>
              <option value="scheduled">Đã xếp lịch L1</option>
              <option value="failed_first">Rớt Lần 1</option>
              <option value="assigned_second">Chờ chấm L2</option>
              <option value="completed_second">Đã hoàn thành L2</option>
            </select>

            <button className="filter-btn-secondary" style={{ height: '38px' }}>
              <FilterIcon className="btn-icon-s" />
            </button>
          </div>

        </div>
      </div>

      {/* Hiển thị Pill bộ lọc đang active */}
      {statusFilter !== 'all' && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <div className="filter-pill">
            <span>Trạng thái: {
              statusFilter === 'unscheduled' ? 'Chưa xếp lịch' :
              statusFilter === 'scheduled' ? 'Đã xếp lịch L1' :
              statusFilter === 'failed_first' ? 'Rớt Lần 1' :
              statusFilter === 'assigned_second' ? 'Chờ chấm L2' : 'Đã hoàn thành L2'
            }</span>
            <button className="pill-close-btn" onClick={() => {
              setStatusFilter('all');
              setCurrentPage(1);
            }}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}

      {/* Bảng Dữ liệu các nhóm */}
      <div className="table-card" style={{ borderRadius: '12px' }}>
        <div className="table-responsive">
          <table className="boards-table">
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Mã Nhóm</th>
                <th style={{ minWidth: '260px' }}>Đề tài báo cáo đồ án tốt nghiệp</th>
                <th style={{ width: '80px' }}>Số SV</th>
                <th>Hội đồng lần 1</th>
                <th style={{ width: '80px', textTransform: 'uppercase' }}>Điểm L1</th>
                <th>Hội đồng lần 2</th>
                <th style={{ width: '80px', textTransform: 'uppercase' }}>Điểm L2</th>
                <th style={{ width: '150px' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {paginatedGroups.length > 0 ? (
                paginatedGroups.map((group) => {
                  // Lấy tên hội đồng 1 từ danh sách boards hoặc hiển thị mã
                  const firstBoardName = group.assignedBoard 
                    ? `HĐ: ${group.assignedBoard}` 
                    : '';

                  return (
                    <tr key={group.id}>
                      <td className="board-id-col">{group.id}</td>
                      <td style={{ fontWeight: '500', color: '#0f172a' }} title={group.fullTitle}>
                        {group.fullTitle}
                      </td>
                      <td style={{ fontWeight: '600' }}>{group.members} SV</td>
                      <td style={{ fontSize: '13px', color: '#475569' }}>
                        {firstBoardName || <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>Chưa có</span>}
                      </td>
                      <td style={{ fontWeight: '700', color: group.firstScore === 'Vắng mặt' || parseFloat(group.firstScore) < 5.0 ? '#ef4444' : '#0f172a' }}>
                        {group.firstScore || <span style={{ color: '#cbd5e1' }}>--</span>}
                      </td>
                      <td style={{ fontSize: '13px', color: '#1e62ff', fontWeight: '500' }}>
                        {group.secondReviewBoard || <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>Chưa có</span>}
                      </td>
                      <td style={{ fontWeight: '700', color: '#10b981' }}>
                        {group.secondScore || <span style={{ color: '#cbd5e1' }}>--</span>}
                      </td>
                      <td>{getStatusBadge(group.status)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="no-data-cell">
                    Không tìm thấy nhóm đồ án nào phù hợp!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang bảng */}
        <div className="table-footer">
          <span className="showing-entries-text">
            Hiển thị {startIndex}-{endIndex} của {totalItems} Nhóm
          </span>
          
          <div className="pagination-buttons">
            <button
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pNum = idx + 1;
              return (
                <button
                  key={pNum}
                  className={`pagination-btn ${currentPage === pNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pNum)}
                  style={{
                    backgroundColor: currentPage === pNum ? '#1e62ff' : '#ffffff',
                    color: currentPage === pNum ? '#ffffff' : '#475569',
                    border: currentPage === pNum ? 'none' : '1px solid #e2e8f0',
                    fontWeight: '600'
                  }}
                >
                  {pNum}
                </button>
              );
            })}

            <button
              className={`pagination-btn ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupsTopics;
