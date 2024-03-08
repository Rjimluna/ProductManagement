import React from 'react';
import SelectCategories from '../../components/products/SelectCategories';
import {
    Modal,
    Row,
    Col,
    Card,
    Typography,
    Divider,
    Button,
    Input
} from 'antd';
import {
    SwapRightOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';

const ShowProductComponent = ({itemData}) => {
    const { Text } = Typography;
    return (
        <Card>
            <Row>
                <Col span={4}><Text>Name :</Text></Col>
                <Col span={8}><Text strong>{itemData?.name}</Text></Col>

                <Col span={4}><Text>Category :</Text></Col>
                <Col span={8}><Text strong>{itemData?.categories}</Text></Col>
            </Row>
            <Divider />
            <Row>
                <Col span={4}><Text>Description :</Text></Col>
                <Col span={20}><Text strong>{itemData?.description}</Text></Col>
            </Row>
            <Divider />
            <div className="variantContainer">
            <Text>Items :</Text>
            {
                itemData?.items?.map((item) => (
                    <Card bordered={false}>
                        <Row gutter={16}>
                            <Col span={8}><Text>Size : <Text strong>{item.size}</Text></Text></Col>
                            <Col span={8}><Text>Price : ₱<Text strong>{item.price}</Text></Text></Col>
                            <Col span={8}><Text>Quantity : <Text strong>{item.quantity}</Text></Text></Col>
                        </Row>
                    </Card>
                ))
            }
            </div>
        </Card>
    )
}

const UpdateProductComponent = ({
    additionalItemInputData,
    itemUpdate,
    onAddVariantsHandler,
    onAdditionalItemInputChanges,
    onUpdateItemsHandler,
    onUpdateItemsChangesHandler,
    ElementIconAddVariants,
    addVariantValue,
    onCategoryValueHandler
}) => {
    const { Text } = Typography;
    return (
        <Card>
            <Row gutter={16}>
                <Col span={4}><Text>Name :</Text></Col>
                <Col span={8}>
                    <Input name="name" onChange={onUpdateItemsChangesHandler} value={itemUpdate?.name} />
                </Col>

                <Col span={4}><Text>Category :</Text></Col>
                <Col span={8}>
                    <SelectCategories categorySelectSize={200} onUpdateItemsChangesHandler={onCategoryValueHandler} catergoryValue={itemUpdate?.categories} />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={4}><Text>Description :</Text></Col>
                <Col span={20}>
                    <Input.TextArea
                        name="description"
                        onChange={onUpdateItemsChangesHandler}
                        value={itemUpdate?.description}
                    />
                </Col>
            </Row>
            <Divider orientation="right" plain>
                <Button size="small" onClick={() => onAddVariantsHandler(!addVariantValue)}>{addVariantValue ? 'Cancel' : 'Add Item'}{ElementIconAddVariants}</Button>
            </Divider>
            <div className="variantContainer">
                <Text>Items :</Text>
                {
                    itemUpdate?.items?.map((item, index) => (
                        <Card bordered={false}>
                            <Row gutter={16}>
                                <Col span={8}><Text>Size : <Input name="size" onChange={(e) => onUpdateItemsHandler(e, index)} value={item.size} /></Text></Col>
                                <Col span={8}><Text>Price : <Input prefix="₱" name="price" onChange={(e) => onUpdateItemsHandler(e, index)} value={item.price} /></Text></Col>
                                <Col span={8}><Text>Quantity : <Input name="quantity" onChange={(e) => onUpdateItemsHandler(e, index)} value={item.quantity} /></Text></Col>
                            </Row>
                        </Card>
                    ))
                }
                {
                    addVariantValue ? (
                        <Card bordered={false}>
                            <Row gutter={16}>
                                <Col span={8}><Text>Size : <Input name="size" onChange={onAdditionalItemInputChanges} value={additionalItemInputData?.size} /></Text></Col>
                                <Col span={8}><Text>Price : <Input prefix="₱" name="price" onChange={onAdditionalItemInputChanges} value={additionalItemInputData?.price} /></Text></Col>
                                <Col span={8}><Text>Quantity : <Input name="quantity" onChange={onAdditionalItemInputChanges} value={additionalItemInputData?.quantity} /></Text></Col>
                            </Row>
                        </Card>
                    ) : (null)
                }
            </div>
        </Card>
    )
}

const ProductsModal = ({ 
    productState: { 
        viewItemModal: isModalOpen,
        item : itemData,
        addVariant: addVariantValue,
        additionalItems: additionalItemInputData,
        addItem: addItemBool,
        submitLoading,
        itemUpdate,
        editItem,
    },

    onEditItemHandler, 
    onAddVariantsHandler,
    onCancelViewItem, 
    onAdditionalItemInputChanges,
    onUpdateItemsHandler,
    onUpdateItemsChangesHandler,
    onSubmitProductUpdate,
    onSubmitProductCreate,
    onCategoryValueHandler
}) => {

    const ElementIconAddVariants = addVariantValue  ? <SwapRightOutlined /> : <PlusOutlined />
    const ElementIconEditItems = editItem ? <SwapRightOutlined /> : <EditOutlined />

    const ActionComponent = 
        editItem ? 
            <UpdateProductComponent
                additionalItemInputData={additionalItemInputData}
                itemUpdate={itemUpdate}
                onAddVariantsHandler={onAddVariantsHandler}
                onAdditionalItemInputChanges={onAdditionalItemInputChanges}
                onUpdateItemsHandler={onUpdateItemsHandler}
                onUpdateItemsChangesHandler={onUpdateItemsChangesHandler}
                onCategoryValueHandler={onCategoryValueHandler}

                ElementIconAddVariants={ElementIconAddVariants}
                addVariantValue={addVariantValue}
            />
        :
            <ShowProductComponent itemData={itemData} /> 

    return (
        <Modal title={addItemBool ? "Create Product" : `Item ID : ${itemData.id}`} open={isModalOpen} onCancel={onCancelViewItem} footer={false} width={700} className="productModal">
            {ActionComponent}
            <div className="buttonConfirmation">
                {
                    addItemBool ? (
                        <Button type="primary" onClick={() => onSubmitProductCreate()} loading={submitLoading}>Create Item</Button>
                    ) : (
                        <>
                            {editItem ? <Button type="primary" onClick={() => onSubmitProductUpdate()} className="buttonUpdate" loading={submitLoading}>Update Items</Button> : null}
                            <Button onClick={() => onEditItemHandler(!editItem)}>{editItem ? 'Cancel' : 'Edit Item'} {ElementIconEditItems}</Button>
                        </>
                    )
                }
            </div>
        </Modal>
    )
}

export default ProductsModal;