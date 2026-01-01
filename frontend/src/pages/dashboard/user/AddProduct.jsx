import { useState } from "react";
import { useAddProductMutation } from "../../../redux/features/products/productsApi";

const AddProduct = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    image: "",
    color: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        ...formData,
        price: Number(formData.price),
        oldPrice: Number(formData.oldPrice),
      }).unwrap();

      alert("Product added successfully ✅");

      setFormData({
        name: "",
        category: "",
        price: "",
        oldPrice: "",
        image: "",
        color: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add product ❌");
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="oldPrice"
          placeholder="Old Price (optional)"
          value={formData.oldPrice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="4"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>

      </form>
    </div>
  );
};

export default AddProduct;
