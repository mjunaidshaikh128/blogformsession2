import { useState } from "react";

const Blog = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = items.find((item) => newItem.id === item.id);
    console.log(isEdit);
    let updatedItems = [];
    if (isEdit && items.length > 0) {
      updatedItems = items.map((item) =>
        newItem.id === item.id ? { ...item, ...newItem } : item
      );

      setItems(updatedItems);
    } else {
      setItems([...items, newItem]);
    }
    setNewItem({
      id: "",
      title: "",
      subtitle: "",
      author: "",
    });
  };

  const handleEditClick = (item) => {
    setNewItem(item);
  };

  const handleDeleteClick = (item) => {
    const updatedItems = items.filter((it) => it.id !== item.id);
    setItems(updatedItems);
  };

  return (
    <div>
      {isAddModalOpen && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Id">ID: </label>
            <input
              type="text"
              id="Id"
              value={newItem.id}
              onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
            />
            <br />

            <label htmlFor="title">TITLE: </label>
            <input
              type="text"
              id="title"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
            />
            <br />

            <label htmlFor="subtitle">SUBTITLE: </label>
            <input
              type="text"
              id="subtitle"
              value={newItem.subtitle}
              onChange={(e) =>
                setNewItem({ ...newItem, subtitle: e.target.value })
              }
            />
            <br />

            <label htmlFor="author">AUTHOR: </label>
            <input
              type="text"
              id="author"
              value={newItem.author}
              onChange={(e) =>
                setNewItem({ ...newItem, author: e.target.value })
              }
            />
            <br />

            <button type="submit">Add Blog</button>
          </div>
        </form>
      )}

      {items.length > 0 && (
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>SUBTITLE</th>
              <th>AUTHOR</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.subtitle}</td>
                  <td>{item.author}</td>
                  <td>
                    <span onClick={() => handleEditClick(item)}>Edit</span>{" "}
                    <span onClick={() => handleDeleteClick(item)}>Delete</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Blog;
