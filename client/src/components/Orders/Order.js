import './Order.css'

const dummyItems = [
    {
        sku: '1k3h',
        name: 'Bug Spray',
        cost: 1.50,
        qty: 0
    },
    {
        sku: '1k3h',
        name: 'Pumpkin',
        cost: 1.00
    },
    {
        sku: '1k3h',
        name: 'Candy Bar',
        cost: .50
    },

]


export default function Order () {
    return (
        <div className='order-container'>
            <div className='order-side'>
                <h1>Current Order Guide</h1>
                <table>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Qty</th>
                    </tr>
                    {dummyItems.map((item, index) => {
                        return (
                        <tr>
                            <td>{item.sku}</td>
                            <td>{item.name}</td>
                            <td>${item.cost.toFixed(2)}</td>
                            <td>0</td>
                            <button>-</button>
                            <button>+</button>
                        </tr>
                        )
                    })}
                </table>
            </div>
            <div className='order-side'>
                <h1>Full Product List</h1>
                <table>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Qty</th>
                    </tr>
                    {dummyItems.map((item, index) => {
                        return (
                        <tr>
                            <td>{item.sku}</td>
                            <td>{item.name}</td>
                            <td>${item.cost.toFixed(2)}</td>
                            <td>0</td>
                            <button>-</button>
                            <button>+</button>
                        </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}