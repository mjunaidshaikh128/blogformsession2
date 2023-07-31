import { useState } from "react";

export default function SimpleForm() {
      const [items, setItems] = useState([]);
      const [newItem, setNewItem] = useState('');
      const [editItem, setEditItem] = useState(null);
      const [isAddModalOpen, setAddModalOpen] = useState(false);
      const [isEditModalOpen, setEditModalOpen] = useState(false);
      const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
      const [itemToDelete, setItemToDelete] = useState(null);
    
      const handleOpenAddModal = () => {
        setAddModalOpen(true);
      };
    
      const handleCloseAddModal = () => {
        setAddModalOpen(false);
        setNewItem('');
      };
    
      const handleOpenEditModal = (index) => {
        setEditModalOpen(true);
        setEditItem(index);
        setNewItem(items[index]);
      };
    
      const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setNewItem('');
        setEditItem(null);
      };
    
      const handleOpenDeleteModal = (index) => {
        setDeleteModalOpen(true);
        setItemToDelete(index);
      };
    
      const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setItemToDelete(null);
      };
    
      const handleAddItem = (e) => {
        e.preventDefault();
        setItems([...items, newItem]);
        handleCloseAddModal();
      };
    
      const handleUpdateItem = (e) => {
        e.preventDefault();
        const updatedItems = [...items];
        updatedItems[editItem] = newItem;
        setItems(updatedItems);
        handleCloseEditModal();
      };
    
      const handleDeleteItem = () => {
        const updatedItems = [...items];
        updatedItems.splice(itemToDelete, 1);
        setItems(updatedItems);
        handleCloseDeleteModal();
      };
    
      return (
        <div>
          <button onClick={handleOpenAddModal}>Add Item</button>
          <table>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>
                    <button onClick={() => handleOpenEditModal(index)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleOpenDeleteModal(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {isAddModalOpen && (
            <div>
              <div>Add Item</div>
              <form onSubmit={handleAddItem}>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <button type="submit">Add</button>
                <button onClick={handleCloseAddModal}>Cancel</button>
              </form>
            </div>
          )}
    
          {isEditModalOpen && (
            <div>
              <div>Edit Item</div>
              <form onSubmit={handleUpdateItem}>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <button type="submit">Update</button>
                <button onClick={handleCloseEditModal}>Cancel</button>
              </form>
            </div>
          )}
          {isDeleteModalOpen && (
            <div>
              <div>Confirm Delete?</div>
              <button onClick={handleDeleteItem}>Delete</button>
              <button onClick={handleCloseDeleteModal}>Cancel</button>
            </div>
          )}
          </div>
)
}