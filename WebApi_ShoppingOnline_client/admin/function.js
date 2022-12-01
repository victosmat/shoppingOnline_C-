const user = document.getElementById("user");
const book = document.getElementById("book");
const table = document.getElementById("table");
user.addEventListener("click", () => {
    table.innerHTML = `
            <div id = "title">User Management</div>
            <table id = "table">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Address</th>
                    <th>Date of birth</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Position</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>minh</td>
                    <td>ml</td>
                    <td>HN</td>
                    <td>HN</td>
                    <td>HN</td>
                    <td>HN</td>
                    <td>HN</td>
                    <td>HN</td>
                    <td>HN</td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
            </table>
        `
})


book.addEventListener("click", () => {
    table.innerHTML = `
            <div id = "title">Book Management</div>
            <table id = "table">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>minh</td>
                    <td>minh</td>
                    <td>minh</td>
                    <td>minh</td>
                    <td>minh</td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
            </table>
        `
})

