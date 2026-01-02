import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/features/products/productsApi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useFetchProductByIdQuery(id);
  const [updateProduct, { isLoading: updating }] =
    useUpdateProductMutation();

  const product = data?.product;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    image: "",
    color: "",
    description: "",
  });

  // Populate form once product loads
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        oldPrice: product.oldPrice?.toString() || "",
        image: product.image || "",
        color: product.color || "",
        description: product.description || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.name || !formData.category || !formData.price) {
      alert("Name, category and price are required");
      return;
    }

    try {
      await updateProduct({
        id,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        oldPrice: formData.oldPrice
          ? Number(formData.oldPrice)
          : undefined,
        image: formData.image,
        color: formData.color,
        description: formData.description,
      }).unwrap();

      alert("Product updated successfully ✅");
      navigate("/dashboard/admin/manage-items");
    } catch (error) {
      console.error("Update product error:", error);
      alert("Failed to update product ❌");
    }
  };

  if (isLoading) return <p>Loading product...</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />

        <input
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Color"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="oldPrice"
          value={formData.oldPrice}
          onChange={handleChange}
          placeholder="Old Price"
          className="w-full border p-2 rounded"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows="4"
        />

        <button
          type="submit"
          disabled={updating}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
