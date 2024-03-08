export const tableColumn = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 300
    },
    {
        title: 'Category',
        dataIndex: 'categories',
        key: 'categories',
        width: 200
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Cost',
        dataIndex: 'disabled',
        key: 'disabled',
        width: 200,
        render: (value, record) => {
            const total = record.items.reduce((acc, item) => {
                const price = Number(item.price);
                const quantity = Number(item.quantity);
            
                return acc + (price * quantity);
            }, 0);

            return (`₱ ${total}`);
        }
    },
    {
        title: 'Date and Time',
        dataIndex: 'disabled',
        key: 'disabled',
        width: 300,
        render: (value, record) => {

            const milliseconds = record.updatedAt * 1000;
            const date = new Date(milliseconds);

            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            
            const formattedTime = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            
            return (`${formattedDate} - ${formattedTime}`);
        }
    },
]