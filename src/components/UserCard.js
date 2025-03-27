import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <img 
        src={user.avatar} 
        alt={`${user.first_name} ${user.last_name}`} 
        className="user-avatar"
      />
      <div className="user-details">
        <h3>{user.first_name} {user.last_name}</h3>
        <p>{user.email}</p>
      </div>
      <div className="user-actions">
        <button 
          onClick={() => onEdit(user)} 
          className="edit-button"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(user.id)} 
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;