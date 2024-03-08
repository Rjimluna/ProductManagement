import React, { useEffect, useReducer } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import ProductsModal from '../../components/products/ProductsModal';
import SelectCategories from '../../components/products/SelectCategories';
import { tableColumn } from '../../components/products/tableColumn';
import { reducer, initialState } from '../../reducer/ProductHooks';

import { Card, Table, Button, message } from 'antd';
import {
    EyeOutlined,
    PlusOutlined
} from '@ant-design/icons';

export default function Products () {
    const [state, dispatch] = useReducer(reducer, initialState);
    const uniqueId = uuidv4();
    const productsCollectionRef = collection(db, "products")

    useEffect(() => {
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProducts = async () => {
        try {
            const data = await getDocs(productsCollectionRef);
            const dataProduct = data.docs.map((doc, index) => ({...doc.data(), id: doc.id, key: index}))
            dispatch({ type: 'FETCH_PRODUCT', value: dataProduct });
            dispatch({ type: 'PRODUCT_TABLE_CONTAINER', value: dataProduct });
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    }

    const submitProductCreateHandler = async () => {
        dispatch({ type: 'SUBMIT_LOADING', value: true})
        try {
            const additionalItems = state.addVariant ? [{ ...state.additionalItems, id: uniqueId }] : [];
            const dataToUpdate = {
                ...state.itemUpdate,
                items: [...additionalItems],
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            const { key, ...newDataToUpdate } = dataToUpdate;

            await addDoc(productsCollectionRef, newDataToUpdate)
            cancelViewItemHandler();
            getProducts();
            message.success('Created products successfully.');
        } catch (err) {
            console.error("Failed to create products:", err);
            message.error('Failed to create products.');
        } finally {
            dispatch({ type: 'SUBMIT_LOADING', value: false})
        }
    }

    const submitProductUpdateHandler = async () => {
        dispatch({ type: 'SUBMIT_LOADING', value: true });
        try {
            const productDoc = doc(db, "products", state.itemUpdate.id);
            const additionalItems = state.addVariant ? [{ ...state.additionalItems, id: uniqueId }] : [];
            const dataToUpdate = {
                ...state.itemUpdate,
                items: [...state.itemUpdate.items, ...additionalItems],
                updatedAt: new Date(),
            };
            const { key, ...newDataToUpdate } = dataToUpdate;
    
            await updateDoc(productDoc, newDataToUpdate);
            cancelViewItemHandler();
            getProducts();
            message.success('Updated products successfully.');
        } catch (err) {
            console.error("Failed to update products:", err);
            dispatch({ type: 'SUBMIT_LOADING', value: false });
            message.error('Failed to update products.');
        } finally {
            dispatch({ type: 'SUBMIT_LOADING', value: false });
        }
    };
    

    const updateItemsHandler = (e, index) => {
        const { name, value } = e.target;

        let parsedValue;
        if (name === "size") {
            parsedValue = value;
        } else {
            parsedValue = value === '' ? 0 : parseInt(value);
            if (isNaN(parsedValue)) {
                parsedValue = 0;
            }
        }
        
        dispatch({ type: 'PRODUCT_ITEM_UPDATE', name, value: parsedValue, index });
    }

    const categoryValueHandler = (value) => {
        dispatch({ type: 'SET_CATEGORY_VALUE', value });
    }

    const updateItemsChangesHandler = (e) => {
        dispatch({ type: 'ITEM_UPDATE', name: e.target.name, value: e.target.value });
    }

    const additionalItemInputChangesHandler = (e) => {
        const { name, value } = e.target;
    
        let parsedValue;
        if (name === "size") {
            parsedValue = value;
        } else {
            parsedValue = value === '' ? 0 : parseInt(value);
            if (isNaN(parsedValue)) {
                parsedValue = 0;
            }
        }
    
        dispatch({ type: 'SET_ADDITIONAL_ITEM', name, value: parsedValue });
    }

    const addVariantsHandler = (value) => {
        if (value === false) {
            ['size', 'price', 'quantity'].forEach(name => {
            dispatch({ type: 'SET_ADDITIONAL_ITEM', name, value: "" });
            });
        }
    
        dispatch({ type: 'ADD_VARIANT', value });
    };

    const editItemHandler = (value) => {
        if (value === false) {
            ['size', 'price', 'quantity'].forEach(name => {
                dispatch({ type: 'SET_ADDITIONAL_ITEM', name, value: "" });
            });
        }
        dispatch({ type: 'EDIT_ITEM', value });
    }

    const addProductsHandler = () => {
        const actions = [
            { type: 'VIEW_ITEM_MODAL', value: true },
            { type: 'GET_ITEM', value: {} },
            { type: 'EDIT_ITEM', value: true },
            { type: 'ADD_NEW_ITEM' },
            { type: 'CREATE_ITEM', value: true },
        ];
        
        actions.forEach(action => dispatch(action));
    }

    const searchCategoryHandler = (value) => {
        const itemsToDispatch = value === 'All' ? state.products : state.products.filter(item => item.categories === value);
        dispatch({ type: 'PRODUCT_TABLE_CONTAINER', value: itemsToDispatch });
    }

    const cancelViewItemHandler = () => {
        const initialActions = [
            { type: 'VIEW_ITEM_MODAL', value: false },
            { type: 'GET_ITEM', value: {} },
            { type: 'EDIT_ITEM', value: false },
            { type: 'ADD_VARIANT', value: false },
            { type: 'CREATE_ITEM', value: false },
            { type: 'SET_CATEGORY_VALUE', value: "" },
        ];
        
        initialActions.forEach(action => dispatch(action));
        
        ['size', 'price', 'quantity'].forEach(name => {
            dispatch({ type: 'SET_ADDITIONAL_ITEM', name, value: "" });
        });
    };
    

    const tableColumnsUpdate = [
        ...tableColumn,
        {
            title: 'Options',
            dataIndex: 'disabled',
            key: 'disabled',
            width: 200,
            align: 'center',
            render: (value, record) => (
                <Button type="link" onClick={() => {
                    dispatch({ type: 'VIEW_ITEM_MODAL', value: true });
                    dispatch({ type: 'GET_ITEM', value: record });
                    Object.keys(record).forEach((key) => {
                        dispatch({ type: 'ITEM_UPDATE', name: key, value: record[key] });
                    })
                }}><EyeOutlined />View Item</Button>
            )
        },
    ]

    return (
        <>
            <ProductsModal
                productState={state}

                onCancelViewItem={cancelViewItemHandler}
                onEditItemHandler={editItemHandler}
                onUpdateItemsHandler={updateItemsHandler}
                onAddVariantsHandler={addVariantsHandler}
                onAdditionalItemInputChanges={additionalItemInputChangesHandler}
                onUpdateItemsChangesHandler={updateItemsChangesHandler}
                onSubmitProductUpdate={submitProductUpdateHandler}
                onSubmitProductCreate={submitProductCreateHandler}
                onCategoryValueHandler={categoryValueHandler}
            />
            <Card title="UTAK React Developer Test">
                <div className="productSearchButton">
                    <SelectCategories  onUpdateItemsChangesHandler={(e) => searchCategoryHandler(e)} onSearch={true} categorySelectSize={300} />
                    <Button onClick={addProductsHandler} type="primary"><PlusOutlined />Add Product</Button>
                </div>
                <Table
                    columns={tableColumnsUpdate}
                    dataSource={state.tableProducts}
                    bordered={true}
                />
            </Card>
        </>
    )
}