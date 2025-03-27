import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import UserCard from './UserCard';
import EditUserModal from './EditUserModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    loadUsers();
  }, [page]);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
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
    setUsers(users.map(user => 
      user.id === updatedUser.id ? {...user, ...updatedUser} : user
    ));
    setIsEditModalOpen(false);
  };

  return (
    <div className="user-list-container">
      <h2>Users</h2>
      <div className="users-grid">
        {users.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            onEdit={() => handleEdit(user)}
            onDelete={() => handleDelete(user.id)}
          />
        ))}
      </div>
      
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