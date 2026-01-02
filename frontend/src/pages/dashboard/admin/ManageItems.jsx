import { Link } from "react-router-dom";
import {
  useFetchAllProductsQuery,
  useDeleteProductMutation,
} from "../../../redux/features/products/productsApi";

const ManageItems = () => {
  const { data, isLoading, isError } = useFetchAllProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.products || [];

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(id).unwrap();
      alert("Product deleted successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product ❌");
    }
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2 text-left">Product Name</th>
                <th className="border p-2 text-left">Category</th>
                <th className="border p-2">Price</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">${product.price}</td>

                  {/* ✅ EDIT + DELETE */}
                  <td className="border p-2 text-center space-x-2">
                    <Link
                      to={`/dashboard/admin/edit-product/${product._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageItems;
