document.addEventListener('DOMContentLoaded', () => {
    const toyForm = document.getElementById('toyForm');
    const toyList = document.getElementById('toyList');
  
    // Gửi yêu cầu GET để lấy danh sách đồ chơi khi trang web được tải
    fetch('/toys')
      .then(response => response.json())
      .then(data => {
        // Hiển thị danh sách đồ chơi
        data.forEach(toy => {
          const li = document.createElement('li');
          li.textContent = `${toy.name} - ${toy.price}đ`;
          toyList.appendChild(li);
        });
      });
  
    // Gửi yêu cầu POST để thêm một đồ chơi mới khi người dùng gửi form
    toyForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
  
      const toy = {
        name: name,
        price: price
      };
  
      fetch('/toys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toy)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Có lỗi xảy ra.');
        }
      })
      .then(data => {
        // Thêm đồ chơi mới vào danh sách
        const li = document.createElement('li');
        li.textContent = `${data.name} - ${data.price}đ`;
        toyList.appendChild(li);
  
        // Xóa dữ liệu trong form
        toyForm.reset();
      })
      .catch(error => {
        console.error(error);
      });
    });
  });
  