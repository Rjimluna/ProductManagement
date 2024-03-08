import React from 'react';
import { Select } from 'antd';

const SelectCategories = ({ 
    onUpdateItemsChangesHandler, 
    categorySelectSize,
    catergoryValue,
    onSearch
}) => {
    return (
        <Select
            style={{ marginRight: 30, width: categorySelectSize }}
            value={catergoryValue}
            placeholder="Select your category type..."
            name="categories"
            onChange={(e) => onUpdateItemsChangesHandler(e)}
            options={[
                ...(onSearch ? [{
                        value: 'All',
                        label: 'All'
                    }] : []
                ),
                {
                    value: 'Appetizer',
                    label: 'Appetizer'
                },
                {
                    value: 'Mains',
                    label: 'Mains',
                },
                {
                    value: 'Drinks',
                    label: 'Drinks',
                },
                {
                    value: 'Desserts',
                    label: 'Desserts',
                },
            ]}
        />
    )
}

export default SelectCategories;