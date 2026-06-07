import React, { useState, useMemo } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon
} from '../icons';

// Simple down arrow icon for select
const DropdownArrowIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Info/Warning icon for alert box
const InfoCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// Folder-user-plus icon for Assign button
const AssignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="16" y1="11" x2="22" y2="11" />
  </svg>
);

function SecondReview({ groups = [], onAssignSecondReview }) {
  const [toast, setToast] = useState(null);
  
  // State for selected groups in "Xử lý Chấm Lần 2" tab
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState('');

  // Available Committees for selection dropdown
  const reviewCommittees = [
    { id: 'HD2-01', label: 'HĐ.01 - Thầy Nguyễn Văn Hải' },
    { id: 'HD2-02', label: 'HĐ.02 - Cô Lê Thị Lan' },
    { id: 'HD2-03', label: 'HĐ.03 - Thầy Lê Quang Minh' },
    { id: 'HD2-04', label: 'HĐ.04 - Thầy Phạm Văn Nam' },
    { id: 'HD2-08', label: 'HĐ.08 - Thầy Hoàng Quốc Việt' }
  ];

  // List of groups pending review (failed_first status)
  const pendingGroups = useMemo(() => {
    return groups.filter(g => g.status === 'failed_first');
  }, [groups]);

  // Handle Export Click
  const handleExportData = () => {
    setToast({
      type: 'success',
      message: '✓ Đã xuất danh sách dữ liệu Chấm lần 2 dưới dạng Excel thành công!'
    });
    setTimeout(() => setToast(null), 4000);
  };

  // Card select/deselect handler
  const handleCardClick = (groupId) => {
    setSelectedGroupIds(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
  };

  // Bulk check handler
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedGroupIds(pendingGroups.map(g => g.id));
    } else {
      setSelectedGroupIds([]);
    }
  };

  // Assign Committee Action Handler
  const handleAssignCommittee = () => {
    if (selectedGroupIds.length === 0) {
      setToast({
        type: 'error',
        message: '⚠ Vui lòng chọn ít nhất một nhóm để gán hội đồng!'
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    if (!selectedCommittee) {
      setToast({
        type: 'error',
        message: '⚠ Vui lòng chọn một Hội đồng Chấm Lần 2!'
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    const targetCommittee = reviewCommittees.find(c => c.id === selectedCommittee);
    const committeeLabel = targetCommittee ? targetCommittee.label : 'Hội đồng';

    // Gọi hàm callback từ App.jsx để cập nhật state toàn hệ thống
    onAssignSecondReview(selectedGroupIds, committeeLabel);

    // Feedback toast
    setToast({
      type: 'success',
      message: `✓ Gán thành công ${selectedGroupIds.length} nhóm vào ${committeeLabel}!`
    });
    
    // Clear selection
    setSelectedGroupIds([]);
    setSelectedCommittee('');
    
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast message alert overlay */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
          color: '#ffffff',
          padding: '14px 24px',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 1100,
          fontWeight: '600',
          fontSize: '13.5px',
          animation: 'fadeIn 0.2s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {toast.message}
        </div>
      )}

      {/* Main Page Title Header Section */}
      <div className="boards-header-action" style={{ marginBottom: '24px' }}>
        <div className="boards-header-info">
          <h1>Quản Lý Nhóm & Điều Phối Chấm Lần 2</h1>
          <p className="header-subtitle">Manage defense groups and coordinate second review sessions for failed projects.</p>
        </div>
        <button 
          className="secondary-btn" 
          onClick={handleExportData}
          style={{ height: '40px', borderColor: '#cbd5e1', color: '#334155', fontWeight: '600' }}
        >
          <span>Export Data</span>
        </button>
      </div>

      {/* TAB CONTENT: REVIEW PROCESS (Xử lý Chấm Lần 2) */}
      <div style={{ width: '100%' }}>
        
        {/* Informational Alert Box */}
        <div className="review-info-alert">
          <div className="review-info-icon-wrapper">
            <InfoCircleIcon />
          </div>
          <div className="review-info-content">
            <h4 className="review-info-title">Đã lọc {pendingGroups.length} nhóm rớt cần xử lý</h4>
            <p className="review-info-desc">Tự động hiện các nhóm có Trạng thái "Rớt Lần 1". Chọn các nhóm bên dưới để gán hội đồng chấm lại.</p>
          </div>
        </div>

        {/* Action and Bulk Selection Toolbar */}
        <div className="review-toolbar">
          <div className="toolbar-left">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={pendingGroups.length > 0 && selectedGroupIds.length === pendingGroups.length}
                onChange={handleSelectAll}
              />
              <span>Chọn tất cả ({pendingGroups.length})</span>
            </label>
            <span className="toolbar-divider">|</span>
            <span style={{ fontSize: '13.5px', color: '#0f172a', fontWeight: '700' }}>
              Đã chọn: {selectedGroupIds.length} nhóm
            </span>
          </div>
          
          <div className="toolbar-right">
            <div className="toolbar-select-wrapper">
              <select
                className="toolbar-select"
                value={selectedCommittee}
                onChange={(e) => setSelectedCommittee(e.target.value)}
              >
                <option value="">Chọn Hội đồng Chấm Lần 2</option>
                {reviewCommittees.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <span className="toolbar-select-icon">
                <DropdownArrowIcon />
              </span>
            </div>
            <button 
              className="primary-btn" 
              onClick={handleAssignCommittee}
              style={{ height: '38px', gap: '8px' }}
            >
              <AssignIcon />
              <span>Gán Hội đồng</span>
            </button>
          </div>
        </div>

        {/* Cards Grid List of Groups */}
        <div className="review-cards-grid">
          {pendingGroups.length > 0 ? (
            pendingGroups.map((group) => {
              const isSelected = selectedGroupIds.includes(group.id);
              return (
                <div 
                  key={group.id} 
                  className={`review-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCardClick(group.id)}
                >
                  <div className="review-card-header">
                    <div className="review-card-header-left">
                      <span className="review-badge-red">Rớt Lần 1</span>
                      <span className="review-score-text">Điểm: {group.firstScore}</span>
                    </div>
                    <input 
                      type="checkbox" 
                      className="review-card-checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation(); // prevent card double toggle
                        handleCardClick(group.id);
                      }}
                    />
                  </div>
                  
                  <div className="review-card-body">
                    <h3 className="review-card-title" title={group.fullTitle}>{group.title}</h3>
                    <p className="review-card-code">Mã nhóm: {group.id}</p>
                  </div>

                  <div className="review-card-footer">
                    <div className="review-footer-row">
                      <span className="review-footer-label">Sinh viên:</span>
                      <span className="review-footer-value" style={{ color: '#0f172a' }}>{group.members} thành viên</span>
                    </div>
                    <div className="review-footer-row">
                      <span className="review-footer-label">HĐ Lần 1:</span>
                      <span className="review-footer-value">{group.assignedBoard ? `HĐ: ${group.assignedBoard}` : 'Chưa xếp'}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="placeholder-view" style={{ gridColumn: 'span 3', marginTop: 0 }}>
              <h2>Không có nhóm nào cần xử lý!</h2>
              <p>Tất cả các nhóm rớt lần 1 đều đã được phân công hội đồng chấm lần 2.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default SecondReview;
