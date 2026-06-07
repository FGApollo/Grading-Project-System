import React, { useState, useMemo } from 'react';
import {
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  ViewIcon,
  MoreActionsIcon,
  CloseIcon
} from '../icons';

const AVAILABLE_LECTURERS = [
  'Dr. Jane Doe',
  'Prof. Mark Smith',
  'Dr. Alan Lee',
  'Dr. Emily Davis',
  'Dr. Robert Chen',
  'Prof. Alice Johnson',
  'Dr. Lisa Wong',
  'Dr. James Wilson',
  'Dr. Sarah Jenkins',
  'Dr. David Clark',
  'Prof. Tom Cruise',
  'Nguyễn Văn Hải',
  'Trần Thị Lan',
  'Lê Quang Minh',
  'Phạm Văn Nam',
  'Nguyễn Thị Mai',
  'Đặng Hoàng Long',
  'Vũ Thị Hồng',
  'Hoàng Quốc Việt'
];


function DefenseBoards({ boards, groups = [], onAddBoard, onEditBoard }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('active'); // active filter pill by default
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

  // Form States for Modal
  const [formBoardId, setFormBoardId] = useState('');
  const [formSize, setFormSize] = useState('5 Members');
  const [formPresident, setFormPresident] = useState('');
  const [formGroups, setFormGroups] = useState(3);
  const [formStatus, setFormStatus] = useState('active');
  const [formSecretary, setFormSecretary] = useState('');
  const [formMember1, setFormMember1] = useState('');
  const [formMember2, setFormMember2] = useState('');

  // Dropdown states for group assignment
  const [formSelectedGroups, setFormSelectedGroups] = useState([]);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const [groupSearchQuery, setGroupSearchQuery] = useState('');

  // Items per page to match the screenshot ("Showing 1 to 3 of 12 boards")
  const itemsPerPage = 3;

  // Init Form for Adding
  const openAddModal = () => {
    // Auto-generate board ID based on semester
    const nextNum = boards.length + 1;
    const paddedNum = nextNum < 10 ? `0${nextNum}` : nextNum;
    setFormBoardId(`HB-24A-${paddedNum}`);
    setFormSize('5 Members');
    setFormPresident('');
    setFormGroups(0);
    setFormStatus('active');
    setFormSecretary('');
    setFormMember1('');
    setFormMember2('');
    setFormSelectedGroups([]);
    setGroupSearchQuery('');
    setGroupDropdownOpen(false);
    setEditingBoard(null);
    setIsModalOpen(true);
  };

  // Init Form for Editing
  const openEditModal = (board) => {
    setEditingBoard(board);
    setFormBoardId(board.id);
    setFormSize(board.size);
    setFormPresident(board.president.name || board.president);
    setFormGroups(board.groups);
    setFormStatus(board.status);
    setFormSecretary(board.secretary || '');
    setFormMember1(board.member1 || '');
    setFormMember2(board.member2 || '');
    
    // Lấy danh sách nhóm đã được gán vào hội đồng này
    const boardGroups = groups.filter(g => g.assignedBoard === board.id).map(g => g.id);
    setFormSelectedGroups(boardGroups);
    setGroupSearchQuery('');
    setGroupDropdownOpen(false);
    
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formPresident.trim()) {
      alert('Vui lòng nhập tên Chủ tịch!');
      return;
    }

    const presidentInitials = formPresident
      .split(' ')
      .filter(w => w.length > 0)
      .map(w => w[0].toUpperCase())
      .slice(-2)
      .join('') || 'JD';

    // Assign colors based on initials or random
    const colors = ['#0f172a', '#2563eb', '#ef4444', '#16a34a', '#8b5cf6', '#ea580c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const boardData = {
      id: formBoardId,
      size: formSize,
      president: {
        name: formPresident,
        initials: presidentInitials,
        color: editingBoard ? editingBoard.president.color : randomColor
      },
      groups: formSelectedGroups.length, // Cập nhật số lượng nhóm tự động
      status: formStatus,
      secretary: formSecretary,
      member1: formMember1,
      member2: formMember2
    };

    if (editingBoard) {
      onEditBoard(boardData, formSelectedGroups);
    } else {
      onAddBoard(boardData, formSelectedGroups);
    }
    setIsModalOpen(false);
  };

  // Logic lọc các nhóm có thể gán cho hội đồng hiện tại
  const availableGroups = useMemo(() => {
    return groups.filter(g => {
      const isAssignedToThis = editingBoard && g.assignedBoard === editingBoard.id;
      const isUnscheduled = !g.assignedBoard || g.assignedBoard === '';
      return isAssignedToThis || isUnscheduled;
    });
  }, [groups, editingBoard]);

  const filteredAvailableGroups = useMemo(() => {
    return availableGroups.filter(g => {
      const query = groupSearchQuery.toLowerCase();
      return g.id.toLowerCase().includes(query) || g.title.toLowerCase().includes(query);
    });
  }, [availableGroups, groupSearchQuery]);

  const handleGroupSelectToggle = (groupId) => {
    setFormSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handlePresidentChange = (value) => {
    setFormPresident(value);
    if (value !== '') {
      if (formSecretary === value) setFormSecretary('');
      if (formMember1 === value) setFormMember1('');
      if (formMember2 === value) setFormMember2('');
    }
  };

  const handleSecretaryChange = (value) => {
    setFormSecretary(value);
    if (value !== '') {
      if (formPresident === value) setFormPresident('');
      if (formMember1 === value) setFormMember1('');
      if (formMember2 === value) setFormMember2('');
    }
  };

  const handleMember1Change = (value) => {
    setFormMember1(value);
    if (value !== '') {
      if (formPresident === value) setFormPresident('');
      if (formSecretary === value) setFormSecretary('');
      if (formMember2 === value) setFormMember2('');
    }
  };

  const handleMember2Change = (value) => {
    setFormMember2(value);
    if (value !== '') {
      if (formPresident === value) setFormPresident('');
      if (formSecretary === value) setFormSecretary('');
      if (formMember1 === value) setFormMember1('');
    }
  };

  // Filter & Search Logic
  const filteredBoards = useMemo(() => {
    return boards.filter(board => {
      const matchSearch = 
        board.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (board.president.name || board.president).toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = statusFilter === 'all' || board.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [boards, searchTerm, statusFilter]);

  // Pagination calculations
  const totalItems = filteredBoards.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Reset pagination if filtered items count is less than current page offset
  const paginatedBoards = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBoards.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBoards, currentPage]);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="boards-view-content">
      {/* Header Info */}
      <div className="boards-header-action">
        <div className="boards-header-info">
          <h1>Defense Boards</h1>
          <p className="header-subtitle">Manage and assign faculty to examination boards for the current semester.</p>
        </div>
        <button className="primary-btn" onClick={openAddModal}>
          <PlusIcon className="btn-icon" />
          <span>Tạo Hội đồng mới</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-left">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search boards by ID or faculty name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          {/* Active status pill */}
          {statusFilter !== 'all' && (
            <div className="filter-pill">
              <span className="pill-text">
                {statusFilter === 'active' && 'Active'}
                {statusFilter === 'pending' && 'Đang chờ'}
                {statusFilter === 'closed' && 'Đã đóng'}
              </span>
              <button className="pill-close-btn" onClick={() => {
                setStatusFilter('all');
                setCurrentPage(1);
              }}>
                <CloseIcon />
              </button>
            </div>
          )}

          {/* Add Filter Dropdown / Option */}
          <button 
            className="filter-btn-secondary" 
            onClick={() => {
              // Cycle filters for demonstration
              const filters = ['all', 'active', 'pending', 'closed'];
              const nextIndex = (filters.indexOf(statusFilter) + 1) % filters.length;
              setStatusFilter(filters[nextIndex]);
              setCurrentPage(1);
            }}
          >
            <PlusIcon className="btn-icon-s" />
            <span>Add Filter</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-card">
        <div className="table-responsive">
          <table className="boards-table">
            <thead>
              <tr>
                <th>BOARD ID</th>
                <th>SIZE</th>
                <th>PRESIDENT</th>
                <th>ASSIGNED GROUPS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBoards.length > 0 ? (
                paginatedBoards.map((board) => {
                  let statusBadgeClass = 'status-badge-table pending';
                  let statusText = '• Đang chờ';

                  if (board.status === 'active') {
                    statusBadgeClass = 'status-badge-table active';
                    statusText = '• Đang hoạt động';
                  } else if (board.status === 'closed') {
                    statusBadgeClass = 'status-badge-table closed';
                    statusText = '• Đã đóng';
                  }

                  const pres = board.president;

                  return (
                    <tr key={board.id}>
                      <td className="board-id-col">{board.id}</td>
                      <td>
                        <span className="size-badge">{board.size}</span>
                      </td>
                      <td>
                        <div className="president-cell">
                          <div 
                            className="avatar-initials" 
                            style={{ backgroundColor: pres.color || '#475569' }}
                          >
                            {pres.initials}
                          </div>
                          <span className="president-name">{pres.name}</span>
                        </div>
                      </td>
                      <td>{board.groups} Groups</td>
                      <td>
                        <span className={statusBadgeClass}>{statusText}</span>
                      </td>
                      <td className="actions-cell">
                        {board.status === 'closed' ? (
                          <button 
                            className="action-icon-btn" 
                            title="Xem chi tiết"
                            onClick={() => openEditModal(board)}
                          >
                            <ViewIcon />
                          </button>
                        ) : (
                          <button 
                            className="action-icon-btn" 
                            title="Chỉnh sửa"
                            onClick={() => openEditModal(board)}
                          >
                            <EditIcon />
                          </button>
                        )}
                        <button className="action-icon-btn" title="Thêm tác vụ">
                          <MoreActionsIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="no-data-cell">
                    Không tìm thấy hội đồng phù hợp!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="table-footer">
          <span className="showing-entries-text">
            Showing {startIndex} to {endIndex} of {totalItems} boards
          </span>
          <div className="pagination-buttons">
            <button
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className={`pagination-btn ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Modal - Tạo / Sửa Hội đồng */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-card">
            <div className="modal-header">
              <h2>{editingBoard ? 'Cập nhật Hội đồng' : 'Tạo Hội đồng mới'}</h2>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group-row">
                <div className="form-item">
                  <label htmlFor="board-id">Mã Hội đồng (Tự động sinh)</label>
                  <input
                    type="text"
                    id="board-id"
                    value={formBoardId}
                    onChange={(e) => setFormBoardId(e.target.value)}
                    required
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="board-size">Quy mô Hội đồng</label>
                  <select
                    id="board-size"
                    value={formSize}
                    onChange={(e) => setFormSize(e.target.value)}
                  >
                    <option value="5 Members">5 Thành viên (1 Chủ tịch, 1 Thư ký, 3 Uỷ viên)</option>
                    <option value="3 Members">3 Thành viên (1 Chủ tịch, 1 Thư ký, 1 Uỷ viên)</option>
                  </select>
                </div>
              </div>

              <div className="form-item">
                <label htmlFor="board-president">Chủ tịch Hội đồng (Họ và Tên)</label>
                <select
                  id="board-president"
                  value={formPresident}
                  onChange={(e) => handlePresidentChange(e.target.value)}
                  required
                >
                  <option value="">-- Chọn Chủ tịch --</option>
                  {AVAILABLE_LECTURERS.map(lecturer => (
                    <option key={lecturer} value={lecturer}>{lecturer}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-row">
                <div className="form-item">
                  <label htmlFor="board-groups">Số nhóm đồ án gán vào</label>
                  <input
                    type="text"
                    id="board-groups"
                    value={`${formSelectedGroups.length} nhóm`}
                    readOnly
                    style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="board-status">Trạng thái ban đầu</label>
                  <select
                    id="board-status"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="pending">Đang chờ</option>
                    <option value="closed">Đã đóng</option>
                  </select>
                </div>
              </div>

              {/* Ô TÌM KIẾM ĐA CHỌN HỘI ĐỒNG */}
              <div className="form-item" style={{ marginBottom: '8px' }}>
                <label>Chọn các nhóm phân vào Hội đồng này</label>
                <div className="dropdown-select-container">
                  {groupDropdownOpen && (
                    <div 
                      style={{ position: 'fixed', inset: 0, zIndex: 90 }} 
                      onClick={() => setGroupDropdownOpen(false)}
                    />
                  )}
                  <div 
                    className="dropdown-select-box" 
                    onClick={() => setGroupDropdownOpen(!groupDropdownOpen)}
                    style={{ zIndex: 95 }}
                  >
                    {formSelectedGroups.length === 0 ? (
                      <span className="dropdown-select-placeholder">Nhấp để chọn nhóm đồ án...</span>
                    ) : (
                      formSelectedGroups.map(groupId => (
                        <span key={groupId} className="group-tag" onClick={(e) => e.stopPropagation()}>
                          {groupId}
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGroupSelectToggle(groupId);
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                  
                  {groupDropdownOpen && (
                    <div className="dropdown-select-popover" style={{ zIndex: 100 }}>
                      <input 
                        type="text" 
                        className="dropdown-search-input"
                        placeholder="Tìm theo Mã nhóm hoặc Đề tài..."
                        value={groupSearchQuery}
                        onChange={(e) => setGroupSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="dropdown-items-list">
                        {filteredAvailableGroups.length > 0 ? (
                          filteredAvailableGroups.map((group) => {
                            const isChecked = formSelectedGroups.includes(group.id);
                            return (
                              <label 
                                key={group.id} 
                                className="dropdown-item-label"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={() => handleGroupSelectToggle(group.id)}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                  <strong style={{ fontSize: '13px', color: '#0f172a' }}>{group.id}</strong>
                                  <span style={{ fontSize: '11.5px', color: '#64748b' }}>{group.title}</span>
                                </div>
                              </label>
                            );
                          })
                        ) : (
                          <span style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '12.5px', fontStyle: 'italic' }}>
                            Không tìm thấy nhóm phù hợp!
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-divider">Thành phần ban chấm điểm</div>

              <div className="form-item">
                <label htmlFor="board-secretary">Thư ký hội đồng (Họ tên / Email)</label>
                <select
                  id="board-secretary"
                  value={formSecretary}
                  onChange={(e) => handleSecretaryChange(e.target.value)}
                >
                  <option value="">-- Chọn Thư ký --</option>
                  {AVAILABLE_LECTURERS.map(lecturer => (
                    <option key={lecturer} value={lecturer}>{lecturer}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-row">
                <div className="form-item">
                  <label htmlFor="board-member1">Thành viên Uỷ viên 1</label>
                  <select
                    id="board-member1"
                    value={formMember1}
                    onChange={(e) => handleMember1Change(e.target.value)}
                  >
                    <option value="">-- Chọn Uỷ viên 1 --</option>
                    {AVAILABLE_LECTURERS.map(lecturer => (
                      <option key={lecturer} value={lecturer}>{lecturer}</option>
                    ))}
                  </select>
                </div>

                {formSize === '5 Members' && (
                  <div className="form-item">
                    <label htmlFor="board-member2">Thành viên Uỷ viên 2</label>
                    <select
                      id="board-member2"
                      value={formMember2}
                      onChange={(e) => handleMember2Change(e.target.value)}
                    >
                      <option value="">-- Chọn Uỷ viên 2 --</option>
                      {AVAILABLE_LECTURERS.map(lecturer => (
                        <option key={lecturer} value={lecturer}>{lecturer}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="modal-actions-footer">
                <button 
                  type="button" 
                  className="secondary-btn" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy bỏ
                </button>
                <button type="submit" className="primary-btn">
                  {editingBoard ? 'Cập nhật' : 'Lưu Hội đồng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DefenseBoards;
