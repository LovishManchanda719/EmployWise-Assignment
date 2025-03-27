import React, { useState, useEffect, useMemo } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import UserCard from './UserCard';
import EditUserModal from './EditUserModal';

const UserList = () => {
    const setUsers = useState([])[1]; // Only get setUsers without users
  const [originalUsers, setOriginalUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(page);
        setUsers(data.data);
        setOriginalUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    loadUsers();
  }, [page, setUsers]);

  // Memoized filtering and sorting
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...originalUsers];

    // Search filter
    if (searchTerm) {
      result = result.filter(user => 
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
        case 'email':
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });

    return result;
  }, [originalUsers, searchTerm, sortBy]);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        const updatedUsers = originalUsers.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        setOriginalUsers(updatedUsers);
      } catch (error) {
        console.error('Delete failed', error);
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = originalUsers.map(user => 
      user.id === updatedUser.id ? {...user, ...updatedUser} : user
    );
    setUsers(updatedUsers);
    setOriginalUsers(updatedUsers);
    setIsEditModalOpen(false);
  };

  return (
    <div className="user-list-container">
      <div className="user-list-controls">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
          </select>
        </div>
      </div>

      <div className="users-grid">
        {filteredAndSortedUsers.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            onEdit={() => handleEdit(user)}
            onDelete={() => handleDelete(user.id)}
          />
        ))}
      </div>
      
      {filteredAndSortedUsers.length === 0 && (
        <div className="no-results">
          No users found matching your search criteria.
        </div>
      )}
      
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <button 
            key={pageNum} 
            onClick={() => setPage(pageNum)}
            className={page === pageNum ? 'active' : ''}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {isEditModalOpen && (
        <EditUserModal 
          user={selectedUser} 
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default UserList;