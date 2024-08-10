import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Button as PaperButton,
  Dialog,
  Portal,
  TextInput as PaperTextInput,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import { uploadImageAndStoreProduct } from "../firebaseConfig.js";
import { fetchProducts } from "../firebaseService.js";
import styles from "../styles";

const ProductsRoute = () => {
  const [products, setProducts] = useState([]);
  const [isProductModalVisible, setProductModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubcategory, setProductSubcategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const productsList = await fetchProducts();
      setProducts(productsList);
    };
    fetchData();
  }, []);

  const handleAddProduct = async () => {
    try {
      const product = {
        name: productName,
        category: productCategory,
        subcategory: productSubcategory,
        price: productPrice,
      };
      await uploadImageAndStoreProduct(product, imageFile);
      setProductModalVisible(false);
      setProductName("");
      setProductCategory("");
      setProductSubcategory("");
      setProductPrice("");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  return (
    <View style={styles.container}>
      {products.map((item) => (
        <Card key={item.id} style={styles.card}>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>Category: {item.category}</Paragraph>
            <Paragraph>Subcategory: {item.subcategory}</Paragraph>
            <Paragraph>Price: ${item.price}</Paragraph>
            {item.imageURL && (
              <Image
                source={{ uri: item.imageURL }}
                style={styles.productImage}
              />
            )}
          </Card.Content>
        </Card>
      ))}
      <PaperButton
        mode="contained"
        onPress={() => setProductModalVisible(true)}
      >
        Add Product
      </PaperButton>
      <Portal>
        <Dialog
          visible={isProductModalVisible}
          onDismiss={() => setProductModalVisible(false)}
        >
          <Dialog.Title>Add Product</Dialog.Title>
          <Dialog.Content>
            <PaperTextInput
              label="Name"
              style={styles.input}
              value={productName}
              onChangeText={setProductName}
            />
            <PaperTextInput
              label="Category"
              style={styles.input}
              value={productCategory}
              onChangeText={setProductCategory}
            />
            <PaperTextInput
              label="Subcategory"
              style={styles.input}
              value={productSubcategory}
              onChangeText={setProductSubcategory}
            />
            <PaperTextInput
              label="Price"
              style={styles.input}
              value={productPrice}
              onChangeText={setProductPrice}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
            <PaperButton mode="contained" onPress={handleAddProduct}>
              Save
            </PaperButton>
            <PaperButton
              mode="text"
              onPress={() => setProductModalVisible(false)}
            >
              Cancel
            </PaperButton>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ProductsRoute;
