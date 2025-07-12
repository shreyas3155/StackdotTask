import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct, deleteProduct, editProduct, setEditingProduct, clearEditingProduct } from './productslice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { products, editingProduct } = useSelector(state => state.products)
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingProduct) {
      // Update existing product
      dispatch(editProduct({
        ...editingProduct,
        ...formData,
        price: parseFloat(formData.price)
      }))
      dispatch(clearEditingProduct())
    } else {
      // Add new product
      dispatch(addProduct({
        ...formData,
        price: parseFloat(formData.price)
      }))
    }
    
    // Reset form
    setFormData({
      name: '',
      price: '',
      category: ''
    })
  }

  const handleEdit = (product) => {
    dispatch(setEditingProduct(product))
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category
    })
  }

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
  }

  const handleCancelEdit = () => {
    dispatch(clearEditingProduct())
    setFormData({
      name: '',
      price: '',
      category: ''
    })
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Product Management System</h1>
        
        {/* Product Form */}
        <div className="form-section">
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                placeholder="Enter price"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="Enter category"
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              {editingProduct && (
                <button 
                  type="button" 
                  onClick={handleCancelEdit}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product List */}
        <div className="list-section">
          <h2>Product List</h2>
          {products.length === 0 ? (
            <p className="no-products">No products added yet.</p>
          ) : (
            <div className="product-list">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p><strong>Price:</strong> ₹{product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                  </div>
                  <div className="product-actions">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
