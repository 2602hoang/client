import React from 'react'

function ListUser() {
    const products = [
        {
          id: 1,
          name: 'Nguyễn Văn A 1',
          type: 'Quản Lý',
          createdAt: '14/08/2023',
        //   imageUrl: '/path/to/image1.jpg',
        },
        {
          id: 2,
          name: 'Nguyễn Văn A 2',
          type: 'Nhân viên',
          createdAt: '14/08/2023',
        //   imageUrl: '/path/to/image2.jpg',
        },
        {
            id: 2,
            name: 'Nguyễn Văn A 2',
            type: 'Nhân viên',
            createdAt: '14/08/2023',
            // imageUrl: '/path/to/image2.jpg',
          },
          {
            id: 2,
            name: 'Nguyễn Văn A 2',
            type: 'Nhân viên',
            createdAt: '14/08/2023',
            // imageUrl: '/path/to/image2.jpg',
          },
          {
            id: 2,
            name: 'Nguyễn Văn A 2',
            type: 'Nhân viên',
            createdAt: '14/08/2023',
            // imageUrl: '/path/to/image2.jpg',
          },
      ];
    
      const handleEdit = (productId) => {
        console.log(`Editing product with ID: ${productId}`);
        // Add your edit logic here
      };
    
      const handleDelete = (productId) => {
        console.log(`Deleting product with ID: ${productId}`);
        // Add your delete logic here
      };
  return (
     <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 w-full mx-2">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col bg-white w-11/12 h-auto rounded-md py-4 px-6 border-2">
          <h3 className="text-center font-bold text-xl text-gray-800 pb-2">{product.name}</h3>
          <h3 className="text-base font-semibold text-gray-900">{product.type}</h3>
          <p className="text-sm text-gray-500 pb-3">Ngày tạo: {product.createdAt}</p>
          <div className="flex gap-2 text-sm text-gray-500 border-b pb-2">
            {/* <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-full" /> */}
          </div>
          <div className="flex justify-around items-center py-3">
            <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer" onClick={() => handleEdit(product.id)}>
              <svg className="w-6 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <button className="font-semibold text-sm text-green-700">Sửa</button>
            </div>
            <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer" onClick={() => handleDelete(product.id)}>
              <svg className="w-6 stroke-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              <button className="font-semibold text-sm text-red-700">Xóa</button>
            </div>
          </div>
        </div>
      ))}
    </div>   
  )
}

export default ListUser